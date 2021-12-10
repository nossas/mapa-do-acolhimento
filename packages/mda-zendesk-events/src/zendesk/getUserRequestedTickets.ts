import ZendeskBase from "./ZendeskBase";
import { TicketZendesk } from "../interfaces/Ticket";

interface ResponseTickets {
  data: {
    tickets: TicketZendesk[];
  };
}

/**
 * Returns all requested tickets from requester
 * @param requester_id Requester's id
 * @returns ResponseTickets object
 */
const getUserRequestedTickets = async (
  requester_id: number | string
): Promise<ResponseTickets | undefined> =>
  await ZendeskBase.get(`users/${requester_id}/tickets/requested`);

export default getUserRequestedTickets;
