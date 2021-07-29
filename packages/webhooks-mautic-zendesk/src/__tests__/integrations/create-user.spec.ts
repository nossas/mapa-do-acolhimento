import * as requestZendeskApi from "../../integration-functions/request-zendesk-api";
import * as rules from "../../integration-functions/rules";
import * as verifySubscribe from "../../integration-functions/verify-subscribe";

const spyZendesk = jest.spyOn(requestZendeskApi, "default");
const spyRules = jest.spyOn(rules, "businessRules");
const spySubscribe = jest.spyOn(verifySubscribe, "default");

import createUser from "../../integration-functions/create-user";

describe("users/create_or_update", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = {
      ...OLD_ENV,
      ZENDESK_ORGANIZATIONS: '{"PSICOLOGA": 1234, "ADVOGADA": 4321}',
      HASURA_API_URL: "http://localhost:8080/graphql"
    }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it("return parsed user", async (done: any) => {
    const email = "roge@example.org";
    const name = "Roger Wilco";
    const external_id = "1234";

    // Mock functions
    spySubscribe.mockResolvedValue({
      name,
      created_at: new Date().toISOString(),
      external_id
    });
    const data = { user:{ name, email } }; 
    spyRules.mockResolvedValue(data as any);
    spyZendesk.mockResolvedValue({
      data: {
        user: {
          email,
          id: 9873843,
          name,
          organization_id: 57542,
          role: "end-user"
        }
      }
    } as any);

    await expect(
      createUser({ results: { email, name }, organization: "ADVOGADA" })
    ).resolves.toEqual({
      email,
      user_id: 9873843,
      name,
      organization_id: 57542,
      role: "end-user"
    });
    expect(spyZendesk).toBeCalledWith("POST","users/create_or_update",data);
    return done();
  });
});
