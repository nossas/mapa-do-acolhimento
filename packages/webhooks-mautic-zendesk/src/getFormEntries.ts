import axios from "axios";
import * as yup from "yup";
import { FormEntry } from "./types";
import { apmAgent } from "./dbg";

export const query = `query($widgets: [Int!]!, $email: String!) {
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

const getFormEntries = async (email: string): Promise<FormEntry[]> => {
  const { HASURA_API_URL, X_HASURA_ADMIN_SECRET, WIDGET_IDS } = process.env;
  let widget_ids;
  try {
    widget_ids = await yup
      .array()
      .of(yup.number())
      .min(6)
      .validate(WIDGET_IDS.split(",").map(Number));
  } catch (e) {
    apmAgent?.captureError(e);
    throw new Error("Invalid WIDGET_IDS env var");
  }

  try {
    const res = await axios.post<DataType>(
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

    return res.data.data.form_entries;
  } catch (e) {
    apmAgent?.captureError(e);
    throw new Error("Failed request to GraphQL API");
  }
};

export default getFormEntries;
