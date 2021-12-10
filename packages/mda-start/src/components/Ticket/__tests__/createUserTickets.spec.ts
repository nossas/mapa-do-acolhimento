import { composeTickets } from "../.";
import data from "../__mocks__/tickets";

describe("Test if ticket is building correctly", () => {
  test("msr ticket is created with expected output", async () => {
    const createTickets = await composeTickets(data.users.individuals);
    expect(createTickets).toStrictEqual(data.results);
  });
});
