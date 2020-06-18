import dbg from "../dbg";
import { SubscriptionResponse } from "../types";
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

const log = dbg.extend("match");

export const handleMatch = () => async (response: SubscriptionResponse) => {
  log(`${new Date()}: \nReceiving data on subscription GraphQL API...`);
  // log({ response: response.data.solidarity_tickets });
  const {
    data: { solidarity_tickets: tickets }
  } = response;
  const volunteers_available = await fetchVolunteersAvailable();
  const matchs = tickets
    .filter(ticket => {
      if (ticket.status_acolhimento === "solicitaçao_repetida") {
        return ticket.atrelado_ao_ticket !== null;
      }
      return true;
    })
    .map(async ticket => {
      const {
        subject,
        status_acolhimento,
        atrelado_ao_ticket,
        requester_id,
        ticket_id
      } = ticket;
      const volunteer_type = getRequestedVolunteerType(subject);
      if (!volunteer_type) return ticket.ticket_id;

      const volunteer_organization_id = getVolunteerOrganizationId(
        volunteer_type
      );
      const individual = await fetchIndividual(requester_id);
      if (individual.length < 1) return ticket_id;
      const filteredVolunteers = volunteers_available.filter(
        ({ organization_id }) => organization_id === volunteer_organization_id
      );
      // log(filteredVolunteers);
      // log(individual);
      const fetchVolunteer = getClosestVolunteer(
        individual[0],
        filteredVolunteers
      );

      if (!fetchVolunteer)
        return forwardPublicService(ticket_id, individual[0].state);

      // log({ ticket, fetchVolunteer });

      createVolunteerTicket(fetchVolunteer);
      if (status_acolhimento === "solicitação_repetida" && atrelado_ao_ticket) {
        updateIndividualTicket({ ...ticket, ticket_id: atrelado_ao_ticket });
        return [ticket_id, atrelado_ao_ticket];
      }
      updateIndividualTicket(ticket);
      return ticket_id;
    });
  return matchs;
};

export default handleMatch;
