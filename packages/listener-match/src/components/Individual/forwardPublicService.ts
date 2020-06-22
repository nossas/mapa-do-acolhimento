import * as yup from "yup";
import { updateTicket } from "../Zendesk";
import {
  getCurrentDate,
  composeCustomFields,
  agentDicio
} from "../../services/utils";
import dbg from "../../dbg";
import { updateSolidarityTickets } from "../../graphql/mutations";

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
      .min(3)
      .required(),
    description: yup.string().required(),
    updated_at: yup.string().required(),
    data_encaminhamento: yup.string().required(),
    status_acolhimento: yup.string().required(),
    ticket_id: yup.number().required()
  })
  .required();

export default async (ticket_id: number, state: string, agent: number) => {
  log("Entering forwardPublicService");
  const ticket = {
    status: "pending",
    assignee_id: agentDicio[agent],
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
      author_id: agentDicio[agent],
      public: false
    }
  };
  try {
    const zendeskTicket = await updateTicket(ticket_id, ticket);
    if (!zendeskTicket) {
      throw new Error("Zendesk ticket update returned errors");
    }

    log("Preparing ticket to be saved in Hasura");
    const hasuraTicket = {
      ...zendeskTicket,
      ...composeCustomFields(zendeskTicket.custom_fields),
      ticket_id: zendeskTicket.id
    };
    // log({ hasuraTicket: JSON.stringify(hasuraTicket, null, 2) });

    const validatedTicket = await hasuraSchema.validate(hasuraTicket, {
      stripUnknown: true
    });

    const inserted = await updateSolidarityTickets(validatedTicket, [
      validatedTicket.ticket_id
    ]);
    if (!inserted) return undefined;
    return inserted && inserted[0] && inserted[0].ticket_id;
  } catch (e) {
    log("failed to create ticket in zendesk: ".red, e);
    return undefined;
  }
};
