import axios from "axios";
import * as yup from "yup";
import { FormEntry, FormEntryFields } from "./types";
import { apmAgent } from "./dbg";
import { filterByEmail } from "./utils";

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

const validationField = yup.object().shape({
  uid: yup.string().required(),
  kind: yup.string().required(),
  label: yup.string().required(),
  placeholder: yup.string().required(),
  required: yup.string().required(),
  value: yup.string().required()
});

export const getFormEntryByEmail = async (
  email: string
): Promise<FormEntryFields> => {
  let formEntries;

  try {
    formEntries = await yup
      .array()
      .of(
        yup
          .object()
          .shape({
            fields: yup
              .array()
              .of(validationField)
              .required(),
            created_at: yup.string().required(),
            widget_id: yup.number().required()
          })
          .required()
      )
      .notRequired()
      .validate(await getFormEntries(email));
  } catch (e) {
    apmAgent?.captureError(e);
    throw new Error(`form_entry is invalid`);
  }

  const formEntry = filterByEmail(formEntries || [], email);

  if (!formEntry) throw new Error(`formEntries not found for email ${email}`);

  return formEntry;
};

export default getFormEntries;
