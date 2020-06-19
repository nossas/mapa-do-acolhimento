import { client as GraphQLAPI } from "../";
import dbg from "../../dbg";

const log = dbg.extend("fetchSolidarityUsers");

const fetchSolidarityUsers = async ({ query, variables }) => {
  try {
    const res = await GraphQLAPI.query({
      query,
      variables
    });

    if (res && res.data && res.data.errors) {
      log("failed to fetch solidarity_users: ".red, res.data.errors);
      return undefined;
    }

    const {
      data: { solidarity_users }
    } = res;

    // log({ returning: solidarity_users });

    return solidarity_users || [];
  } catch (err) {
    log("failed to fetch solidarity_users: ".red, err);
    return undefined;
  }
};

export default fetchSolidarityUsers;
