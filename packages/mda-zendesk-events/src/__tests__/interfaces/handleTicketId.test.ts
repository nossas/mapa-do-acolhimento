import handleTicketId from "../../interfaces/Ticket/handleTicketId";

describe("handleTicketId tests", () => {
  const dummy = {
    a: 10,
    b: "etc",
    id: 150
  };
  test("it removes id", () => {
    expect(handleTicketId(dummy)).toStrictEqual({
      a: 10,
      b: "etc",
      ticket_id: 150
    });
  });
});
