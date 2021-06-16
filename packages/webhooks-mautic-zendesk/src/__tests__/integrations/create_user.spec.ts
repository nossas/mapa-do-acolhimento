import createUser from "../../integration-functions/create-user";

describe("users/create_or_update", () => {
  it("return fake data", async (done: any) => {
    const user = await createUser({
      results: { email: "igor@nossas.org" },
      organization: "ADVOGADA"
    });

    expect(user).toEqual({
      name: "Igor",
      email: "igor@nossas.org",
      phone: "31 991177656",
      organization_id: 1
    });

    return done();
  });
});
