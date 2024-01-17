import axios, { AxiosError } from "axios";
import { sign } from "jsonwebtoken";
import { SupportRequestPayload, Ticket, User } from "../../types";
import logger from "../../logger";
import { getSupportRequests } from "../../utils";

type SupportRequestResponse = {
  message: Array<
    {
      createdAt: string;
      updatedAt: string;
      supportRequestId: number;
      status: string;
    } & SupportRequestPayload
  >;
};

const log = logger.child({ labels: { process: "createSupportRequests" } });

export default async function createSupportRequests(
  msrZendeskTickets: (Ticket | undefined)[],
  msrs: User[]
) {
  const validTickets = (msrZendeskTickets || [])
    .filter(Boolean)
    .filter((ticket) => ticket?.status === "open" || ticket?.status === "new");

  if (validTickets.length < 1)
    return "No valid tickets to save as support requests";

  const ticketIds = validTickets.map((ticket) => (ticket ? ticket.id : ""));

  try {
    log.info(`Starting createSupportRequests for these tickets: ${ticketIds}`);
    const lambdaUrl = process.env["NEW_MATCH_LAMBDA_URL"];
    const jwtSecret = process.env["JWT_SECRET"];
    const authToken = sign({ sub: "listener-solidarity" }, jwtSecret!, {
      expiresIn: 300, // expires in 5 minutes
    });
    const supportRequests = msrZendeskTickets.map((ticket) =>
      getSupportRequests(ticket as Ticket, msrs)
    );
    const createSupportRequest = await axios.post<SupportRequestResponse>(
      lambdaUrl!,
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
    const axiosError = e as AxiosError;
    if (axiosError.response) {
      const axiosErrorMsg = `Couldnt create support requests for these tickets: ${ticketIds} and got this error: ${
        axiosError?.response?.status
      } - ${JSON.stringify(axiosError?.response?.data)}`;
      log.error(axiosErrorMsg);
      throw new Error(axiosErrorMsg);
    }

    const error = e as Error;
    const errorMsg = `Couldnt create support requests for these tickets: ${ticketIds} and got this error: ${error.message}`;
    log.error(errorMsg);

    throw new Error(errorMsg);
  }
}
