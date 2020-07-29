export type Contact = {
  firstname: string;
  email: string;
  user_id: number;
  data_de_inscricao_no_bond: string;
  f_condition: string;
  city: string;
  state1: string;
  address: string;
  phone: string | null;
  whatsapp: string | null;
  tipo_de_acolhimento: string | null;
};

export interface ContactSearchRes {
  total: number;
  contacts: Record<string, FullContact>;
}

export interface Field {
  id: string;
  label: string;
  alias: string;
  type: string;
  group: string;
  object: string;
  is_fixed: string;
  value: number | string | null;
}

export interface FullContact {
  isPublished: boolean;
  dateAdded: string;
  dateModified: string | null;
  createdBy: number;
  createdByUser: string;
  modifiedBy: number | null;
  modifiedByUser: string | null;
  id: number;
  points: number;
  color: string | null;
  fields: {
    core: {
      points: Field;
      last_active: Field;
      firstname: Field;
      lastname: Field;
      position: Field;
      email: Field;
      phone: Field;
      city: Field;
      timezone: Field;
      country: Field;
      preferred_locale: Field;
      attribution_date: Field;
      attribution: Field;
      website: Field;
      data_de_inscricao_no_bond: Field;
      f_condition: Field;
      whatsapp: Field;
      tipo_de_acolhimento: Field;
      user_id: Field;
      cep: Field;
      address: Field;
      state1: Field;
    };
    social: {
      facebook: Field;
      foursquare: Field;
      googleplus: Field;
      instagram: Field;
      linkedin: Field;
      skype: Field;
      twitter: Field;
    };
    personal: Array<unknown>;
    professional: Array<unknown>;
    all: {
      id: number;
      points: string | null;
      last_active: string | null;
      firstname: string | null;
      lastname: string | null;
      position: string | null;
      email: string;
      phone: string | null;
      city: string | null;
      timezone: string | null;
      country: string | null;
      preferred_locale: string | null;
      attribution_date: string | null;
      attribution: string | null;
      website: string | null;
      data_de_inscricao_no_bond: string | null;
      f_condition: string | null;
      whatsapp: string | null;
      tipo_de_acolhimento: string | null;
      user_id: string | null;
      cep: string | null;
      address: string | null;
      state1: string | null;
      facebook: string | null;
      foursquare: string | null;
      googleplus: string | null;
      instagram: string | null;
      linkedin: string | null;
      skype: string | null;
      twitter: string | null;
    };
  };
  lastActive: string | null;
  owner: {
    createdByUser: string;
    modifiedByUser: string | null;
    id: number;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
  };
  ipAddresses: Array<unknown>;
  tags: Array<{ id: number; tag: string }>;
  utmtags: Array<unknown>;
  stage: string | null;
  dateIdentified: string | null;
  preferredProfileImage: string | null;
  doNotContact: Array<unknown>;
  frequencyRules: Array<unknown>;
}
