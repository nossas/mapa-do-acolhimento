import * as yup from "yup";
import { updateTicket } from "../Services";
import { getCurrentDate, agentSelectionDicio } from "../../utils";
import dbg from "../../dbg";

const log = dbg.child({ label: { process: "updateIndividualTicket" } });

const hasuraSchema = yup
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
            id: yup.number(),
            value: yup.string().nullable()
          })
          .required()
      )
      .min(3)
      .required(),
    tags: yup.array().of(yup.string()),
    description: yup.string().required(),
    updated_at: yup.string().required(),
    data_encaminhamento: yup.string().required(),
    status_acolhimento: yup.string().required(),
    ticket_id: yup.number().required()
  })
  .required();

export default async (
  { ticket_id, state }: { ticket_id: number; state: string },
  agent: number
) => {
  log.info("Couldn't find any close volunteers for MSR");
  const ticket = {
    ticket_id,
    status: "pending",
    assignee_id: agentSelectionDicio[agent],
    custom_fields: [
      {
        id: 360021879791,
        value: state
      },
      {
        id: 360014379412,
        value: "encaminhamento__realizado_para_serviço_público"
      },
      {
        id: 360017432652,
        value: String(getCurrentDate())
      }
    ],
    comment: {
      body: `Ticket da MSR foi atualizado após ela ser encaminhada para um serviço público`,
      author_id: agentSelectionDicio[agent],
      public: false
    }
  };

  return await updateTicket(ticket, hasuraSchema);
};
