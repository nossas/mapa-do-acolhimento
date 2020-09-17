import axios from "axios";
import * as yup from "yup";
import debug from "debug";
import { FormEntry } from "./types";

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

const dbg = debug("webhooks-mautic-zendesk-getFormEntries");

const getFormEntries = async () => {
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
    return dbg(e);
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
    return dbg(e);
  }
};

export default getFormEntries;
