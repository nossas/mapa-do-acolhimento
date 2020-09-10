import { getClosestVolunteer, createVolunteerTicket } from "../Volunteers";
import {
  fetchIndividual,
  forwardPublicService,
  updateIndividualTicket
} from "../Individual";
import { createMatchTicket } from "../../graphql/mutations";
import { Volunteer, IndividualTicket } from "../../types";
import {
  getRequestedVolunteerType,
  getVolunteerOrganizationId
} from "../../utils";
import dbg from "../../dbg";

const log = dbg.extend("handleTicket");

const setReferences = (ticket: IndividualTicket) => {
  if (
    ticket.status_acolhimento === "solicitação_repetida" &&
    ticket.atrelado_ao_ticket
  ) {
    return {
      ...ticket,
      ticket_id: ticket.atrelado_ao_ticket
    };
  }
  return ticket;
};

export default async (
  individualTicket: IndividualTicket,
  volunteersAvailable: Volunteer[],
  AGENT: number
) => {
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

  const localIndividualTicket = setReferences(individualTicket);

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
      {
        ticket_id: localIndividualTicket["ticket_id"],
        state: individual[0].state
      },
      AGENT
    );
    if (!updateIndividual) return undefined;
    return localIndividualTicket["ticket_id"] !== individualTicket["ticket_id"]
      ? [individualTicket["ticket_id"], updateIndividual]
      : updateIndividual;
  }

  const volunteerTicketId = await createVolunteerTicket(
    volunteer,
    localIndividualTicket,
    AGENT
  );
  if (!volunteerTicketId) return undefined;
  volunteer["ticket_id"] = volunteerTicketId;

  const updateIndividual = await updateIndividualTicket(
    localIndividualTicket,
    volunteer as Volunteer & { ticket_id: number },
    AGENT
  );
  if (!updateIndividual) return undefined;

  const matchTicket = await createMatchTicket(
    localIndividualTicket,
    volunteer as Volunteer & { ticket_id: number }
  );
  if (!matchTicket) return undefined;

  return localIndividualTicket["ticket_id"] !== individualTicket["ticket_id"]
    ? [individualTicket["ticket_id"], updateIndividual]
    : updateIndividual;
};
