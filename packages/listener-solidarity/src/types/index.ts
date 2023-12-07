export type ZendeskOrganizations = {
  therapist: number;
  individual: number;
  lawyer: number;
};

export type FormEntry = {
  fields: string;
  id: number;
  widget_id: number;
  cached_community_id: number;
  created_at: string;
};

export type FormEntriesResponse = {
  data: {
    form_entries: Array<FormEntry & { __typename: string }>;
  };
};
export interface Widget {
  id: number;
  metadata: {
    form_mapping: Array<{ uid: string; name: string }>;
  };
}

// Zendesk + Hasura fields to create user
export type User = {
  role: "end-user";
  organization_id: number;
  name: string;
  email: string;
  external_id: string;
  phone: string;
  user_id?: number;
  verified: boolean;
  user_fields: {
    cor: string | null;
    condition: "inscrita" | "desabilitada";
    state: string | null;
    city: string;
    cep: string;
    address: string;
    tipo_de_acolhimento:
      | "jurídico"
      | "psicológico"
      | "psicológico_e_jurídico"
      | null;
    whatsapp: string | null;
    registration_number: string | null;
    occupation_area: string | null;
    disponibilidade_de_atendimentos: string | null;
    data_de_inscricao_no_bonde: string;
    latitude: string | null;
    longitude: string | null;
  };
};

interface GoogleMapsAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GoogleMapsResults {
  address_components: GoogleMapsAddressComponent[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  formatted_address?: string;
}

export type GoogleMapsResponse = {
  results: GoogleMapsResults[];
  status: string;
  error_message?: string;
};

export type IndividualGeolocation = {
  cep: string;
  address: string;
  state: string | null;
  city: string;
  latitude: string | null;
  longitude: string | null;
};

// Fields that come from BONDE widget
export type Instance = {
  first_name: string;
  email: string;
  extras?: {
    accept_terms?: "sim" | "não";
  };
  tipo_de_acolhimento:
    | "jurídico"
    | "psicológico"
    | "psicológico_e_jurídico"
    | null;
  last_name?: string;
  state?: string;
  city?: string;
  cep?: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  registration_number?: string;
  occupation_area?: string;
  disponibilidade_de_atendimentos?: string;
  cor?: string;
};

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
  360032229831: "atrelado_ao_ticket",
};

export type Ticket = {
  comment: {
    body: string;
  };
  id: number;
  subject: string;
  external_id: string;
  requester_id: number;
  assignee_id?: number;
  custom_fields: Array<{ id: number; value: string }>;
  fields: Array<{ id: number; value: string }>;
  created_at: string;
  description: string;
  ticket_id: number;
  organization_id: number;
  raw_subject: string;
  status: string;
  submitter_id: number;
  tags: Array<string>;
  updated_at: string;
  community_id: number;
  data_inscricao_bonde: string;
  status_acolhimento: string;
  nome_msr: string;
  cidade: string | null;
  estado: string | null;
  link_match: string | null;
  nome_voluntaria: string | null;
  status_inscricao: string | null;
  telefone: string | null;
  atrelado_ao_ticket: string | null;
  match_syncronized: boolean;
};

export type PartialTicket = Pick<
  Ticket,
  | "external_id"
  | "comment"
  | "requester_id"
  | "custom_fields"
  | "subject"
  | "status"
  | "tags"
>;

export type Fields = Array<{
  uid: string;
  kind: string;
  label: string;
  placeholder: string;
  required: "true" | "false";
  value: string;
}>;

export type ZendeskUserCreationResponse = {
  id: number;
  status: string;
  external_id: string;
  error?: string | undefined;
};

export type CustomFields = {
  status_acolhimento?: string;
  data_inscricao_bonde?: string;
  nome_msr?: string;
  nome_voluntaria?: null;
  link_match?: null;
  data_encaminhamento?: null;
  status_inscricao?: null;
  telefone?: null;
  estado?: null;
  cidade?: null;
  atrelado_ao_ticket?: string | null;
};

export type SupportRequestPayload = {
  msrId: number;
  zendeskTicketId: number;
  supportType: string;
  // these null values are always `null` here, bc of the MSR bonde form that doesnt include these questions
  supportExpertise: null;
  priority: null;
  hasDisability: null;
  requiresLibras: null;
  //
  acceptsOnlineSupport: boolean;
  lat: number | null;
  lng: number | null;
  city: string;
  state: string;
};