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

const Queue = (record?: IndividualTicket[]) => {
  const add = () => data.unshift(...record);
  const remove = () => data.pop();
  const last = () =>
    typeof data[data.length - 1] != "undefined"
      ? data[data.length - 1]
      : (({ ticket_id: undefined } as unknown) as IndividualTicket);
  const size = () => data.length;
  return {
    add,
    remove,
    last,
    size
  };
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

export const handleMatch = (oldTicket?: number) => async ({
  data: { solidarity_tickets: tickets }
}: SubscriptionResponse) => {
  let oldLast: IndividualTicket | { ticket_id?: number };
  if (tickets)
    log(`${new Date()}: \nReceiving data on subscription GraphQL API...`);

  if (oldTicket) {
    // coming from recursion
    Queue().remove();
    oldLast = { ticket_id: oldTicket };
  } else if (Queue().size() < 1 && tickets.length > 0) {
    // first time
    Queue(tickets).add();
    oldLast = { ticket_id: undefined };
  } else {
    // enters here when subscription calls handleMatch again
    oldLast = Queue().last();
    const difference = getDifference(data, tickets);
    if (difference.length > 0) Queue(difference).add();
  }

  if (Queue().size() > 0 && oldLast.ticket_id != Queue().last().ticket_id) {
    await createMatch(Queue().last());
    const response = {
      data: { solidarity_tickets: [] }
    };
    return handleMatch(Queue().last().ticket_id)(response);
  } else {
    log("No tickets to sync");
    return undefined;
  }
};

export default handleMatch;
export { default as handleTicket } from "./Services/handleTicket";
