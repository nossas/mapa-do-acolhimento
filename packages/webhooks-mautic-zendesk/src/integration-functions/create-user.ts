import * as yup from "yup";
import requestZendeskApi from "./request-zendesk-api";
import log from "../dbg";
import { businessRules } from "./rules";
import verifySubscribe from "./verify-subscribe";
import { Results } from "../types";
import { checkNames, checkCep } from "../utils";

export type CreateUserInput = {
  results: Results;
  organization: "ADVOGADA" | "PSICÓLOGA";
};

interface Base {
  role: "end-user" | string;
  organization_id: number;
  name: string;
  email: string;
  external_id: any;
  phone: string;
  verified: boolean;
  user_fields: {
    registration_number: string;
    condition: string;
    state: string;
    city: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface User extends Base {
  user_id: number;
}

interface EndUser extends Base {
  id: number;
}

const schema = yup.object().shape({
  organization_id: yup.number().required(),
  role: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required(),
  external_id: yup.string().nullable(),
  phone: yup.string(),
  verified: yup.boolean(),
  user_fields: yup.object(),
  user_id: yup.number().required()
});

export default async (input: CreateUserInput): Promise<User | undefined> => {
  const { results } = input;

  const subscribe = await verifySubscribe({
    ...results,
    name: checkNames(results),
    cep: checkCep(results.cep)
  });
  log.info(`input zendesk api: ${JSON.stringify(results, null, 2)}`);

  const organizations = JSON.parse(process.env.ZENDESK_ORGANIZATIONS);
  const data = await businessRules(
    results,
    subscribe,
    organizations[input.organization]
  );
  log.info(`input zendesk api ${JSON.stringify(data, null, 2)}`);

  const response = await requestZendeskApi<{ user: EndUser }>(
    "POST",
    "users/create_or_update",
    data
  );

  log.info("response data", { response });
  const user = schema
    .transform(obj => {
      const user_id = obj.id;
      delete obj.id;
      return { ...obj, user_id };
    })
    .validate(response.data.user);

  if (!user) throw new Error("User not created.");

  return user;
};
