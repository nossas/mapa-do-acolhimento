import * as yup from "yup";
import updateTicket from "../Services/updateTicket";
import { IndividualTicket, Volunteer } from "../../types";
import { getCurrentDate, agentSelectionDicio, agentDicio } from "../../utils";
import dbg from "../../dbg";
import individualComment from "./email";

const log = dbg.extend("updateIndividualTicket");

const hasuraSchema = yup
  .object()
  .shape({
    status: yup.string().required(),
    assignee_id: yup.number().required(),
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
      .min(4)
      .required(),
    tags: yup.array().of(yup.string()),
    updated_at: yup.string().required(),
    link_match: yup.string().required(),
    data_encaminhamento: yup.string().required(),
    nome_voluntaria: yup.string().required(),
    status_acolhimento: yup.string().required(),
    ticket_id: yup.number().required()
  })
  .required();

export default async (
  individual: IndividualTicket,
  volunteer: Volunteer & { ticket_id: number },
  agent: number
) => {
  log("Entering updateIndividualTicket");
  const ticket = {
    ticket_id: individual.ticket_id,
    status: "pending",
    assignee_id: agentSelectionDicio[agent],
    custom_fields: [
      {
        id: 360016631592,
        value: volunteer.name
      },
      {
        id: 360014379412,
        value: "encaminhamento__realizado"
      },
      {
        id: 360016631632,
        value: `https://mapadoacolhimento.zendesk.com/agent/tickets/${volunteer.ticket_id}`
      },
      {
        id: 360017432652,
        value: String(getCurrentDate())
      }
    ],
    comment: {
      body: individualComment({
        volunteer,
        individual_name: individual.nome_msr,
        assignee_name: agentDicio[agentSelectionDicio[agent]]
      }),
      author_id: agentSelectionDicio[agent],
      public: true
    }
  };

  return await updateTicket(ticket, hasuraSchema);
};
