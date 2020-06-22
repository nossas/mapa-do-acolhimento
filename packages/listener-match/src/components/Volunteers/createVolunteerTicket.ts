import * as yup from "yup";
import { IndividualTicket, Volunteer } from "../../types";
import {
  getCurrentDate,
  getVolunteerType,
  composeCustomFields
} from "../../services/utils";
import { createTicket } from "../Zendesk";
import { saveSolidarityTicket } from "../../graphql/mutations";
import dbg from "../../dbg";
const log = dbg.extend("createVolunteerTicket");

const AGENT = Number(process.env.AGENT_ID) || 0;

const hasuraSchema = yup
  .object()
  .shape({
    assignee_id: yup.number().required(),
    requester_id: yup.number().required(),
    submitter_id: yup.number().required(),
    status: yup.string().required(),
    subject: yup.string().required(),
    description: yup.string().required(),
    external_id: yup.number().required(),
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
    community_id: yup.number().required(),
    ticket_id: yup.number().required(),
    created_at: yup.string().required(),
    organization_id: yup.number().required(),
    tags: yup.array().of(yup.string()),
    updated_at: yup.string().required(),
    link_match: yup.string().required(),
    data_encaminhamento: yup.string().required(),
    nome_msr: yup.string().required(),
    status_acolhimento: yup.string().required()
  })
  .required();

export default async (volunteer: Volunteer, individual: IndividualTicket) => {
  const ticket = {
    external_id: individual.external_id,
    requester_id: volunteer.user_id,
    submitter_id: AGENT,
    assignee_id: AGENT,
    status: "pending",
    subject: `[${getVolunteerType(volunteer.organization_id).type}] ${
      volunteer.name
    }`,
    comment: {
      body: `Voluntária recebeu um pedido de acolhimento de ${individual.nome_msr}`,
      author_id: AGENT,
      public: false
    },
    custom_fields: [
      {
        id: 360016681971,
        value: individual.nome_msr
      },
      {
        id: 360016631632,
        value: `https://mapadoacolhimento.zendesk.com/agent/tickets/${individual.ticket_id}`
      },
      {
        id: 360014379412,
        value: "encaminhamento__realizado"
      },
      {
        id: 360017432652,
        value: String(getCurrentDate())
      }
    ]
  };
  try {
    const zendeskTicket = await createTicket(ticket);
    if (!zendeskTicket) {
      throw new Error("Zendesk ticket creation returned errors");
    }

    log("Preparing ticket to be saved in Hasura");
    const hasuraTicket = {
      ...zendeskTicket,
      ...composeCustomFields(zendeskTicket.custom_fields),
      ticket_id: zendeskTicket.id,
      community_id: Number(process.env.COMMUNITY_ID)
    };
    // log({ hasuraTicket: JSON.stringify(hasuraTicket, null, 2) });

    const validatedTicket = await hasuraSchema.validate(hasuraTicket, {
      stripUnknown: true
    });

    const inserted = await saveSolidarityTicket([validatedTicket]);
    if (!inserted) return undefined;
    log("Successfully created volunteer ticket in Hasura");
    return inserted && inserted[0] && inserted[0].ticket_id;
  } catch (e) {
    log("failed to create ticket: ".red, e);
    return undefined;
  }
};
