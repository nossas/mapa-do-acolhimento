import * as yup from "yup";
import { Ticket, IndividualTicket, CustomFields, Volunteer } from "../../types";
import { getCurrentDate, getVolunteerType } from "../../services/utils";
import { createTicket } from "../Zendesk";
import { saveSolidarityTicket } from "../../graphql/mutations";
import dbg from "../../dbg";

const log = dbg.extend("createVolunteerTicket");

const AGENT = Number(process.env.AGENT_ID) || 0;

const hasuraSchema = yup.object().shape({
  community_id: yup.number().required(),
  ticket_id: yup.number().required(),
  assignee_id: yup.number().required(),
  created_at: yup.string().required(),
  custom_fields: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          id: yup.number().required(),
          value: yup
            .mixed()
            .oneOf([yup.string(), yup.number()])
            .required()
        })
        .required()
    )
    .min(4)
    .required(),
  description: yup.string().required(),
  organization_id: yup.number().required(),
  requester_id: yup.number().required(),
  status: yup.string().required(),
  subject: yup.string().required(),
  submitter_id: yup.number().required(),
  tags: yup.array().of(yup.string()),
  updated_at: yup.string().required(),
  external_id: yup.number().required(),
  link_match: yup.string().required(),
  data_encaminhamento: yup.string().required(),
  nome_msr: yup.string().required(),
  nome_voluntaria: yup.string().required(),
  status_acolhimento: yup.string().required()
});

const dicio = {
  360014379412: "status_acolhimento",
  360016631592: "nome_voluntaria",
  360016631632: "link_match",
  360016681971: "nome_msr",
  360017432652: "data_encaminhamento"
};

const saveTicketInHasura = async (
  ticket: Ticket
): Promise<number | undefined> => {
  log("Preparing volunteer ticket to be saved in Hasura");
  const custom_fields: CustomFields = ticket.custom_fields.reduce(
    (newObj, old) => {
      const key = dicio[old.id] && dicio[old.id];
      return {
        ...newObj,
        [key]: old.value
      };
    },
    {}
  );

  const hasuraTicket = {
    ...ticket,
    ...custom_fields,
    ticket_id: ticket.id,
    community_id: Number(process.env.COMMUNITY_ID)
  };

  try {
    const validatedTicket = await hasuraSchema.validate(hasuraTicket, {
      stripUnknown: true
    });
    // log({ hasuraTicket: JSON.stringify(hasuraTicket, null, 2) });
    const inserted = await saveSolidarityTicket(validatedTicket);
    if (!inserted) return undefined;
    return inserted;
  } catch (e) {
    log(`failed to save ticket: '${hasuraTicket.id}' in Hasura`.red, e);
    return undefined;
  }
};

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
    return await saveTicketInHasura(zendeskTicket);
  } catch (e) {
    log("failed to create ticket in zendesk: ".red, e);
    return undefined;
  }
};
