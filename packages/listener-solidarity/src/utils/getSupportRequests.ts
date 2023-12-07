import { getStatusAcolhimento } from ".";
import { SupportRequestPayload, Ticket, User } from "../types";

export function getSupportType(subject: string) {
  const transform = subject.toLowerCase();
  if (transform.includes("psicológico")) return "psychological";
  if (transform.includes("jurídico")) return "legal";
  throw new Error("Unsupported support type");
}

export function isValidNumber(georef: string | number | null) {
  if (!georef) return false;
  const num = Number(georef);
  return !isNaN(num);
}

export function sanitizeCity(city: string) {
  if (city === "ZERO_RESULTS") return "NOT_FOUND";
  if (!city) return "NOT_FOUND";
  return city;
}

export function getStatus(zendeskStatus: string) {
  if (!zendeskStatus) return "open";

  const newStatus = {
    solicitação_repetida: "duplicated",
    solicitação_recebida: "open",
  };

  const unsupportedStatus = Object.keys(newStatus).find(
    (key) => zendeskStatus === key
  );
  if (!unsupportedStatus) return "open";

  return newStatus[zendeskStatus];
}

export default function getSupportRequests(
  ticket: Ticket,
  msrs: User[]
): SupportRequestPayload {
  const user = msrs.find((user) => user.user_id === ticket.requester_id);
  if (!user) throw new Error(`Didn't find a user for this ticket`);

  const statusAcolhimento = getStatusAcolhimento(ticket);

  return {
    msrId: ticket.requester_id,
    zendeskTicketId: ticket.id,
    supportType: getSupportType(ticket.subject),
    priority: null,
    supportExpertise: null,
    hasDisability: null,
    requiresLibras: null,
    acceptsOnlineSupport: true,
    lat: isValidNumber(user.user_fields.latitude)
      ? Number(user.user_fields.latitude)
      : null,
    lng: isValidNumber(user.user_fields.longitude)
      ? Number(user.user_fields.longitude)
      : null,
    city: sanitizeCity(user.user_fields.city),
    state: user.user_fields.state || "NOT_FOUND",
    status: getStatus(statusAcolhimento || ""),
  };
}
