import { Ticket, User } from "../types";

export function getSupportType(subject: string) {
  const transform = subject.toLowerCase();
  if (transform.includes("psicológico")) return "psychological";
  if (transform.includes("jurídico")) return "legal";
  throw new Error("Unsupported support type");
}

export default function getSupportRequests(ticket: Ticket, msrs: User[]) {
  const user = msrs.find((user) => user.user_id === ticket.requester_id);
  if (!user) throw new Error(`Didn't find a user for this ticket ${ticket.id}`);

  return {
    msrId: ticket.requester_id,
    zendeskTicketId: ticket.id,
    supportType: getSupportType(ticket.subject),
    priority: null,
    supportExpertise: null,
    hasDisability: false,
    requiresLibras: false,
    acceptsOnlineSupport: true,
    lat: Number(user.user_fields.latitude),
    lng: Number(user.user_fields.longitude),
    city: user.user_fields.city,
    state: user.user_fields.state,
  };
}
