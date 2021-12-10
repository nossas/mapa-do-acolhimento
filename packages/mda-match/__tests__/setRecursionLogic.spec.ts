import { setRecursionLogic } from "../src/components";

// How can I test the else condition? It depends heavily in the Queue and data values

describe("Test handleMatch recursion logic", () => {
  it("should returns an object with ticket_id", () => {
    const recursion = setRecursionLogic([], 22626);
    expect(recursion).toStrictEqual({ ticket_id: 22626 });
    // expect(data).toStrictEqual([tickets[0]]);
  });
  it("should return an object with ticket_id undefined", () => {
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
    const recursion = setRecursionLogic(tickets);
    expect(recursion).toStrictEqual({ ticket_id: undefined });
    // expect(data).toStrictEqual(tickets);
  });
  // it("should add different tickets to data, if so, and return the Queue last ticket", () => {
  //   const data = [];
  //   const tickets = [
  //     {
  //       subject: "[Psicológico] Teste, Taubaté - SP",
  //       ticket_id: 22625,
  //       atrelado_ao_ticket: null,
  //       requester_id: 399466521691,
  //       nome_msr: "Teste",
  //       status_acolhimento: "solicitação_recebida",
  //       external_id: 2000362,
  //       __typename: "solidarity_tickets"
  //     },
  //     {
  //       subject: "[Jurídico] Teste, Taubaté - SP",
  //       ticket_id: 22626,
  //       atrelado_ao_ticket: null,
  //       requester_id: 399466521691,
  //       nome_msr: "Teste",
  //       status_acolhimento: "solicitação_recebida",
  //       external_id: 2000362,
  //       __typename: "solidarity_tickets"
  //     }
  //   ];
  //   Queue(tickets).add();
  //   const tickets_add = [
  //     ...tickets,
  //     {
  //       subject: "[Jurídico] Teste, Ubatuba - SP",
  //       ticket_id: 22630,
  //       atrelado_ao_ticket: null,
  //       requester_id: 399466521691,
  //       nome_msr: "Teste",
  //       status_acolhimento: "solicitação_recebida",
  //       external_id: 2000362,
  //       __typename: "solidarity_tickets"
  //     }
  //   ];
  //   const recursion = setRecursionLogic(tickets_add);
  //   expect(recursion).toStrictEqual(tickets[1]);
  //   // expect(data).toStrictEqual(tickets_add);
  // });
});
