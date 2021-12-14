import { mauticZendeskHandle } from "../resolvers/mauticZendesk";
import filterService from "../filterService";
import * as createUser from "../integration-functions/create-user";
import { mockMauticFormRequest } from "../mocks";

jest.mock("mda-components");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mdaComponents = require("mda-components");
const userToContactSpy = jest.spyOn(mdaComponents, "userToContact");

const createUserSpy = jest.spyOn(createUser, "default");
const readMauticRequestSpy = jest.spyOn(filterService, "default");

describe("Express resolvers functions", () => {
  describe("/mautic-zendesk", () => {
    it("call mda-components/userToContact when resolve createZendeskUser", async done => {
      const resultUser: createUser.User = {
        role: "end-user",
        organization_id: 123,
        name: "Name Test",
        email: "email@test.org",
        external_id: "123",
        phone: "011999999999",
        verified: true,
        user_fields: {
          registration_number: "1234567",
          condition: "open",
          state: "RJ",
          city: "Rio de Janeiro"
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: 123
      };
      createUserSpy.mockResolvedValue(resultUser);
      readMauticRequestSpy.mockResolvedValue(mockMauticFormRequest.body);

      await mauticZendeskHandle(
        {} as any,
        { status: () => ({ json: jest.fn() }) } as any
      );

      expect(userToContactSpy).toHaveBeenCalledTimes(1);

      return done();
    });
  });
});
