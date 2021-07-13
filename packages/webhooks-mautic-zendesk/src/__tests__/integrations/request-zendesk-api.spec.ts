import requestZendeskApi from "../../integration-functions/request-zendesk-api";
import axios from "axios";

const spyAxiosPost = jest.spyOn(axios, "post");
const spyAxiosGet = jest.spyOn(axios, "get");
const spyAxiosPut = jest.spyOn(axios, "put");

describe("users/{userId}/tickets/requested", () => {
  const OLD_ENV = process.env;
  const ZENDESK_API_USER = "email@nossas.org/user";
  const ZENDESK_API_TOKEN = "1234567890";
  const ZENDESK_API_URL = "http://zendesk.api/url";

  const auth = {
    username: ZENDESK_API_USER,
    password: ZENDESK_API_TOKEN
  };

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = {
      ...OLD_ENV,
      ZENDESK_API_USER,
      ZENDESK_API_TOKEN,
      ZENDESK_API_URL,
      ZENDESK_ORGANIZATIONS: '{"PSICOLOGA": 1234, "ADVOGADA": 4321}',
      HASURA_API_URL: "http://localhost:8080/graphql"
    }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  it("call POST api", async (done: any) => {
    const userId = 2;
    const path = "users/create";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    spyAxiosPost.mockResolvedValue({} as any);
    await requestZendeskApi("POST", path, { userId });

    expect(spyAxiosPost).toBeCalledWith(
      `${ZENDESK_API_URL}/${path}`,
      { userId },
      { auth }
    );

    return done();
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  it("call GET api", async (done: any) => {
    const path = "users/fetch";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    spyAxiosGet.mockResolvedValue({} as any);
    await requestZendeskApi("GET", path);

    expect(spyAxiosGet).toBeCalledWith(`${ZENDESK_API_URL}/${path}`, { auth });

    return done();
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  it("call PUT api", async (done: any) => {
    const userId = 2;
    const path = "users/update";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    spyAxiosPut.mockResolvedValue({} as any);
    await requestZendeskApi("PUT", path, { userId });

    expect(spyAxiosPut).toBeCalledWith(
      `${ZENDESK_API_URL}/${path}`,
      { userId },
      { auth }
    );

    return done();
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  it("throw Error when not found method", async (done: any) => {
    const path = "users/update";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await expect(requestZendeskApi("ASSADA" as any, path)).rejects.toThrow(
      "method ASSADA not is valid"
    );
    return done();
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  it("default method is POST", async (done: any) => {
    const userId = 2;
    const path = "users/create";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    spyAxiosPost.mockResolvedValue({} as any);
    await requestZendeskApi(undefined, path, { userId });

    expect(spyAxiosPost).toBeCalledWith(
      `${ZENDESK_API_URL}/${path}`,
      { userId },
      { auth }
    );

    return done();
  });
});
