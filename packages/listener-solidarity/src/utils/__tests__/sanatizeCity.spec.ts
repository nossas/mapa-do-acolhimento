import { sanitizeCity } from "../getSupportRequests";

describe("sanatizeCity", () => {
  it("should return 'not_found' if city has 'ZERO_RESULTS' value", () => {
    expect(sanitizeCity("ZERO_RESULTS")).toStrictEqual("not_found");
  });
  it("should return 'not_found' if city has falsy value", () => {
    // @ts-ignore
    expect(sanitizeCity(null)).toStrictEqual("not_found");
  });
  it("should return city value if its valid", () => {
    expect(sanitizeCity("São Paulo")).toStrictEqual("São Paulo");
  });
});
