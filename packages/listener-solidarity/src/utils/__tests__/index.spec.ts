import {
  extractTypeFromSubject,
  getOrganizationType,
  capitalize,
  formatDate,
  getStatusAcolhimento,
  getMsrPayload
} from "../";

describe("Utils", () => {
  describe('should return "psicológico" ou "jurídico"', () => {
    it('should return "psicológico"', () => {
      const therapist = extractTypeFromSubject(
        "[Psicológico] Joseane, Curitiba - PR"
      );
      expect(therapist).toEqual("psicológico");
    });
    it('should return "jurídico"', () => {
      const lawyer = extractTypeFromSubject(
        "[Jurídico] Joseane, Curitiba - PR"
      );
      expect(lawyer).toEqual("jurídico");
    });
  });

  describe("should return correct organization based on widget id", () => {
    it('should return "THERAPIST"', () => {
      expect(getOrganizationType(2760)).toEqual("THERAPIST");
      expect(getOrganizationType(16835)).toEqual("THERAPIST");
      expect(getOrganizationType(17628)).toEqual("THERAPIST");
    });
    it('should return "LAWYER"', () => {
      expect(getOrganizationType(8190)).toEqual("LAWYER");
      expect(getOrganizationType(16838)).toEqual("LAWYER");
      expect(getOrganizationType(17633)).toEqual("LAWYER");
    });
    it('should return "MSR"', () => {
      expect(getOrganizationType(3297)).toEqual("MSR");
      expect(getOrganizationType(16850)).toEqual("MSR");
    });
  });

  describe("should capitalize words", () => {
    it("capitalizes", () => {
      expect(capitalize("mapa do acolhimento")).toEqual("Mapa do acolhimento");
      expect(capitalize("na fé irmão")).toEqual("Na fé irmão");
      expect(capitalize("tech for good")).toEqual("Tech for good");
    });
  });

  describe("should format timestamp according to zendesk format", () => {
    // reference: https://develop.zendesk.com/hc/en-us/community/posts/360001644768-Format-to-pass-Date-field-type
    it("formats", () => {
      expect(formatDate("2020-03-05T11:28:01.48789")).toEqual("2020-03-05");
      expect(formatDate("2019-03-23T23:22:48.813946")).toEqual("2019-03-23");
      expect(formatDate("2018-03-10T11:28:01.48789")).toEqual("2018-03-10");
    });
  });

  it("should return the value of the field 'status_acolhimento'", () => {
    // reference: https://develop.zendesk.com/hc/en-us/community/posts/360001644768-Format-to-pass-Date-field-type
    expect(
      getStatusAcolhimento({
        custom_fields: [
          { id: 360014379412, value: "encaminhamento__realizado" }
        ]
      } as never)
    ).toEqual("encaminhamento__realizado");
    expect(
      getStatusAcolhimento({
        custom_fields: [{ id: 360014379412, value: "solicitação_recebida" }]
      } as never)
    ).toEqual("solicitação_recebida");
    expect(
      getStatusAcolhimento({
        custom_fields: [
          { id: 360014379412, value: "atendimento__interrompido" }
        ]
      } as never)
    ).toEqual("atendimento__interrompido");
  });
  describe("getMsrPayload", () => {
    const mockMsrUser = {
      user_id: 67891234,
      name: "venus da Silva",
      role: "end-user" as "end-user",
      organization_id: 360273031591,
      email: "venus@email.com",
      external_id: "2000365",
      phone: "32994329912",
      verified: true,
      user_fields: {
        cor: "preta",
        address: "",
        cep: "36085-200",
        city: "Juiz de Fora",
        latitude: "-21.700",
        longitude: "-43.300",
        state: "MG",
        neighborhood: "cidade do sol",
        tipo_de_acolhimento: "psicológico" as "psicológico",
        condition: "inscrita" as "inscrita",
        whatsapp: "(32)99432-9912",
        registration_number: null,
        occupation_area: null,
        disponibilidade_de_atendimentos: null,
        data_de_inscricao_no_bonde: "2020-05-27T13:15:47.93393"
      }
    };
    const mockMsrPayload = getMsrPayload(mockMsrUser);
    it("should first name be captalize and just first word", () => {
      expect(mockMsrPayload.firstName).toEqual("Venus");
    });
    it("should zipocode be just numbers", () => {
      expect(mockMsrPayload.zipcode).toEqual("36085200");
    });
    it("should phone be just numbers", () => {
      expect(mockMsrPayload.phone).toEqual("32994329912");
    });
    it("should city be format", () => {
      expect(mockMsrPayload.city).toEqual("JUIZ DE FORA");
    });
    it("should neighborhood be captalize", () => {
      expect(mockMsrPayload.neighborhood).toEqual("Cidade do sol");
    });
  });
});
