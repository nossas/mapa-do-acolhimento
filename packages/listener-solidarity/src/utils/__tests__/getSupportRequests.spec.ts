import { Ticket, User } from "../../types";
import getSupportRequests from "../getSupportRequests";

describe("getSupportRequests", () => {
  describe("Unhappy path", () => {
    it("should throw an error if there are no users related to ticket", () => {
      expect(() =>
        getSupportRequests(
          { requester_id: 1, id: 1 } as Ticket,
          [{ user_id: 2 }, { user_id: 3 }] as User[]
        )
      ).toThrow(new Error("Didn't find a user for this ticket"));
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

  describe("Happy path", () => {
    const defaultMsrTicket = {
      requester_id: 1,
      id: 1,
      subject: "Psicológico",
      custom_fields: [
        {
          id: 360014379412, // status_acolhimento
          value: "solicitação_recebida",
        },
      ],
    } as Ticket;

    const defaultMsr = [
      {
        user_id: 1,
        user_fields: {
          latitude: "12.12",
          longitude: "13.13",
          city: "São Paulo",
          state: "SP",
        },
      } as unknown,
    ] as User[];

    it("should return the correct payload for psychological support req", () => {
      expect(getSupportRequests(defaultMsrTicket, defaultMsr)).toStrictEqual({
        msrId: 1,
        zendeskTicketId: 1,
        supportType: "psychological",
        priority: null,
        supportExpertise: null,
        hasDisability: null,
        requiresLibras: null,
        acceptsOnlineSupport: true,
        lat: 12.12,
        lng: 13.13,
        city: "São Paulo",
        state: "SP",
        status: "open",
      });
    });

    it("should return the correct payload for legal support req", () => {
      expect(
        getSupportRequests(
          {
            ...defaultMsrTicket,
            subject: "Jurídico",
            custom_fields: [
              {
                id: 360014379412, // status_acolhimento
                value: "solicitação_repetida",
              },
            ],
          },
          defaultMsr
        )
      ).toStrictEqual({
        msrId: 1,
        zendeskTicketId: 1,
        supportType: "legal",
        priority: null,
        supportExpertise: null,
        hasDisability: null,
        requiresLibras: null,
        acceptsOnlineSupport: true,
        lat: 12.12,
        lng: 13.13,
        city: "São Paulo",
        state: "SP",
        status: "duplicated",
      });
    });

    it("should return a null value if lat is not a valid number", () => {
      expect(
        getSupportRequests(defaultMsrTicket, [
          {
            ...defaultMsr[0],
            user_fields: {
              ...defaultMsr[0].user_fields,
              latitude: null,
            },
          },
        ])
      ).toStrictEqual(
        expect.objectContaining({
          lat: null,
        })
      );
    });

    it("should return a null value if lng is not a valid number", () => {
      expect(
        getSupportRequests(defaultMsrTicket, [
          {
            ...defaultMsr[0],
            user_fields: {
              ...defaultMsr[0].user_fields,
              longitude: "foobar",
            },
          },
        ])
      ).toStrictEqual(
        expect.objectContaining({
          lng: null,
        })
      );
    });

    it("should return 'not_found' if city is 'ZERO_RESULTS'", () => {
      expect(
        getSupportRequests(defaultMsrTicket, [
          {
            ...defaultMsr[0],
            user_fields: {
              ...defaultMsr[0].user_fields,
              city: "ZERO_RESULTS",
            },
          },
        ])
      ).toStrictEqual(
        expect.objectContaining({
          city: "not_found",
        })
      );
    });

    it("should return 'not_found' if state is falsy", () => {
      expect(
        getSupportRequests(defaultMsrTicket, [
          {
            ...defaultMsr[0],
            user_fields: {
              ...defaultMsr[0].user_fields,
              state: null,
            },
          },
        ])
      ).toStrictEqual(
        expect.objectContaining({
          state: "not_found",
        })
      );
    });

    it("should return an 'open' status if status_acolhimento is not found on custom_fields", () => {
      expect(
        getSupportRequests(
          {
            ...defaultMsrTicket,
            custom_fields: [],
          },
          [
            {
              ...defaultMsr[0],
              user_fields: {
                ...defaultMsr[0].user_fields,
                state: null,
              },
            },
          ]
        )
      ).toStrictEqual(
        expect.objectContaining({
          status: "open",
        })
      );
    });
  });
});
