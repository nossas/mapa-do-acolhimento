import * as yup from "yup";
import log, { apmAgent } from "../dbg";
import fetchTickets, { Ticket } from "./fetch-tickets";
import { User as ZendeskUser } from "./create-user";
import requestZendeskApi from "./request-zendesk-api";

export const Status: { [key: string]: string } = {
  aprovada: "aprovada",
  reprovada_estudo_de_caso: "reprovada_-_estudo_de_caso",
  reprovada_registro_inválido: "reprovada_-_registro_inválido",
  reprovada_diretrizes_do_mapa: "reprovada_-_diretrizes_do_mapa"
};

const TicketStatus = ["open", "new", "pending", "hold"];

const ticketSchema = yup
  .object()
  .shape({
    requester_id: yup.number().required(),
    organization_id: yup.number().required(),
    subject: yup.string().required(),
    description: yup.string().required(),
    custom_fields: yup.array().of(
      yup.object().shape({
        id: yup.number().required(),
        value: yup.mixed().nullable()
      })
    ),
    status_inscricao: yup.string().required(),
    created_at: yup.string().required()
  })
  .required();

type CustomField = {
  id: number;
  value: string;
};

type InputTicket = {
  requester_id: number | string;
  organization_id: number | string;
  description: string;
  status_inscricao: string;
  subject: string;
  custom_fields: CustomField[];
  created_at: string;
};

const createOrUpdateTicket = async (
  organization: "ADVOGADA" | "PSICOLOGA",
  user: ZendeskUser,
  created_at: string
): Promise<any> => {
  const results = await fetchTickets({ userId: user.user_id });
  if (!results) throw new Error(`Ticket not found for user ${user.user_id}`);

  const tickets = results.filter((t: Ticket) => {
    let subject = `[Psicóloga] ${user.name} - ${user.user_fields.registration_number}`;
    if (organization === "ADVOGADA") {
      subject = `[Advogada] ${user.name} - ${user.user_fields.registration_number}`;
    }
    return TicketStatus.includes(t.status) && t.subject === subject;
  });

  const {
    name,
    phone,
    user_fields: { registration_number, state, city, condition }
  } = user;

  const input: InputTicket = {
    requester_id: user.user_id,
    organization_id: user.organization_id,
    description: "-",
    status_inscricao: "aprovada",
    subject: `[${
      organization === "ADVOGADA" ? "Advogada" : "Psicóloga"
    }] ${name} - ${registration_number}`,
    custom_fields: [
      { id: 360021665652, value: Status[condition] },
      { id: 360016631592, value: name },
      { id: 360021812712, value: phone },
      { id: 360021879791, value: state },
      { id: 360021879811, value: city }
    ],
    created_at
  };
  
  try {
    const data = await ticketSchema.validate(input, { stripUnknown: true });
    log.info(`create or update ticket zendesk api: ${ JSON.stringify(data, null, 2) }`);

    if (tickets.length === 0) {
      // Create new Zendesk Ticket
      return await requestZendeskApi("POST", "/tickets", data);
    }
    // Update a Zendesk Ticket
    return await requestZendeskApi("PUT", `/tickets/${tickets[0].id}`, data);
  } catch (e) {
    apmAgent?.captureError(e);
    throw new Error(e);
  }
};

export default createOrUpdateTicket;
