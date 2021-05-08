import { createVolunteerTicket } from "../Volunteers";
import { forwardPublicService, updateIndividualTicket } from "../Individual";
import { createMatchTicket } from "../../graphql/mutations";
import { Volunteer, IndividualTicket } from "../../types";
import dbg from "../../dbg";

const log = dbg.child({ labels: { process: "handleTicket" } });

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
  AGENT: number,
  closestVolunteer?: Volunteer
) => {
  const {
    status_acolhimento: statusAcolhimento,
    atrelado_ao_ticket: atreladoAoTicket,
    ticket_id: ticketId,
    individual
  } = individualTicket;

  if (
    statusAcolhimento === "solicitação_repetida" &&
    atreladoAoTicket === null
  ) {
    log.warn(
      `Ticket is "solicitação_repetida" but field "atrelado_ao_ticket is null`
    );
    return ticketId;
  }

  const localIndividualTicket = setReferences(individualTicket);

  if (!closestVolunteer) {
    const updateIndividual = await forwardPublicService(
      {
        ticket_id: localIndividualTicket["ticket_id"],
        state: individual.state
      },
      AGENT
    );
    if (!updateIndividual) {
      log.warn(
        `No ticket ID returned after individual ticket '${localIndividualTicket.ticket_id}' tried to be updated`
      );
      return undefined;
    }
    return localIndividualTicket["ticket_id"] !== individualTicket["ticket_id"]
      ? [individualTicket["ticket_id"], updateIndividual]
      : updateIndividual;
  }

  const volunteerTicketId = await createVolunteerTicket(
    closestVolunteer,
    localIndividualTicket,
    AGENT
  );
  if (!volunteerTicketId) {
    log.warn(
      `No ticket ID returned after volunteer '${closestVolunteer.user_id}' ticket tried to be created`
    );
    return undefined;
  }
  closestVolunteer["ticket_id"] = volunteerTicketId;

  const updateIndividual = await updateIndividualTicket(
    localIndividualTicket,
    closestVolunteer as Volunteer & { ticket_id: number },
    AGENT
  );
  if (!updateIndividual) {
    log.warn(
      `No ticket ID returned after individual ticket '${localIndividualTicket.ticket_id}' tried to be updated`
    );
    return undefined;
  }

  const matchTicket = await createMatchTicket(
    localIndividualTicket,
    closestVolunteer as Volunteer & { ticket_id: number }
  );
  if (!matchTicket) {
    log.warn("No match ticket response was generated");
    return undefined;
  }

  return localIndividualTicket["ticket_id"] !== individualTicket["ticket_id"]
    ? [individualTicket["ticket_id"], updateIndividual]
    : updateIndividual;
};
