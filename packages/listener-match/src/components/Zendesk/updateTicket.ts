import dbg from "../../dbg";
import client from "./";
import { UpdateTicket, Ticket } from "../../types";
import { agentSelectionDicio } from "../../services/utils";
import * as yup from "yup";
const log = dbg.extend("updateTicket");

const schema = yup
  .object()
  .shape({
    status: yup.string().required(),
    assignee_id: yup
      .number()
      .oneOf(Object.values(agentSelectionDicio))
      .required(),
    custom_fields: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            id: yup
              .number()
              .oneOf([
                360016631592,
                360014379412,
                360016631632,
                360017432652,
                360021879791
              ])
              .required(),
            value: yup.string().required()
          })
          .required()
      )
      .min(3)
      .required(),
    comment: yup
      .object()
      .shape({
        body: yup.string().required(),
        author_id: yup
          .number()
          .oneOf(Object.values(agentSelectionDicio))
          .required(),
        public: yup.boolean().required()
      })
      .required()
  })
  .required();

export default async (
  ticketId: number,
  ticket: UpdateTicket
): Promise<Ticket | undefined> => {
  try {
    const validatedTicket = await schema.validate(ticket, {
      stripUnknown: true
    });
    return new Promise(resolve => {
      return client.tickets.update(
        ticketId,
        { ticket: validatedTicket } as { ticket },
        (err, _req, result) => {
          if (err) {
            log(`Failed to update ticket '${ticketId}'`.red, err);
            return resolve(undefined);
          }
          // log(
          //   `Results from zendesk ticket update ${JSON.stringify(
          //     result,
          //     null,
          //     2
          //   )}`
          // );
          // log("Zendesk ticket updated successfully!");
          return resolve(result as Ticket);
        }
      );
    });
  } catch (e) {
    log("failed to update msr ticket: ".red, e);
    return undefined;
  }
};
