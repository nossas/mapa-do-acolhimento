import { mauticZendeskHandle } from "../resolvers";
import * as filterService from "../filterService";
import * as createUser from "../integration-functions/create-user";
import { mockMauticFormRequest } from "../mocks";

jest.mock("components", () => ({
  ...jest.requireActual("components")
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const components = require("components");
const userToContactSpy = jest.spyOn(components, "userToContact");

const createUserSpy = jest.spyOn(createUser, "default");
const readMauticRequestSpy = jest.spyOn(filterService, "default");

describe("Express resolvers functions", () => {
  describe("/mautic-zendesk", () => {
    it("call components/userToContact when resolve createZendeskUser", async done => {
      const resultUser: createUser.User = {
        role: "end-user",
        organization_id: 123,
        name: "Name Test",
        email: "email@test.org",
        external_id: "123",
        phone: "011999999999",
        verified: true,
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
