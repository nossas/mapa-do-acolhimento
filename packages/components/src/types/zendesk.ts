export type StatusMulher =
  | "inscrita"
  | "desabilitada"
  | "anti-etica"
  | "aprovada"
  | "reprovada_registro_inválido"
  | "reprovada_diretrizes_do_mapa"
  | "reprovada_estudo_de_caso"
  | "descadastrada"
  | "dados_incompletos_email"
  | "dados_incompletos_telefone"
  | "dados_incompletos_endereço"
  | "indisponível_-sem_resposta"
  | "indisponível_agenda"
  | "indisponível_maternidade"
  | "indisponível_férias"
  | "disponivel";

export type User = {
  role: "end-user";
  organization_id: number;
  name: string;
  email: string;
  external_id: string;
  phone: string;
  user_id: number;
  verified: boolean;
  user_fields: {
    cor: string | null;
    condition: StatusMulher;
    state: string;
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
