import {
  getRequestedVolunteerType,
  getVolunteerOrganizationId,
  calcDistance,
  filterCache,
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

  let cache: IndividualTicket[] = [];
  it("only add new items to cache if they werent in it", () => {
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
    cache = filterCache(cache, tickets_one);
    expect(cache.sort()).toIncludeSameMembers(tickets_one.sort());
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
    cache = filterCache(cache, tickets_two);
    expect(cache.sort()).toIncludeSameMembers(tickets_one.sort());
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
