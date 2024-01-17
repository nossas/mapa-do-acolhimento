import axios from "axios";
import createSupportRequests from "..";
import { Ticket, User } from "../../../types";

jest.mock("axios");
jest.mock("jsonwebtoken");

describe("createSupportRequests", () => {
  it("should throw an error if there are only 'undefined' tickets", async () => {
    const invalidTickets = await createSupportRequests([undefined], []);
    expect(invalidTickets).toStrictEqual(
      "No valid tickets to save as support requests"
    );
  });
  it("should throw an error if there are no 'open' tickets", async () => {
    const invalidTickets = await createSupportRequests(
      [{ requester_id: 1, id: 1, status: "closed" }] as Ticket[],
      [{ user_id: 1 }] as User[]
    );
    expect(invalidTickets).toStrictEqual(
      "No valid tickets to save as support requests"
    );
  });
  it("should return error res when no user is found for the ticket", async () => {
    await expect(
      createSupportRequests(
        [{ requester_id: 1, id: 1, status: "open" }] as Ticket[],
        [{ user_id: 2 }, { user_id: 3 }] as User[]
      )
    ).rejects.toThrow(
      "Couldnt create support requests for these tickets: 1 and got this error: Didn't find a user for this ticket"
    );
  });
  it("should return error res when ticket has unsupported support type", async () => {
    await expect(
      createSupportRequests(
        [
          { requester_id: 1, id: 1, subject: "foo bar", status: "open" },
        ] as Ticket[],
        [{ user_id: 1 }] as User[]
      )
    ).rejects.toThrow(
      "Couldnt create support requests for these tickets: 1 and got this error: Unsupported support type"
    );
  });
  it("should return an error res if axios post is rejected", async () => {
    axios.post = jest.fn().mockRejectedValueOnce({
      response: {
        status: 400,
        data: "foo bar",
      },
    });
    await expect(
      createSupportRequests(
        [
          {
            id: 1,
            requester_id: 1,
            subject: "psicológico",
            status: "open",
          } as Ticket,
        ],
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
    ).rejects.toThrow(
      'Couldnt create support requests for these tickets: 1 and got this error: 400 - "foo bar"'
    );
  });
  it("should call axios with expected payload and return the resolved value", async () => {
    axios.post = jest.fn().mockResolvedValue({
      response: {
        status: 200,
        data: "foo bar",
      },
    });
    expect(
      await createSupportRequests(
        [
          {
            id: 1,
            requester_id: 1,
            subject: "psicológico",
            status: "open",
          } as Ticket,
        ],
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
      "http://localhost:5000/compose",
      [
        {
          acceptsOnlineSupport: true,
          city: "São Paulo",
          hasDisability: null,
          lat: 12,
          lng: 13,
          msrId: 1,
          priority: null,
          requiresLibras: null,
          state: "SP",
          supportExpertise: null,
          supportType: "psychological",
          zendeskTicketId: 1,
          status: "open",
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
