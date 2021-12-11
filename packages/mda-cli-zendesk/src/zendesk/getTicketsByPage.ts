import Base from "./Base";
// import { TicketResponse } from "../interfaces/Ticket";
import dbg from "./dbg";

const getTicketsByPage = (start_time: number) =>
  Base.get(
    "incremental/tickets",
    dbg.extend("getTicketsByPage"),
    { start_time }
  );

export default getTicketsByPage;
