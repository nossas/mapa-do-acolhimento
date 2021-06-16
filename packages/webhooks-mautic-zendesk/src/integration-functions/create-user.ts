import requestZendeskApi from "./request-zendesk-api";
import { useDebug } from "./utils";
import { businessRules, fetchBondeData } from "./rules";
import { Results } from "./types";

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
  const dbg = useDebug("users/create_or_update");

  const { results } = input;
  const { createdAt } = await fetchBondeData(results);

  const organizations = JSON.parse(process.env.ZENDESK_ORGANIZATIONS);
  const data = await businessRules(
    results,
    createdAt,
    organizations[input.organization]
  );
  dbg("input zendesk api", { data });

  const response = await requestZendeskApi<User>(
    "POST",
    "users/create_or_update",
    data
  );

  dbg("response data", { response });
  return response.data;
};
