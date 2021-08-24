import * as getFormEntries from "../../getFormEntries";
import verifySubscribe from "../../integration-functions/verify-subscribe";

const spy = jest.spyOn(getFormEntries, "getFormEntries");

describe("verify subscribe", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("throw error when getFormEntries return is empty", async done => {
    spy.mockResolvedValue([]);
    const email = "email@test.org";

    await expect(verifySubscribe({ email })).rejects.toThrow(
      `formEntries not found for email ${email}`
    );

    return done();
  });
});
