export interface Results extends Record<string, unknown> {
  email: string;
  cep?: string;
  primeiro_nome?: Array<string> | string;
  sobrenome_completo?: Array<string> | string;
}

export enum CONDITION {
  UNSET = "unset",
  REPROVADA_REGISTRO_INVÁLIDO = "reprovada_registro_inválido",
  REPROVADA_DIRETRIZES_DO_MAPA = "reprovada_diretrizes_do_mapa",
  REPROVADA_ESTUDO_DE_CASO = "reprovada_estudo_de_caso"
}

export interface FormEntry {
  fields: string;
  created_at: string;
  widget_id: number;
}

export interface FormEntryFields {
  name?: string;
  lastname?: string;
  cep?: string;
  created_at: string;
  widget_id: number;
  registration_number?: string;
}

export interface Subscribe {
  name: string;
  lastname?: string;
  cep?: string;
  registration_number?: string;
  created_at: string;
}
