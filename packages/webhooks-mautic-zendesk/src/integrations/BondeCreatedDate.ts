import debug from "debug";
import { FormEntry } from "../types";
import { filterByEmail } from "../utils";
import * as yup from "yup";

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

  dbg = debug("webhooks-mautic-zendesk-BondeCreatedDate");

  constructor(email: string, name: string | null, cep: string | null) {
    this.email = email;
    this.name = name;
    this.cep = cep;
  }

  start = async (formEntries: FormEntry[]) => {
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
      const { name, lastname, cep, created_at: createdAt } = filteredFormEntry;
      const aux = {
        createdAt,
        name:
          typeof this.name !== "string" || this.name.length === 0
            ? `${name} ${lastname}`
            : this.name,
        cep:
          typeof this.cep !== "string" || this.cep?.length === 0
            ? String(cep)
            : this.cep
      };
      return aux;
    } catch (e) {
      this.dbg(e);
      return {
        createdAt: new Date().toISOString(),
        name: this.name || "sem nome",
        cep: this.cep ?? undefined
      };
    }
  };
}

export default BondeCreatedDate;
