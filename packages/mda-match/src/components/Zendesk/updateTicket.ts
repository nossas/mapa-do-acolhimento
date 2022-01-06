import dbg from "../../dbg";
import { UpdateTicket, Ticket } from "../../types";
import { agentSelectionDicio } from "../../utils";
import * as yup from "yup";
import updateOneTicket from "./updateOneTicket";

const log = dbg.child({
  module: "zendesk",
  labels: { process: "updateTicket" }
});

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
      return updateOneTicket({ ticket: validatedTicket } as { ticket }, ticketId)
      .then((result)=>{
        return resolve(result as Ticket);
      })
      .catch((err)=>{
        log.error(`Failed to update ticket '${ticketId}'`, err);
        return resolve(undefined);
      })
    });
  } catch (e: any) {
    log.error("failed to update msr ticket: ", e);
    return undefined;
  }
};
