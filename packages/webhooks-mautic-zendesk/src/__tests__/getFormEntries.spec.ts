import axios from "axios";
import getFormEntries, { query } from "../getFormEntries";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockResolvedValue = {
  data: {
    data: {
      form_entries: []
    }
  }
};

describe("form entries", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it("throw error when WIDGET_IDS is empty", async done => {
    process.env.WIDGET_IDS = "";
    mockedAxios.post.mockResolvedValue(mockResolvedValue);

    await expect(getFormEntries("email@test.org")).rejects.toThrow(
      "Invalid WIDGET_IDS env var"
    );

    return done();
  });

  it("throw error when WIDGET_IDS is invalid", async done => {
    process.env.WIDGET_IDS = "123;2354;123123;123123";
    mockedAxios.post.mockResolvedValue(mockResolvedValue);

    await expect(getFormEntries("email@test.org")).rejects.toThrow(
      "Invalid WIDGET_IDS env var"
    );

    return done();
  });

  it("throw error when WIDGET_IDS array length min 6", async done => {
    process.env.WIDGET_IDS = "123,2354,123123,123123";
    mockedAxios.post.mockResolvedValue(mockResolvedValue);

    await expect(getFormEntries("email@test.org")).rejects.toThrow(
      "Invalid WIDGET_IDS env var"
    );

    return done();
  });

  it("call axios api when widgets_id valid", async done => {
    process.env.WIDGET_IDS = "1,12,123,1234,12345,123456";
    mockedAxios.post.mockResolvedValue(mockResolvedValue);
    const email = "email@test.org";

    await expect(getFormEntries(email)).resolves.toEqual(
      mockResolvedValue.data.data.form_entries
    );

    expect(mockedAxios.post).toBeCalledWith(
      process.env.HASURA_API_URL,
      {
        query,
        variables: {
          widgets: process.env.WIDGET_IDS.split(",").map(Number),
          email: `%${email}%`
        }
      },
      {
        headers: {
          "x-hasura-admin-secret": process.env.X_HASURA_ADMIN_SECRET
        }
      }
    );

    return done();
  });

  it("throw error when failed request GraphQL API", async done => {
    mockedAxios.post.mockRejectedValue("Request Failed");

    await expect(getFormEntries("email@test.org")).rejects.toThrow(
      "Failed request to GraphQL API"
    );

    return done();
  });
});
