import { Response } from "express";
import * as yup from "yup";
import Base from "./Base";

class AdvogadaCreateTicket extends Base {
  private apm: any;

  constructor(res: Response, apm: any) {
    super("AdvogadaCreateTicket", "tickets", res);
    this.apm = apm;
  }

  start = async <T>(data) => {
    let newData = data;
    const validateTicket = yup
      .object()
      .shape({
        requester_id: yup.number().required(),
        organization_id: yup.number().required(),
        subject: yup.string().required(),
        description: yup.string().required(),
        custom_fields: yup.array().of(
          yup.object().shape({
            id: yup.number().required(),
            value: yup.mixed().nullable()
          })
        ),
        status_inscricao: yup.string().required(),
        created_at: yup.string().required()
      })
      .required();

    try {
      newData = await validateTicket.validate(newData, {
        stripUnknown: true
      });
    } catch (e) {
      this.apm.captureError(e);
      return this.dbg.error("Falhou ao validar ticket");
    }
    try {
      return this.send<T>({
        ticket: {
          ...newData
        }
      });
    } catch (e) {
      this.apm.captureError(e);
      return this.dbg.error(e);
    }
  };
}

export default AdvogadaCreateTicket;
