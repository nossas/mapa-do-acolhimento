import dbg from "../dbg";
import { SubscriptionResponse, Volunteer, IndividualTicket } from "../types";
import {
  getRequestedVolunteerType,
  getVolunteerOrganizationId
} from "../services/utils";
import {
  fetchVolunteersAvailable,
  getClosestVolunteer,
  createVolunteerTicket
} from "./Volunteers";
import {
  fetchIndividual,
  forwardPublicService,
  updateIndividualTicket
} from "./Individual";
import {
  createMatchTicket,
  updateSolidarityTickets
} from "../graphql/mutations";

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

  // only add new items to cache if they werent already in it
  cache = cache
    .filter(c => !tickets.map(t => t.ticket_id).includes(c.ticket_id))
    .concat(tickets);

  if (cache.length > 0) {
    const volunteersAvailable = await fetchVolunteersAvailable();

    const matchs = cache.map(async individualTicket => {
      const {
        subject,
        status_acolhimento: statusAcolhimento,
        atrelado_ao_ticket: atreladoAoTicket,
        requester_id: requesterId,
        ticket_id: ticketId
      } = individualTicket;

      if (
        statusAcolhimento === "solicitação_repetida" &&
        atreladoAoTicket === null
      ) {
        log(
          `Ticket is "solicitação_repetida" but field "atrelado_ao_ticket is null`
        );
        return ticketId;
      }

      const newTicketId = ticketId;
      if (statusAcolhimento === "solicitação_repetida" && atreladoAoTicket) {
        individualTicket["ticket_id"] = atreladoAoTicket;
      }

      const volunteerType = getRequestedVolunteerType(subject);
      if (!volunteerType) return ticketId;

      const volunteerOrganizationId = getVolunteerOrganizationId(volunteerType);
      const filteredVolunteers = volunteersAvailable.filter(
        ({ organization_id }) => organization_id === volunteerOrganizationId
      );

      const individual = await fetchIndividual(requesterId);
      if (individual.length < 1) return ticketId;

      log(`Searching for closest volunteer to MSR '${requesterId}'`);
      const volunteer = getClosestVolunteer(individual[0], filteredVolunteers);
      if (!volunteer) {
        const updateIndividual = await forwardPublicService(
          ticketId,
          individual[0].state,
          AGENT
        );
        if (!updateIndividual) return undefined;
        return ticketId;
      }

      const volunteerTicketId = await createVolunteerTicket(
        volunteer,
        individualTicket,
        AGENT
      );
      if (!volunteerTicketId) return undefined;
      volunteer["ticket_id"] = volunteerTicketId;

      const updateIndividual = await updateIndividualTicket(
        individualTicket,
        volunteer as Volunteer & { ticket_id: number },
        AGENT
      );
      if (!updateIndividual) return undefined;

      const matchTicket = await createMatchTicket(
        individualTicket,
        volunteer as Volunteer & { ticket_id: number }
      );
      if (!matchTicket) return undefined;

      return individualTicket["ticket_id"] !== newTicketId
        ? [newTicketId, updateIndividual]
        : updateIndividual;
    });

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
