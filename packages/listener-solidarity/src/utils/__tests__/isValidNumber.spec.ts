import { isValidNumber } from "../getSupportRequests";

describe("isValidNumber", () => {
  it("should return true if the georef string param turns into a valid number", () => {
    expect(isValidNumber("11.22")).toStrictEqual(true);
  });
  it("should return true if the georef is a number", () => {
    expect(isValidNumber(22.33)).toStrictEqual(true);
  });
  it("should return false if the georef is null", () => {
    expect(isValidNumber(null)).toStrictEqual(false);
  });
  it("should return false when georef string is an invalid string", () => {
    expect(isValidNumber("foobar")).toStrictEqual(false);
  });
});
