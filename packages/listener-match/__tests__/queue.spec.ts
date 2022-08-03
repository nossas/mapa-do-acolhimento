jest.mock("subscriptions-transport-ws");

import { Queue } from "../src/components";
import { IndividualTicket } from "../src/types";

describe("Test queue operations", () => {
  let data: IndividualTicket[] = [];
  const tickets = [
    {
      subject: "[Psicológico] Viviane, Taubaté - SP",
      ticket_id: 22625,
      atrelado_ao_ticket: null,
      requester_id: 399466521691,
      nome_msr: "Viviane",
      status_acolhimento: "solicitação_recebida",
      external_id: 2000362,
      __typename: "solidarity_tickets",
      individual: {
        latitude: "0",
        longitude: "0",
        state: "SP"
      }
    },
    {
      subject: "[Jurídico] Viviane, Taubaté - SP",
      ticket_id: 22626,
      atrelado_ao_ticket: null,
      requester_id: 399466521691,
      nome_msr: "Viviane",
      status_acolhimento: "solicitação_recebida",
      external_id: 2000362,
      __typename: "solidarity_tickets",
      individual: {
        latitude: "0",
        longitude: "0",
        state: "SP"
      }
    }
  ];

  it("should add data to the beginning of the array", () => {
    data = Queue.add(data, tickets);
    expect(data).toStrictEqual(tickets);
  });
  it("should remove the first item from the array", () => {
    data = Queue.remove(data, tickets[0].ticket_id);
    expect(data).toStrictEqual([tickets[1]]);
  });
  it("should return the first item from the array", () => {
    expect(Queue.first(data)).toStrictEqual(tickets[1]);
  });
  it("should return the size of the array", () => {
    expect(Queue.size(data)).toStrictEqual(1);
  });
});
