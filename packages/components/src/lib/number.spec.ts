import { double, power } from "./number";

describe("bla", () => {
  it("double", () => {
    expect(double(2)).toEqual(4);
  });

  it("power", () => {
    expect(power(2, 4)).toEqual(16);
  });
});
