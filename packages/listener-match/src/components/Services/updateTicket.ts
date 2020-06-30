import { updateTicket } from "../Zendesk";
import { composeCustomFields } from "../../utils";
import dbg from "../../dbg";
import { updateSolidarityTickets } from "../../graphql/mutations";
import { UpdateTicket } from "../../types";

const log = dbg.extend("updateTicket");

export default async (ticket: UpdateTicket & { ticket_id: number }, schema) => {
  try {
    log(`Updating MSR ticket '${ticket.ticket_id}' in Zendesk...`);
    const zendeskTicket = await updateTicket(
      ticket.ticket_id,
      ticket as UpdateTicket
    );
    if (!zendeskTicket) {
      throw new Error("Zendesk ticket update returned errors");
    }

    const hasuraTicket = {
      ...zendeskTicket,
      ...composeCustomFields(zendeskTicket.custom_fields),
      ticket_id: zendeskTicket.id
    };

    const validatedTicket = await schema.validate(hasuraTicket, {
      stripUnknown: true
    });

    log(
      `Updating individual ticket '${validatedTicket.ticket_id}' in Hasura...`
    );

    updateSolidarityTickets(validatedTicket, [validatedTicket.ticket_id]);

    return zendeskTicket.id;
  } catch (e) {
    log("failed to create ticket in zendesk: ".red, e);
    return undefined;
  }
};
