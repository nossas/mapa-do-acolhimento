import axios from "axios";
import { sign } from "jsonwebtoken";
import { Ticket, User } from "../../types";
import logger from "../../logger";

function getSupportType(subject: string) {
  return subject.includes("Psicológico") ? "psychological" : "legal";
}

function getSupportRequests(ticket: Ticket, msrs: User[]) {
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

const log = logger.child({ labels: { process: "createSupportRequests" } });

export default async function createSupportRequests(
  msrZendeskTickets: (Ticket | undefined)[],
  msrs: User[]
) {
  log.info("Starting createSupportRequests...");
  const validTickets = msrZendeskTickets.filter(Boolean);
  if (validTickets.length < 1 || !validTickets)
    throw new Error("No valid tickets to save as support requests");

  const lambdaUrl = process.env["NEW_MATCH_LAMBDA_URL"];
  const jwtSecret = process.env["JWT_SECRET"];
  const endpoint = `${lambdaUrl}/create`;
  const authToken = sign({ sub: "listener-solidarity" }, jwtSecret!, {
    expiresIn: 300, // expires in 5 minutes
  });
  const supportRequests = msrZendeskTickets.map((ticket) =>
    getSupportRequests(ticket as Ticket, msrs)
  );
  const createSupportRequest = await axios.post(endpoint, supportRequests, {
    headers: {
      Authorization: authToken,
    },
  });

  return createSupportRequest;
}
