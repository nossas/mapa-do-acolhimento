import dbg from "../../dbg";
import client from "./";
import { Ticket } from "../../types";
import * as yup from "yup";

const log = dbg.extend("createTicket");

const schema = yup.object().shape({
  requester_id: yup.number().required(),
  submitter_id: yup.number().required(),
  assignee_id: yup.number().required(),
  status: yup.string().required(),
  subject: yup.string().required(),
  comment: yup.object().shape({
    body: yup.string().required(),
    author_id: yup.number().required(),
    public: yup.boolean().required()
  }),
  fields: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number(),
        value: yup.string().nullable()
      })
    )
    .min(4)
    .required(),
  external_id: yup.number().required()
});

export default async (ticket: Ticket): Promise<Ticket | undefined> => {
  log(`${new Date()}: CREATE TICKET`);
  try {
    const validatedTicket = await schema.validate(ticket, {
      stripUnknown: true
    });
    return new Promise(resolve => {
      return client.tickets.create(
        { ticket: validatedTicket } as any,
        (err, _req, result: any) => {
          if (err) {
            log(
              `Failed to create ticket for user '${ticket.requester_id}'`.red,
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
          log("Zendesk ticket created successfully!");
          return resolve(result);
        }
      );
    });
  } catch (e) {
    log("failed to create ticket: ".red, e);
    return undefined;
  }
};
