import { getSupportType } from "../getSupportRequests";

describe("getSupportType", () => {
  it("should return psychological if subject is 'psicológico'", () => {
    expect(getSupportType("Psicológico")).toStrictEqual("psychological");
  });
  it("should return legal if subject is 'jurídico'", () => {
    expect(getSupportType("Jurídico")).toStrictEqual("legal");
  });
  it("should throw an error when unsupported support type is provided", () => {
    expect(() => getSupportType("foo")).toThrow(
      new Error("Unsupported support type")
    );
  });
});
