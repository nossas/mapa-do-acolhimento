import axios from "axios";
import * as yup from "yup";
import { FormEntry } from "./types";
import log from "./dbg";

const query = `query($widgets: [Int!]!, $email: String!) {
  form_entries(where: {
    widget_id: {_in: $widgets}
    fields: { _like: $email }
  }) 
  {
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

const dbg = log.child({ labels: { process: "getFormEntries" } });

const getFormEntries = async (email: string, apm?: any) => {
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
    apm.captureError(e);
    return dbg.error(e);
  }
  try {
    const data = await axios.post<DataType>(
      HASURA_API_URL!,
      {
        query,
        variables: {
          widgets: widget_ids,
          email: `%${email}%`
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
    apm && apm.captureError(e);
    return dbg.error(e);
  }
};

export default getFormEntries;
