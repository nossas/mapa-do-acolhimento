import axios from "axios";
import {
  query,
  getFormEntryByEmail,
  customGetFormEntries as getFormEntries
} from "../getFormEntries";

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
    process.env = {
      ...OLD_ENV,
      X_HASURA_ADMIN_SECRET: "123-secret",
      WIDGET_IDS: "12,45,55,23,12,34",
      HASURA_API_URL: "http://localhost:8080/graphql"
    }; // Make a copy
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

    await expect(getFormEntries(email)).resolves.toEqual([]);

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
          "x-hasura-admin-secret": "123-secret"
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

  describe("getFormEntryByEmail", () => {
    it("throw error when form_entry invalid", async done => {
      mockedAxios.post.mockResolvedValue({
        data: {
          data: {
            form_entries: [{ fields: [], created_at: "", widget_id: 1 }]
          }
        }
      });

      await expect(getFormEntryByEmail("email@test.org")).rejects.toThrow(
        "form_entry is invalid"
      );
      return done();
    });

    it("throw error when form_entry fields invalid", async done => {
      mockedAxios.post.mockResolvedValue({
        data: {
          data: {
            form_entries: [
              {
                fields: [2, 3, 4],
                created_at: "2020-06-12 12:00:00",
                widget_id: 1
              }
            ]
          }
        }
      });

      await expect(getFormEntryByEmail("email@test.org")).rejects.toThrow(
        "form_entry is invalid"
      );
      return done();
    });
  });
});
