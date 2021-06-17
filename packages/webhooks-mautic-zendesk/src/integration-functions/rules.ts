import * as yup from "yup";
import { getGeolocation } from "bonde-core-tools";
import log from "../dbg";
import { BondeCreatedAt, CONDITION, FormEntry, Results } from "./types";
import {
  checkNames,
  checkCep,
  verificaDiretrizesAtendimento,
  verificaEstudoDeCaso,
  verifyLocation,
  removeFalsyValues
} from "../utils";
import BondeCreatedDate from "../integrations/BondeCreatedDate";
import getFormEntries from "../getFormEntries";

const dbg = log.child({ label: { process: "rules" } });

export type ValidationInput = {
  organizationId: number;
  createdAt: string;
  condition: unknown;
  cep?: string;
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
        email,
        phone,
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
        phone,
        organization_id: input.organizationId,
        user_fields: {
          ...removeFalsyValues(userFields),
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
      organization_id: yup.number().nullable(),
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
  createdAt: BondeCreatedAt,
  organizationId: number
) => {
  let data = { ...results, cep: createdAt.cep };
  const condition: [CONDITION] = [CONDITION.UNSET];
  dbg.info(`data to verify: ${JSON.stringify(data, null, 2)}`);

  data = await verificaDiretrizesAtendimento(condition, data);
  data = await verificaEstudoDeCaso(condition, data);

  const userWithGeolocation = await verifyLocation(data, getGeolocation);
  const zendeskData = await zendeskValidation({
    condition: condition[0],
    cep: data.cep,
    createdAt: createdAt.createdAt,
    organizationId
  }).validate(userWithGeolocation, { stripUnknown: true });

  return zendeskData;
};

export type FetchBondeDataResult = {
  formEntries: FormEntry[];
  createdAt: BondeCreatedAt;
};

export const fetchBondeData = async (
  results: Results
): Promise<FetchBondeDataResult> => {
  dbg.info(`getFormEntries: ${results.email}`);

  const formEntries = await getFormEntries(results.email);

  if (!formEntries) throw new Error("form entries not found");

  const instance = new BondeCreatedDate(
    results.email,
    checkNames(results),
    checkCep(results.cep)
  );
  const createdAt = await instance.start(formEntries);

  dbg.info(`finish fetchBondeData: ${createdAt.createdAt}`);
  return { formEntries, createdAt };
};
