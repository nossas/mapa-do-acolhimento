import dbg from "../../dbg";
import client from "./";
import { UpdateTicket, Ticket } from "../../types";

const log = dbg.extend("updateTicket");

export default async (
  ticketId: number,
  ticket: UpdateTicket
): Promise<Ticket | undefined> => {
  log(`${new Date()}: UPDATE TICKET '${ticketId}'`);
  return new Promise(resolve => {
    return client.tickets.update(
      ticketId,
      { ticket } as any,
      (err, _req, result: any) => {
        if (err) {
          log(
            `Failed to update ticket for user '${ticket.requester_id}'`.red,
            err
          );
          return resolve(undefined);
        }
        log(
          `Results from zendesk ticket creation ${JSON.stringify(
            result,
            null,
            2
          )}`
        );
        log("Zendesk ticket updated successfully!");
        return resolve(result);
      }
    );
  });
};
