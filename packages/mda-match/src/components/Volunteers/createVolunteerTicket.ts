import * as yup from "yup";
import { createTicket } from "../Zendesk";
import { saveSolidarityTicket } from "../../graphql/mutations";
import {
  getCurrentDate,
  getVolunteerType,
  composeCustomFields,
  agentSelectionDicio
} from "../../utils";
import { IndividualTicket, Volunteer } from "../../types";
import dbg from "../../dbg";

const log = dbg.child({ labels: { process: "createVolunteerTicket" } });

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

export default async (
  volunteer: Volunteer,
  individual: IndividualTicket,
  agent: number
) => {
  const ticket = {
    external_id: individual.external_id,
    requester_id: volunteer.user_id,
    submitter_id: agentSelectionDicio[agent],
    assignee_id: agentSelectionDicio[agent],
    status: "pending",
    subject: `[${getVolunteerType(volunteer.organization_id).type}] ${volunteer.name
      }`,
    organization_id: volunteer.organization_id,
    comment: {
      body: `Voluntária recebeu um pedido de acolhimento de ${individual.nome_msr}`,
      author_id: agentSelectionDicio[agent],
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
    log.info(
      `Creating a ticket to volunteer '${ticket.requester_id}' in Zendesk...`
    );

    const zendeskTicket = await createTicket(ticket);
    if (!zendeskTicket) {
      throw new Error("Zendesk ticket creation returned errors");
    }

    const hasuraTicket = {
      ...zendeskTicket,
      ...composeCustomFields(zendeskTicket.custom_fields),
      ticket_id: zendeskTicket.id,
      community_id: Number(process.env.COMMUNITY_ID)
    };

    const validatedTicket = await hasuraSchema.validate(hasuraTicket, {
      stripUnknown: true
    });

    log.info(
      `Saving new volunteer ticket '${validatedTicket.ticket_id}' in Hasura...`
    );
    saveSolidarityTicket([validatedTicket]);

    // log("Successfully saved volunteer ticket in Hasura");
    return zendeskTicket.id;
  } catch (e: any) {
    log.error("failed to create ticket: ".red, e);
    return undefined;
  }
};
