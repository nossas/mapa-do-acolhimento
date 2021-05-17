import { proccessMatch, createMatch } from "../src/components";

describe("Handle Ticket", () => {
  it("should return early if 'solicitação_repetida' and field 'atrelado_ao_ticket' is null", async () => {
    const ticket = {
      subject: "[Psicológico] teste nova msr, São Paulo - SP",
      ticket_id: 22964,
      atrelado_ao_ticket: null,
      requester_id: 399651097352,
      nome_msr: "teste nova msr",
      status_acolhimento: "solicitação_repetida",
      external_id: 2000362,
      __typename: "solidarity_tickets",
      individual: {
        latitude: "0",
        longitude: "0",
        state: "SP"
      }
    };
    expect(
      await proccessMatch({
        individualTicket: ticket,
        AGENT: 1
      })
    ).toStrictEqual(22964);
  });

  it("should pass if 'solicitação_repetida' and field 'atrelado_ao_ticket' is not null", async () => {
    const ticket = {
      subject: "[Psicológico] teste nova msr, São Paulo - SP",
      ticket_id: 22970,
      atrelado_ao_ticket: 22965,
      requester_id: 0,
      nome_msr: "teste nova msr",
      status_acolhimento: "solicitação_repetida",
      external_id: 0,
      individual: {
        latitude: "0",
        longitude: "0",
        state: "SP"
      }
    };
    expect(
      await proccessMatch({
        individualTicket: ticket,
        AGENT: 1
      })
    ).not.toStrictEqual(22970);
  });

  it("should return early if ticket subject doesn't have a subject with a type", async () => {
    const ticket = {
      subject: "Re: Temos um recado para você!",
      ticket_id: 22964,
      atrelado_ao_ticket: null,
      requester_id: 399651097352,
      nome_msr: "teste nova msr",
      status_acolhimento: "solicitação_recebida",
      external_id: 2000362,
      __typename: "solidarity_tickets",
      individual: {
        latitude: "0",
        longitude: "0",
        state: "SP"
      }
    };
    expect(await createMatch(ticket)).toStrictEqual(22964);
  });
});
