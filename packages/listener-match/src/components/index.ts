import handleTicket from "./Services/handleTicket";
import { fetchVolunteersAvailable } from "./Volunteers";
import { updateSolidarityTickets } from "../graphql/mutations";
import { filterCache } from "../utils";
import { SubscriptionResponse, IndividualTicket } from "../types";
import dbg from "../dbg";

const log = dbg.extend("match");
const syncLog = dbg.extend("syncTickets");

let AGENT = 1;
let cache: IndividualTicket[] = [];

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

export const handleMatch = () => async (response: SubscriptionResponse) => {
  log(`${new Date()}: \nReceiving data on subscription GraphQL API...`);

  const {
    data: { solidarity_tickets: tickets }
  } = response;

  cache = filterCache(cache, tickets);

  if (cache.length > 0) {
    const volunteersAvailable = await fetchVolunteersAvailable();

    const matchs = cache.map(individualTicket =>
      handleTicket(individualTicket, volunteersAvailable, AGENT)
    );

    const resolvedMatchs = (await Promise.all(matchs)).flat(2).filter(Boolean);
    if (resolvedMatchs.length < 1) {
      log("No tickets to sync");
      return undefined;
    }

    const isSynced = await syncTickets(resolvedMatchs as number[]);
    if (!isSynced) {
      syncLog("Couldn't update sync status from MSR tickets:", resolvedMatchs);
      return undefined;
    }

    log("Tickets that passed through match:", isSynced);
    cache = cache.filter(c => !isSynced.includes(c.ticket_id));

    log("Match is done");
    return true;
  } else {
    log("No tickets to sync");
    return undefined;
  }
};

export default handleMatch;
export { default as handleTicket } from "./Services/handleTicket";
