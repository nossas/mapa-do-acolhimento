import { Queue } from "../src/components";

describe("Test queue operations", () => {
  const data = [];
  const tickets = [
    {
      subject: "[Psicológico] Viviane, Taubaté - SP",
      ticket_id: 22625,
      atrelado_ao_ticket: null,
      requester_id: 399466521691,
      nome_msr: "Viviane",
      status_acolhimento: "solicitação_recebida",
      external_id: 2000362,
      __typename: "solidarity_tickets"
    },
    {
      subject: "[Jurídico] Viviane, Taubaté - SP",
      ticket_id: 22626,
      atrelado_ao_ticket: null,
      requester_id: 399466521691,
      nome_msr: "Viviane",
      status_acolhimento: "solicitação_recebida",
      external_id: 2000362,
      __typename: "solidarity_tickets"
    }
  ];

  it("should add data to the beginning of the array", () => {
    Queue(data).add(tickets);
    expect(data).toStrictEqual(tickets);
  });
  it("should remove the first item from the array", () => {
    Queue(data).remove();
    expect(data).toStrictEqual([tickets[1]]);
  });
  it("should return the first item from the array", () => {
    expect(Queue(data).first()).toStrictEqual(tickets[1]);
  });
  it("should return the size of the array", () => {
    expect(Queue(data).size()).toStrictEqual(1);
  });
});
