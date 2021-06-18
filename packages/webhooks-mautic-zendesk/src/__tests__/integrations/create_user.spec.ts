import * as requestZendeskApi from "../../integration-functions/request-zendesk-api";
import * as rules from "../../integration-functions/rules";
import * as verifySubscribe from "../../integration-functions/verify-subscribe";

const spyZendesk = jest.spyOn(requestZendeskApi, "default");
const spyRules = jest.spyOn(rules, "businessRules");
const spySubscribe = jest.spyOn(verifySubscribe, "default");

import createUser from "../../integration-functions/create-user";

describe("users/create_or_update", () => {
  it("return parsed user", async (done: any) => {
    const email = "roge@example.org";
    const name = "Roger Wilco";
    // Mock functions
    spySubscribe.mockResolvedValue({
      name,
      created_at: new Date().toISOString()
    });
    spyRules.mockResolvedValue({ name, email } as any)
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

    return done();
  });
});
