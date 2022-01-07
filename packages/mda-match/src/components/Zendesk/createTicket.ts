import dbg from "../../dbg";
import { agentSelectionDicio } from "../../utils";
import { Ticket } from "../../types";
import * as yup from "yup";
import zendeskRequest from "./zendeskRequest";

const log = dbg.child({
  module: "zendesk",
  labels: { process: "createTicket" }
});

const schema = yup
  .object()
  .shape({
    assignee_id: yup
      .number()
      .oneOf(Object.values(agentSelectionDicio))
      .required(),
    requester_id: yup.number().required(),
    submitter_id: yup.number().required(),
    status: yup.string().required(),
    subject: yup.string().required(),
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
      .required(),
    external_id: yup.number().required(),
    custom_fields: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            id: yup
              .number()
              .oneOf([360016681971, 360016631632, 360014379412, 360017432652])
              .required(),
            value: yup.string().required()
          })
          .required()
      )
      .min(4)
      .required()
  })
  .required();

export default async (ticket: Ticket): Promise<Ticket | undefined> => {
  try {
    const validatedTicket = await schema.validate(ticket, {
      stripUnknown: true
    });
    return new Promise(resolve => {
      zendeskRequest(`tickets.json`,'POST',JSON.stringify({ ticket: validatedTicket } as { ticket }),201)
      .then((result) =>{
        log.info("Zendesk ticket created successfully!");
        return resolve(result as Ticket);
      })
     .catch((err)=>{
        log.error(
          `Failed to create ticket for user '${ticket.requester_id}' %o`,
           err
        );
        return resolve(undefined);
      });
    });
  } catch (e: any) {
    log.error("failed to create ticket: ".red, e);
    return undefined;
  }
};
