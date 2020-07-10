import handleTicket from "./Services/handleTicket";
import { fetchVolunteersAvailable } from "./Volunteers";
import { updateSolidarityTickets } from "../graphql/mutations";
import { getDifference } from "../utils";
import { SubscriptionResponse, IndividualTicket } from "../types";
import dbg from "../dbg";

const log = dbg.extend("match");
const syncLog = dbg.extend("match").extend("syncTickets");

let AGENT = 1;
let data: IndividualTicket[] = [];

export const Queue = {
  add: (data: IndividualTicket[], record: IndividualTicket[]) => [
    ...data,
    ...record
  ],
  remove: (data: IndividualTicket[], ticket_id: number) =>
    data.filter(t => t.ticket_id !== ticket_id),
  first: (data: IndividualTicket[]) =>
    typeof data[0] != "undefined"
      ? data[0]
      : (({ ticket_id: undefined } as unknown) as IndividualTicket),
  size: (data: IndividualTicket[]) => data.length
};

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
    data = Queue.remove(data, lastTicketSynced);
    return { ticket_id: lastTicketSynced };
  } else if (Queue.size(data) < 1 && tickets.length > 0) {
    // first time
    data = Queue.add(data, tickets);
    return { ticket_id: undefined };
  } else {
    // enters here when subscription calls handleMatch again
    const difference = getDifference(data, tickets);
    if (difference.length > 0) data = Queue.add(data, difference);
    return Queue.first(data);
  }
};

export const handleMatch = (lastTicketSynced?: number) => async ({
  data: { solidarity_tickets: tickets }
}: SubscriptionResponse) => {
  if (tickets.length > 0)
    log(`${new Date()}: \nReceiving data on subscription GraphQL API...`);

  const oldFirst = setRecursionLogic(tickets, lastTicketSynced);

  if (
    Queue.size(data) > 0 &&
    oldFirst.ticket_id != Queue.first(data).ticket_id
  ) {
    await createMatch(Queue.first(data));
    const response = {
      data: { solidarity_tickets: [] }
    };
    return handleMatch(Queue.first(data).ticket_id)(response);
  } else {
    log("No tickets to sync");
    return undefined;
  }
};

export default handleMatch;
export { default as handleTicket } from "./Services/handleTicket";
