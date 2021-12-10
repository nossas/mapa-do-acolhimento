import Base from "./Base";
import { UserResponse } from "../interfaces/User";
import dbg from "./dbg";

const getUsersByPage = (start_time: number) =>
  Base.get<UserResponse>("incremental/users", dbg.extend("getUsersByPage"), {
    start_time
  });

export default getUsersByPage;
