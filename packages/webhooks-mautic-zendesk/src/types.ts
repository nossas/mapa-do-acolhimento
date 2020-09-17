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
