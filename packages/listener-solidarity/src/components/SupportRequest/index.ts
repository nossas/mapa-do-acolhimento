import axios, { AxiosError } from "axios";
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

type Response = {
  message: Array<{
    msrId: string;
    zendeskTicketId: string;
    supportRequestId: number;
    supportType: string;
    supportExpertise: string | null;
    priority: number | null;
    hasDisability: boolean;
    requiresLibras: boolean;
    acceptsOnlineSupport: boolean;
    lat: string;
    lng: string;
    city: string;
    state: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }>;
};

const log = logger.child({ labels: { process: "createSupportRequests" } });

export default async function createSupportRequests(
  msrZendeskTickets: (Ticket | undefined)[],
  msrs: User[]
) {
  const validTickets = (msrZendeskTickets || []).filter(Boolean);
  if (validTickets.length < 1)
    throw new Error("No valid tickets to save as support requests");
  const ticketIds = validTickets.map((ticket) => (ticket ? ticket.id : ""));

  try {
    log.info(`Starting createSupportRequests for these tickets: ${ticketIds}`);
    const lambdaUrl = process.env["NEW_MATCH_LAMBDA_URL"];
    const jwtSecret = process.env["JWT_SECRET"];
    const endpoint = `${lambdaUrl}/create`;
    const authToken = sign({ sub: "listener-solidarity" }, jwtSecret!, {
      expiresIn: 300, // expires in 5 minutes
    });
    const supportRequests = msrZendeskTickets.map((ticket) =>
      getSupportRequests(ticket as Ticket, msrs)
    );
    const createSupportRequest = await axios.post<Response>(
      endpoint,
      supportRequests,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    log.info(
      `Success creating support requests for these tickets: ${ticketIds}`
    );
    return createSupportRequest;
  } catch (e) {
    const error = e as AxiosError;
    const errorMsg = `Couldnt create support requests for these tickets: ${ticketIds} and got this error: ${
      error?.response?.status
    } - ${JSON.stringify(error?.response?.data)}`;
    log.error(errorMsg);
    return errorMsg;
  }
}
