import { getRequestedVolunteerType } from "../src/services/utils";

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
});
