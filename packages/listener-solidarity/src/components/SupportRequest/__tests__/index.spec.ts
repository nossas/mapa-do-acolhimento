import axios from "axios";
import createSupportRequests from "..";
import { Ticket, User } from "../../../types";

jest.mock("axios");
jest.mock("jsonwebtoken");

describe("createSupportRequests", () => {
  it("should throw an error if there are only 'undefined' tickets", async () => {
    await expect(createSupportRequests([undefined], [])).rejects.toThrow(
      "No valid tickets to save as support requests"
    );
  });
  it("should throw an error if axios post returns an error", async () => {
    axios.post = jest.fn().mockRejectedValueOnce({
      response: {
        status: 400,
        data: "foo bar",
      },
    });
    expect(
      await createSupportRequests(
        [{ id: 1, requester_id: 1, subject: "psicológico" } as Ticket],
        [
          {
            user_id: 1,
            user_fields: {
              latitude: "12",
              longitude: "13",
            },
          },
        ] as User[]
      )
    ).toStrictEqual(
      'Couldnt create support requests for these tickets: 1 and got this error: 400 - "foo bar"'
    );
  });
  it("should return resolved value from axios", async () => {
    axios.post = jest.fn().mockResolvedValue({
      response: {
        status: 200,
        data: "foo bar",
      },
    });
    expect(
      await createSupportRequests(
        [{ id: 1, requester_id: 1, subject: "psicológico" } as Ticket],
        [
          {
            user_id: 1,
            user_fields: {
              latitude: "12",
              longitude: "13",
              city: "São Paulo",
              state: "SP",
            },
          },
        ] as User[]
      )
    ).toStrictEqual({
      response: {
        status: 200,
        data: "foo bar",
      },
    });
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5000/create",
      [
        {
          acceptsOnlineSupport: true,
          city: "São Paulo",
          hasDisability: false,
          lat: 12,
          lng: 13,
          msrId: 1,
          priority: null,
          requiresLibras: false,
          state: "SP",
          supportExpertise: null,
          supportType: "psychological",
          zendeskTicketId: 1,
        },
      ],
      {
        headers: {
          Authorization: undefined,
        },
      }
    );
  });
});
