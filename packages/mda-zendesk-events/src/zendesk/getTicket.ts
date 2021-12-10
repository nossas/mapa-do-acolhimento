import ZendeskBase from "./ZendeskBase";
import { TicketZendesk } from "../interfaces/Ticket";

interface ResponseTicket {
  data: {
    ticket: TicketZendesk;
  };
}

/**
 * Returns a ticket by id
 * @param ticket_id Ticket's id
 * @returns ResponseTicket object
 */
const getTicket = async (
  ticket_id: number | string
): Promise<ResponseTicket | undefined> =>
  await ZendeskBase.get(`tickets/${ticket_id}`);

export default getTicket;
