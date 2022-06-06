import * as yup from "yup";
import { getGeolocation } from "mda-components";
import log from "../dbg";
import { CONDITION, Results, Subscribe } from "./types";
import {
  verificaDiretrizesAtendimento,
  verificaEstudoDeCaso,
  verifyLocation,
  removeFalsyValues
} from "../utils";

const dbg = log.child({ label: { process: "rules" } });

export type ValidationInput = {
  organizationId: number;
  createdAt: string;
  condition: unknown;
  cep?: string;
  phone?: string;
  whatsapp?: string;
  external_id: string;
};

const zendeskValidation = (input: ValidationInput) =>
  yup
    .object()
    .from("primeiro_nome", "firstname")
    .from("sobrenome_completo", "lastname")
    .from("whatsapp_com_ddd", "whatsapp")
    .from("telefone_de_atendimento_c", "phone")
    .from("sendo_voluntaria_do_mapa", "disponibilidade_de_atendimentos")
    .from("quantas_vezes_voce_ja_rec", "encaminhamentos")
    .from("atualmente_quantas_mulher", "atendimentos_em_andamento")
    .from("quanto_atendimentos_pelo", "atendimentos_concluidos")
    .from("insira_seu_numero_de_regi", "registration_number")
    .from("qual_sua_area_de_atuacao", "occupation_area")
    .transform(obj => {
      const {
        name,
        email,
        phone: mauticPhone,
        latitude,
        longitude,
        address,
        state,
        city,
        ...userFields
      } = obj;
      let { disponibilidade_de_atendimentos } = obj;
      if (disponibilidade_de_atendimentos === "6") {
        disponibilidade_de_atendimentos = "5_ou_mais";
      }
      return {
        name,
        email,
        phone: mauticPhone || input.phone,
        organization_id: input.organizationId,
        external_id : input.external_id,
        user_fields: {
          ...removeFalsyValues(userFields),
          whatsapp: userFields.whatsapp || input.whatsapp,
          cep: input.cep,
          address,
          state,
          city,
          latitude,
          longitude,
          data_de_inscricao_no_bonde: input.createdAt,
          ultima_atualizacao_de_dados: new Date().toString(),
          condition: input.condition === "unset" ? "aprovada" : input.condition,
          disponibilidade_de_atendimentos
        }
      };
    })
    .shape({
      name: yup.string().nullable(),
      email: yup
        .string()
        .email()
        .required(),
      phone: yup.string().nullable(),
      organization_id: yup.number().required(),
      external_id: yup.string().nullable(),
      user_fields: yup
        .object()
        .shape({
          whatsapp: yup.string().nullable(),
          cep: yup.string().nullable(),
          cor: yup.string().nullable(),
          disponibilidade_de_atendimentos: yup.string().nullable(),
          encaminhamentos: yup.string().nullable(),
          atendimentos_em_andamento: yup.string().nullable(),
          atendimentos_concluidos: yup.string().nullable(),
          registration_number: yup.string().nullable(),
          occupation_area: yup.string().nullable(),
          ultima_atualizacao_de_dados: yup.date().nullable(),
          latitude: yup.string().nullable(),
          longitude: yup.string().nullable(),
          address: yup.string().nullable(),
          city: yup.string().nullable(),
          state: yup
            .string()
            .lowercase()
            .nullable(),
          condition: yup.string().nullable()
        })
        .nullable()
    })
    .required();

export const businessRules = async (
  results: Results,
  subscribe: Subscribe,
  organizationId: number
): Promise<{ user: any }> => {
  let data = { ...results, ...subscribe };
  const condition: [CONDITION] = [CONDITION.UNSET];
  dbg.info(`businessRules: ${JSON.stringify(data, null, 2)}`);

  data = await verificaDiretrizesAtendimento(condition, data);

  data = await verificaEstudoDeCaso(condition, data);

  const userWithGeolocation = await verifyLocation(data, getGeolocation);

  const zendeskData = await zendeskValidation({
    condition: condition[0],
    cep: data.cep,
    createdAt: subscribe.created_at,
    organizationId,
    phone: data.phone,
    whatsapp: data.whatsapp,
    external_id: data.external_id
  }).validate(userWithGeolocation, { stripUnknown: true });

  return { user: zendeskData };
};
