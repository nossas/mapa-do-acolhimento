import axios, { AxiosError } from "axios";
import { sign } from "jsonwebtoken";
import { Ticket, User } from "../../types";
import logger from "../../logger";
import { getSupportRequests } from "../../utils";

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
