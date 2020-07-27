export type Contact = {
  name: string;
  email: string;
  user_id: number;
  data_de_inscricao_no_bond: string;
  f_condition: string;
  city: string;
  state: string;
  address: string;
  cep: string | null;
  phone: string | null;
  whatsapp: string | null;
  tipo_de_acolhimento: string | null;
};

export interface UpdateResponse {
  data: {
    contact;
  };
}
