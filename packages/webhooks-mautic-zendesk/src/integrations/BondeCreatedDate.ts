import axios from "axios";
import * as yup from "yup";
import debug from "debug";

const query = `query($widgets: [Int!]!) {
  form_entries(where: {widget_id: {_in: $widgets}}) {
    fields
    created_at
    widget_id
  }
}`;

interface FormEntry {
  fields: string;
  created_at: string;
  widget_id: number;
}

// interface DataType {
//   data: {
//     form_entries: FormEntry[];
//   };
// }

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

  getFormEntries = async () => {
    const { HASURA_API_URL, X_HASURA_ADMIN_SECRET, WIDGET_IDS } = process.env;
    let widget_ids;
    try {
      widget_ids = WIDGET_IDS.split(",").map(Number);
      if (
        !yup
          .array()
          .of(yup.string())
          .min(6)
          .isValid(widget_ids)
      ) {
        throw new Error("Invalid WIDGET_IDS env var");
      }
    } catch (e) {
      return this.dbg(e);
    }
    try {
      const data = await axios.post(
        HASURA_API_URL!,
        {
          query,
          variables: {
            widgets: widget_ids
          }
        },
        {
          headers: {
            "x-hasura-admin-secret": X_HASURA_ADMIN_SECRET
          }
        }
      );
      return data && data.data && data.data.form_entries;
    } catch (e) {
      return this.dbg(e);
    }
  };

  filterByEmail = (formEntries: FormEntry[]) =>
    formEntries.filter(i => {
      try {
        const parsedFields = JSON.parse(i.fields);
        return parsedFields[2].value === this.email;
      } catch (e) {
        return false;
      }
    });

  start = async () => {
    const formEntries = await this.getFormEntries();
    if (!formEntries) {
      return this.dbg("getFormEntries error");
    }
    const filteredFormEntries = await this.filterByEmail(formEntries);
    if (!filteredFormEntries) {
      return this.dbg("filteredFormEntries error");
    }

    try {
      const dicio = {
        "field-1533735738039-59": "name",
        "field-1464961964463-91": "name",
        "field-1497368661426-82": "name",
        "field-1530889190780-12": "name",
        "field-1530889762581-19": "name",
        "field-1533733461113-5": "name",
        "field-1464961980231-76": "lastname",
        "field-1533735745400-14": "lastname",
        "field-1497368672826-91": "lastname",
        "field-1530889199847-58": "lastname",
        "field-1530889778477-47": "lastname",
        "field-1533733485653-99": "lastname",
        "field-1533735803691-45": "cep",
        "field-1464962010023-34": "cep",
        "field-1497369214092-68": "cep",
        "field-1530889290557-13": "cep",
        "field-1530889888615-19": "cep",
        "field-1533733650118-7": "cep"
      };
      const fields = JSON.parse(filteredFormEntries[0].fields);
      const userDetails = fields.reduce((newObj, old) => {
        const key = dicio[old.uid] && dicio[old.uid];
        return {
          ...newObj,
          [key]: old.value
        };
      }, {});
      const { name, lastname, cep } = userDetails;
      const aux = {
        createdAt: filteredFormEntries[0].created_at,
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
    } catch {
      this.dbg(`formEntries not found for email ${this.email}`);
      return {
        createdAt: new Date().toString(),
        name: this.name || "sem nome",
        cep: this.cep ?? undefined
      };
    }
  };
}

export default BondeCreatedDate;
