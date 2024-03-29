export const dicio: {
  360014379412: "status_acolhimento";
  360016631592: "nome_voluntaria";
  360016631632: "link_match";
  360016681971: "nome_msr";
  360017056851: "data_inscricao_bonde";
  360017432652: "data_encaminhamento";
  360021665652: "status_inscricao";
  360021812712: "telefone";
  360021879791: "estado";
  360021879811: "cidade";
  360032229831: "atrelado_ao_ticket";
} = {
  360014379412: "status_acolhimento",
  360016631592: "nome_voluntaria",
  360016631632: "link_match",
  360016681971: "nome_msr",
  360017056851: "data_inscricao_bonde",
  360017432652: "data_encaminhamento",
  360021665652: "status_inscricao",
  360021812712: "telefone",
  360021879791: "estado",
  360021879811: "cidade",
  360032229831: "atrelado_ao_ticket"
};

type status_acolhimento_values =
  | "atendimento__concluído"
  | "atendimento__iniciado"
  | "atendimento_triagem_1"
  | "atendimento_triagem_2"
  | "atendimento_acompanhamento_1"
  | "atendimento_acompanhamento_2"
  | "atendimento__interrompido"
  | "encaminhamento__aguardando_confirmação"
  | "encaminhamento__confirmou_disponibilidade"
  | "encaminhamento__negado"
  | "encaminhamento__realizado"
  | "encaminhamento__realizado_para_serviço_público"
  | "solicitação_recebida";

type CustomFields =
  | {
      id: keyof typeof dicio;
      value: string | null;
    }
  | { id: 360014379412; value: status_acolhimento_values };

export interface Ticket {
  id: number;
  ticket_id: number;
  assignee_id: number;
  created_at: string;
  custom_fields: CustomFields[];
  description: string;
  group_id: number;
  organization_id: number;
  raw_subject: string;
  requester_id: number;
  status: string;
  subject: string;
  submitter_id: number;
  tags: string[];
  updated_at: string;
  status_acolhimento: status_acolhimento_values;
  nome_voluntaria: string | null;
  link_match: string | null;
  nome_msr: string | null;
  data_inscricao_bonde: string | null;
  data_encaminhamento: string | null;
  status_inscricao: string | null;
  telefone: string | null;
  estado: string | null;
  cidade: string | null;
  community_id: number;
  atrelado_ao_ticket: string | number | null; // when saving in hasura, it needs to be number or null
  external_id: string | number | null; // when saving in hasura, it needs to be number or null
}

export const handleCustomFields = (ticket: Ticket) => {
  const custom_fields: CustomFields = ticket.custom_fields.reduce(
    (newObj, old) => {
      const key = dicio[old.id] && dicio[old.id];
      return {
        ...newObj,
        [key]: old.value
      };
    },
    {} as CustomFields
  );

  const finalTicket = {
    ...ticket,
    ...custom_fields,
    ticket_id: ticket.id,
    community_id: Number(process.env.COMMUNITY_ID),
    atrelado_ao_ticket:
      custom_fields["atrelado_ao_ticket"] !== "X" &&
      custom_fields["atrelado_ao_ticket"] !== null
        ? Number(custom_fields["atrelado_ao_ticket"])
        : null,
    external_id:
      ticket.external_id !== "X" && ticket.external_id !== null
        ? Number(ticket.external_id)
        : null
  } as Ticket;

  return finalTicket;
};

export interface TicketResponse {
  tickets: Ticket[];
  next_page: string;
  end_time: number;
  count: number;
}
