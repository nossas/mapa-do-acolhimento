import * as yup from "yup";
import { Response } from "express";
import { getGeolocation } from "bonde-core-tools";
import Base from "./Base";
import { CONDITION } from "../types";
import {
  verificaEstudoDeCaso,
  verifyLocation,
  verificaDiretrizesAtendimento,
  removeFalsyValues
} from "../utils";

interface InputFromMautic {
  createdAt: string;
  name: string;
  cep?: string;
  registration_number: string | null;
  phone: string | null;
  whatsapp: string | null;
}

class AdvogadaCreateUser extends Base {
  organization = "ADVOGADA";
  private apm: any;

  constructor(res: Response, apm) {
    super("AdvogadaCreateUser", "users/create_or_update", res);
    this.apm = apm;
  }

  start = async (
    data,
    {
      createdAt,
      name,
      cep,
      registration_number,
      phone,
      whatsapp
    }: InputFromMautic
  ) => {
    let newData = {
      ...data,
      cep
    };
    const condition: [CONDITION] = [CONDITION.UNSET];
    newData = await verificaDiretrizesAtendimento(condition, newData);
    newData = await verificaEstudoDeCaso(condition, newData);
    const userWithGeolocation = await verifyLocation(newData, getGeolocation);

    try {
      const zendeskValidation = yup
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
            phone: mauticPhone || phone,
            organization_id: this.organizations[this.organization],
            user_fields: {
              ...removeFalsyValues(userFields),
              registration_number:
                userFields.registration_number || registration_number,
              whatsapp: userFields.whatsapp || whatsapp,
              cep,
              address,
              state,
              city,
              latitude,
              longitude,
              data_de_inscricao_no_bonde: createdAt,
              ultima_atualizacao_de_dados: new Date().toString(),
              condition: condition[0] === "unset" ? "aprovada" : condition[0],
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

      const zendeskData = await zendeskValidation.validate(
        userWithGeolocation,
        {
          stripUnknown: true
        }
      );

      this.apm.setCustomContext({
        zendesk: {
          registration_number: zendeskData.user_fields?.registration_number,
          cep: zendeskData.user_fields?.cep,
          username: zendeskData.name,
          email: zendeskData.email,
          state: zendeskData.user_fields?.state,
          city: zendeskData.user_fields?.city
        }
      });

      const dataToBeSent = {
        user: {
          ...zendeskData
        }
      };
      return {
        response: await this.send(dataToBeSent)
      };
    } catch (e) {
      this.apm.captureError(e);
      return this.dbg.error("validation failed", e);
    }
  };
}

export default AdvogadaCreateUser;
