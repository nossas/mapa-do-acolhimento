import { sanitizeCity } from "../getSupportRequests";

describe("sanatizeCity", () => {
  it("should return 'NOT_FOUND' if city has 'ZERO_RESULTS' value", () => {
    expect(sanitizeCity("ZERO_RESULTS")).toStrictEqual("NOT_FOUND");
  });
  it("should return 'NOT_FOUND' if city has falsy value", () => {
    // @ts-ignore
    expect(sanitizeCity(null)).toStrictEqual("NOT_FOUND");
  });
  it("should return city value if its valid", () => {
    expect(sanitizeCity("São Paulo")).toStrictEqual("São Paulo");
  });
});
