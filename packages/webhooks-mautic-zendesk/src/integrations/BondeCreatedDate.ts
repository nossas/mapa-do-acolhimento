import { FormEntry, BondeCreatedAt } from "../integration-functions/types";
import { filterByEmail } from "../utils";
import * as yup from "yup";
import log from "../dbg";

const verificaFormEntries = yup
  .array()
  .of(
    yup
      .object()
      .shape({
        fields: yup.string().required(),
        created_at: yup.string().required(),
        widget_id: yup.number().required()
      })
      .required()
  )
  .required();
/*
  In this class we fetch the date the volunteer first subscribed in the project and decide wether to use the data that came from the Mautic form response or the data that the volunteer first inputed in the form_entry
*/
class BondeCreatedDate {
  email: string;

  name: string | null;

  cep: string | null;

  apm?: any;

  dbg = log.child({ label: { process: "BondeCreatedDate" } });

  constructor(
    email: string,
    name: string | null,
    cep: string | null,
    apm?: any
  ) {
    this.email = email;
    this.name = name;
    this.cep = cep;
    this.apm = apm;
  }

  start = async (formEntries: FormEntry[]): Promise<BondeCreatedAt> => {
    try {
      const validatedFormEntries = await verificaFormEntries.validate(
        formEntries,
        {
          stripUnknown: true
        }
      );
      const filteredFormEntry = filterByEmail(validatedFormEntries, this.email);
      if (!filteredFormEntry) {
        throw new Error(`formEntries not found for email ${this.email}`);
      }
      const {
        name,
        lastname,
        cep,
        created_at: createdAt,
        registration_number
      } = filteredFormEntry;
      const aux = {
        createdAt,
        name:
          typeof this.name !== "string" || this.name.length === 0
            ? `${name} ${lastname}`
            : this.name,
        cep:
          typeof this.cep !== "string" || this.cep?.length === 0
            ? String(cep)
            : this.cep,
        registration_number
      };
      this.apm.setUserContext({
        username: aux.name
      });
      this.apm.setCustomContext({
        form_entry: {
          cep: aux.cep,
          registration_number: aux.registration_number
        }
      });
      return aux;
    } catch (e) {
      this.dbg.error(e);
      this.apm.captureError(e);
      this.apm.setUserContext({
        username: this.name || "sem nome"
      });
      this.apm.setCustomContext({
        form_entry: {
          cep: this.cep ?? undefined,
          registration_number: undefined
        }
      });
      return {
        createdAt: new Date().toISOString(),
        name: this.name || "sem nome",
        cep: this.cep ?? undefined,
        registration_number: undefined
      };
    }
  };
}

export default BondeCreatedDate;
