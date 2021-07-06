import * as requestZendeskApi from "../../integration-functions/request-zendesk-api";
import fetchTickets from "../../integration-functions/fetch-tickets";

const spyZendesk = jest.spyOn(requestZendeskApi, "default");

describe("users/{userId}/tickets/requested", () => {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  it("call requestZendeskApi with userId passed", async (done: any) => {
    const userId = 2;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    spyZendesk.mockResolvedValue({ data: { tickets: [] } } as any);
    await fetchTickets({ userId });

    expect(spyZendesk).toBeCalledWith(
      "GET",
      `users/${userId}/tickets/requested`
    );
    return done();
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  it("throw Error when result Zendesk API change", async (done: any) => {
    const userId = 2;
    spyZendesk.mockResolvedValue({
      data: { tickets: [{ subject_1: "" }] }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    await expect(fetchTickets({ userId })).rejects.toThrow(
      "[0].subject is a required field"
    );

    spyZendesk.mockResolvedValue({
      data: { tickets: [{ subject: "Teste", status: "" }] }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    await expect(fetchTickets({ userId })).rejects.toThrow(
      "[0].status is a required field"
    );

    return done();
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  it("return result ZendeskAPI tickets", async (done: any) => {
    const userId = 2;
    const tickets = [{ id: 2, subject: "[PSICOLOGA] Teste 1", status: "open" }];
    spyZendesk.mockResolvedValue({
      data: { tickets }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    await expect(fetchTickets({ userId })).resolves.toEqual(tickets);

    return done();
  });
});
