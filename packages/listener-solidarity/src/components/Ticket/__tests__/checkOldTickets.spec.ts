jest.mock("subscriptions-transport-ws");

import { checkOldTickets } from "../.";
import data from "../__mocks__/tickets";

describe("Testing checkOldTickets", () => {
  const {
    tickets: {
      no_match: {
        solicitação_recebida,
        encaminhamento__negado,
        atendimento__interrompido,
        second_ticket
      },
      no_fit,
      has_match: { atendimento__iniciado }
    }
  } = data;

  it('should return "false" because there were no old tickets', () => {
    const oldTickets = checkOldTickets("[Jurídico] Teste, São Paulo - SP", []);
    expect(oldTickets).toStrictEqual(false);
  });

  it('should return "false" because no old tickets match subject', () => {
    const oldTickets = checkOldTickets(
      "[Jurídico] Teste, São Paulo - SP",
      no_fit as never
    );
    expect(oldTickets).toStrictEqual(false);
  });
  it("should return 'false' if old tickets are 'closed' or 'solved'", () => {
    const oldTickets = checkOldTickets(
      "[Jurídico] Camila, Cuiabá - MT",
      no_fit as never
    );
    expect(oldTickets).toStrictEqual(false);
  });

  describe("Individual has old tickets, but none was a match and the oldest wasn't attended to yet - 'status_acolhimento = 'solicitação_recebida'", () => {
    it("should return a ticket_id and agent_id", () => {
      const oldTickets = checkOldTickets(
        "[Psicológico] Teste, São Paulo - SP",
        solicitação_recebida as never
      );
      expect(oldTickets).toStrictEqual({
        relatedTickets: 16866,
        agent: 123123
      });
    });
  });

  describe("Individual has a match ticket", () => {
    it("should return ticket_id in array", async () => {
      const oldTickets = checkOldTickets(
        "[Psicológico] Viviane, Taubaté - SP",
        atendimento__iniciado as never
      );
      expect(oldTickets).toStrictEqual({
        relatedTickets: [19895],
        agent: 123123
      });
    });
  });

  describe("MSR had a forwarding but it didn't work - we don't relate this old ticket with the new one, just create a new one", () => {
    it('should return "false"', () => {
      const oldTickets = checkOldTickets(
        "[Psicológico] Teste, Taubaté - SP",
        encaminhamento__negado as never
      );
      expect(oldTickets).toStrictEqual(false);
    });
    it('should return "false"', () => {
      const oldTickets = checkOldTickets(
        "[Psicológico] Teste, Cuiaá - MT",
        atendimento__interrompido as never
      );
      expect(oldTickets).toStrictEqual(false);
    });
    it('should return "false"', () => {
      const oldTickets = checkOldTickets(
        "[Psicológico] Teste, Santos - SP",
        second_ticket as never
      );
      expect(oldTickets).toStrictEqual(false);
    });
    it('should return "false"', () => {
      const oldTickets = checkOldTickets(
        "[Jurídico] Teste, Recife - PE",
        second_ticket as never
      );
      expect(oldTickets).toStrictEqual(false);
    });
  });
});
