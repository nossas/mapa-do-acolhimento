import { asyncABC } from "./async";

describe("bla", () => {
  it("getABC", async () => {
    expect(await asyncABC()).toStrictEqual(["a", "b", "c"]);
  });
});
