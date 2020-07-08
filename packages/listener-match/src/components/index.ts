import handleTicket from "./Services/handleTicket";
import { fetchVolunteersAvailable } from "./Volunteers";
import { updateSolidarityTickets } from "../graphql/mutations";
import { getDifference } from "../utils";
import { SubscriptionResponse, IndividualTicket } from "../types";
import dbg from "../dbg";

const log = dbg.extend("match");
const syncLog = dbg.extend("match").extend("syncTickets");

let AGENT = 1;
const data: IndividualTicket[] = [];

export const Queue = (data: IndividualTicket[]) => ({
  add: (record?: IndividualTicket[]) => data.push(...record),
  remove: () => data.shift(),
  first: () =>
    typeof data[0] != "undefined"
      ? data[0]
      : (({ ticket_id: undefined } as unknown) as IndividualTicket),
  size: () => data.length
});

const syncTickets = async (ids: number[]) => {
  syncLog(`Updating sync status from MSR tickets ${ids}`);
  const sync = await updateSolidarityTickets({ match_syncronized: true }, ids);

  if (AGENT < 3) {
    AGENT++;
  } else {
    AGENT = 1;
  }

  return sync && sync.map(s => s.ticket_id);
};

const createMatch = async (ticket: IndividualTicket) => {
  const volunteersAvailable = await fetchVolunteersAvailable();

  const matching = await handleTicket(ticket, volunteersAvailable, AGENT);

  const resolvedMatchs =
    typeof matching === "number" || typeof matching === "undefined"
      ? matching
      : matching.flat(2);

  if (!resolvedMatchs) {
    log("No tickets to sync");
    return undefined;
  }

  const isSynced = await syncTickets(resolvedMatchs as number[]);
  if (!isSynced) {
    syncLog("Couldn't update sync status from MSR tickets:", resolvedMatchs);
    return undefined;
  }

  log("Tickets that passed through match:", isSynced);
  log("Match is done");
  return true;
};

export const setRecursionLogic = (
  tickets: IndividualTicket[],
  lastTicketSynced?: number
): IndividualTicket | { ticket_id?: number } => {
  if (lastTicketSynced) {
    // coming from recursion
    Queue(data).remove();
    return { ticket_id: lastTicketSynced };
  } else if (Queue(data).size() < 1 && tickets.length > 0) {
    // first time
    Queue(data).add(tickets);
    return { ticket_id: undefined };
  } else {
    // enters here when subscription calls handleMatch again
    const difference = getDifference(data, tickets);
    if (difference.length > 0) Queue(data).add(difference);
    return Queue(data).first();
  }
};

export const handleMatch = (lastTicketSynced?: number) => async ({
  data: { solidarity_tickets: tickets }
}: SubscriptionResponse) => {
  if (tickets.length > 0)
    log(`${new Date()}: \nReceiving data on subscription GraphQL API...`);

  const oldFirst = setRecursionLogic(tickets, lastTicketSynced);

  if (
    Queue(data).size() > 0 &&
    oldFirst.ticket_id != Queue(data).first().ticket_id
  ) {
    await createMatch(Queue(data).first());
    const response = {
      data: { solidarity_tickets: [] }
    };
    return handleMatch(Queue(data).first().ticket_id)(response);
  } else {
    log("No tickets to sync");
    return undefined;
  }
};

export default handleMatch;
export { default as handleTicket } from "./Services/handleTicket";
