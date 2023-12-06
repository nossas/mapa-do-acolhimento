import { Ticket, User } from "../../types";
import getSupportRequests from "../getSupportRequests";

describe("getSupportRequests", () => {
  it("should throw an error if there are no users related to ticket", () => {
    expect(() =>
      getSupportRequests(
        { requester_id: 1, id: 1 } as Ticket,
        [{ user_id: 2 }, { user_id: 3 }] as User[]
      )
    ).toThrow(new Error("Didn't find a user for this ticket 1"));
  });

  it("should return the correct payload for psychological support req", () => {
    expect(
      getSupportRequests(
        {
          requester_id: 1,
          id: 1,
          subject: "Psicológico",
        } as Ticket,
        [
          {
            user_id: 1,
            user_fields: {
              latitude: "12.12",
              longitude: "13.13",
              city: "São Paulo",
              state: "SP",
            },
          } as unknown,
        ] as User[]
      )
    ).toStrictEqual({
      msrId: 1,
      zendeskTicketId: 1,
      supportType: "psychological",
      priority: null,
      supportExpertise: null,
      hasDisability: false,
      requiresLibras: false,
      acceptsOnlineSupport: true,
      lat: 12.12,
      lng: 13.13,
      city: "São Paulo",
      state: "SP",
    });
  });

  it("should return the correct payload for psychological support req", () => {
    expect(
      getSupportRequests(
        {
          requester_id: 1,
          id: 1,
          subject: "Jurídico",
        } as Ticket,
        [
          {
            user_id: 1,
            user_fields: {
              latitude: "12.12",
              longitude: "13.13",
              city: "São Paulo",
              state: "SP",
            },
          } as unknown,
        ] as User[]
      )
    ).toStrictEqual({
      msrId: 1,
      zendeskTicketId: 1,
      supportType: "legal",
      priority: null,
      supportExpertise: null,
      hasDisability: false,
      requiresLibras: false,
      acceptsOnlineSupport: true,
      lat: 12.12,
      lng: 13.13,
      city: "São Paulo",
      state: "SP",
    });
  });

  it("should throw an error if invalid support type", () => {
    expect(() =>
      getSupportRequests(
        {
          requester_id: 1,
          id: 1,
          subject: "jurdico",
        } as Ticket,
        [
          {
            user_id: 1,
            user_fields: {
              latitude: "12.12",
              longitude: "13.13",
              city: "São Paulo",
              state: "SP",
            },
          } as unknown,
        ] as User[]
      )
    ).toThrow(new Error("Unsupported support type"));
  });
});
