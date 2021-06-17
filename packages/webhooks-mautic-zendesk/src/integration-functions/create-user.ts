import requestZendeskApi from "./request-zendesk-api";
import log from "../dbg";
import { businessRules } from "./rules";
import verifySubscribe from "./verify-subscribe";
import { Results } from "./types";
import { checkNames, checkCep } from "../utils";

export type CreateUserInput = {
  results: Results;
  organization: "ADVOGADA" | "PSICOLOGA";
};

export type User = {
  role: "end-user";
  organization_id: number;
  name: string;
  email: string;
  external_id: string;
  phone: string;
  user_id: number;
  verified: boolean;
  user_fields?: Record<string, unknown>;
};

export default async (input: CreateUserInput): Promise<User> => {
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
  log.info("input zendesk api", { data });

  const response = await requestZendeskApi<User>(
    "POST",
    "users/create_or_update",
    data
  );

  log.info("response data", { response });
  return response.data;
};
