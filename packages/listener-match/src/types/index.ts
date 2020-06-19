export type IndividualTicket = {
  subject: string;
  ticket_id: number;
  atrelado_ao_ticket: number | null;
  requester_id: number;
  nome_msr: string;
  status_acolhimento: string;
};
export type SubscriptionResponse = {
  data: {
    solidarity_tickets: Array<IndividualTicket & { __typename: string }>;
  };
};

export type Volunteer = {
  user_id: number;
  disponibilidade_de_atendimentos: string;
  atendimentos_em_andamento_calculado_: number;
  email: string;
  name: string;
  organization_id: number;
  latitude: string;
  longitude: string;
  whatsapp: string;
  phone: string;
  registration_number: string;
  id: number;
};

export type PendingTickets = {
  volunteers_user_id: number;
  volunteers_ticket_id: number;
  id: number;
};

export type Individual = {
  latitude: string;
  longitude: string;
  state: string;
};

export type Ticket = {
  requester_id: number;
  submitter_id: number;
  assignee_id: number;
  status: string;
  subject: string;
  comment: {
    body: string;
    author_id: number;
    public: boolean;
  };
  fields: Array<{ id: number; value: any }>;
  external_id: number;
};

export type UpdateTicket = {
  id: number;
  requester_id?: number;
  submitter_id?: number;
  assignee_id?: number;
  status?: string;
  subject?: string;
  comment: {
    body: string;
    author_id: number;
    public: boolean;
  };
  fields?: Array<{ id: number; value: any }>;
  external_id: number;
};
