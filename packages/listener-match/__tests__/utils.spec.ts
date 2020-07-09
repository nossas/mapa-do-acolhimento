import {
  getRequestedVolunteerType,
  getVolunteerOrganizationId,
  calcDistance,
  getDifference,
  getCurrentDate,
  getVolunteerType,
  zendeskOrganizations
} from "../src/utils";
import { IndividualTicket } from "../src/types";

describe("Utils", () => {
  it('should return "therapist" if support type is "psicológico"', () => {
    const subject = "[Psicológico] Teste, Rio de Janeiro  - RJ";
    expect(getRequestedVolunteerType(subject)).toStrictEqual("therapist");
  });
  it('should return "lawyer" if support type is "jurídico"', () => {
    const subject = "[Jurídico] Teste, São Paulo - SP";
    expect(getRequestedVolunteerType(subject)).toStrictEqual("lawyer");
  });
  it('should return "undefined" if there is no support type in subject', () => {
    const subject = "";
    expect(getRequestedVolunteerType(subject)).toStrictEqual(undefined);
  });

  it("should return the correct organization id", () => {
    expect(getVolunteerOrganizationId("lawyer")).toStrictEqual(360269610652);
    expect(getVolunteerOrganizationId("individual")).toStrictEqual(
      360273031591
    );
    expect(getVolunteerOrganizationId("therapist")).toStrictEqual(360282119532);
  });

  it("should return undefined if one of the values inside the tuple isn'nt a number", () => {
    expect(calcDistance([12.91001, 153.90263], [40.40719])).toStrictEqual(
      undefined
    );
    expect(calcDistance([-21.52472], [6.7367, -46.24922])).toStrictEqual(
      undefined
    );
    expect(calcDistance([58.20725, 44.79954], [-31.73592, 97.29179])).toBe(
      5077.827974980835
    );
  });

  describe("getDifference should return elements that weren't in cache", () => {
    const tickets_one = [
      {
        subject: "[Psicológico] Teste, Taubaté - SP",
        ticket_id: 22625,
        atrelado_ao_ticket: null,
        requester_id: 399466521691,
        nome_msr: "Teste",
        status_acolhimento: "solicitação_recebida",
        external_id: 2000362,
        __typename: "solidarity_tickets"
      },
      {
        subject: "[Jurídico] Teste, Taubaté - SP",
        ticket_id: 22626,
        atrelado_ao_ticket: null,
        requester_id: 399466521691,
        nome_msr: "Teste",
        status_acolhimento: "solicitação_recebida",
        external_id: 2000362,
        __typename: "solidarity_tickets"
      },
      {
        subject: "[Jurídico] Teste Teste 2, São Paulo - SP",
        ticket_id: 22628,
        atrelado_ao_ticket: 22626,
        requester_id: 399466521691,
        nome_msr: "Teste Teste 2",
        status_acolhimento: "solicitação_recebida",
        external_id: 2000362,
        __typename: "solidarity_tickets"
      }
    ];
    const tickets_two = [
      {
        subject: "[Psicológico] Teste, Taubaté - SP",
        ticket_id: 22625,
        atrelado_ao_ticket: null,
        requester_id: 399466521691,
        nome_msr: "Teste",
        status_acolhimento: "solicitação_recebida",
        external_id: 2000362,
        __typename: "solidarity_tickets"
      },
      {
        subject: "[Jurídico] Teste, Taubaté - SP",
        ticket_id: 22626,
        atrelado_ao_ticket: null,
        requester_id: 399466521691,
        nome_msr: "Teste",
        status_acolhimento: "solicitação_recebida",
        external_id: 2000362,
        __typename: "solidarity_tickets"
      }
    ];
    const tickets_three = [
      {
        subject: "[Psicológico] Teste, Taubaté - SP",
        ticket_id: 22630,
        atrelado_ao_ticket: null,
        requester_id: 399466521691,
        nome_msr: "Teste",
        status_acolhimento: "solicitação_recebida",
        external_id: 2000362,
        __typename: "solidarity_tickets"
      }
    ];
    const tickets_four = [
      {
        subject: "[Psicológico] Teste, Taubaté - SP",
        ticket_id: 22630,
        atrelado_ao_ticket: null,
        requester_id: 399466521691,
        nome_msr: "Teste",
        status_acolhimento: "solicitação_recebida",
        external_id: 2000362,
        __typename: "solidarity_tickets"
      },
      {
        subject: "[Jurídico] Teste, Cuiabá - MT",
        ticket_id: 22631,
        atrelado_ao_ticket: null,
        requester_id: 399466521691,
        nome_msr: "Teste",
        status_acolhimento: "solicitação_recebida",
        external_id: 2000362,
        __typename: "solidarity_tickets"
      },
      {
        subject: "[Psicológico] Teste, Belo Horizonte - BH",
        ticket_id: 22632,
        atrelado_ao_ticket: null,
        requester_id: 399466521691,
        nome_msr: "Teste",
        status_acolhimento: "solicitação_recebida",
        external_id: 2000362,
        __typename: "solidarity_tickets"
      }
    ];
    it("should return all tickets, because cache is empty and add them to cache", () => {
      let cache: IndividualTicket[] = [];
      expect(getDifference(cache, tickets_one)).toStrictEqual(tickets_one);
      cache = getDifference(cache, tickets_one);
      expect(cache).toStrictEqual(tickets_one);
    });
    it("should return an empty array, and cache stays the same", () => {
      let cache: IndividualTicket[] = tickets_one;
      expect(getDifference(cache, tickets_two)).toStrictEqual([]);
      cache = [...cache, ...getDifference(cache, tickets_two)];
      expect(cache).toStrictEqual(tickets_one);
    });
    it("should return the different ticket and add it to cache", () => {
      let cache: IndividualTicket[] = [...tickets_one];
      expect(getDifference(cache, tickets_three)).toStrictEqual(tickets_three);
      cache = [...cache, ...getDifference(cache, tickets_three)];
      expect(cache).toStrictEqual([...tickets_one, ...tickets_three]);
    });
    it("should return the different ticket and add it to cache", () => {
      let cache: IndividualTicket[] = tickets_one;
      expect(getDifference(cache, tickets_four)).toStrictEqual(tickets_four);
      cache = [...cache, ...getDifference(cache, tickets_four)];
      expect(cache).toStrictEqual([...tickets_one, ...tickets_four]);
    });
  });

  it("returns the current date", () => {
    expect(new Date(getCurrentDate())).toBeDate();
  });

  it("returns the correct volunteer type", () => {
    expect(getVolunteerType(zendeskOrganizations["lawyer"]).type).toStrictEqual(
      "Advogada"
    );
    expect(
      getVolunteerType(zendeskOrganizations["therapist"]).type
    ).toStrictEqual("Psicóloga");
  });
});
