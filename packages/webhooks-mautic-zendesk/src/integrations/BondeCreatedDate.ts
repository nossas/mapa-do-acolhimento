import axios from "axios";
import * as yup from "yup";
import debug from "debug";
import { FormEntry } from "../types";
import { filterByEmail } from "../utils";

const query = `query($widgets: [Int!]!) {
  form_entries(where: {widget_id: {_in: $widgets}}) {
    fields
    created_at
    widget_id
  }
}`;

interface DataType {
  data: {
    form_entries: FormEntry[];
  };
}

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
      const data = await axios.post<DataType>(
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
      return data.data.data.form_entries;
    } catch (e) {
      return this.dbg(e);
    }
  };

  start = async () => {
    const formEntries = await this.getFormEntries();
    if (!formEntries) {
      return this.dbg("getFormEntries error");
    }

    const filteredFormEntry = filterByEmail(formEntries, this.email);
    if (!filteredFormEntry) {
      return this.dbg("filteredFormEntries error");
    }

    try {
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
