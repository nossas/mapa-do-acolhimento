import { client as GraphQLAPI } from "../";
import dbg from "../../dbg";

const log = dbg.extend("fetchSolidarityMatches");

const fetchSolidarityMatches = async ({ query, variables }) => {
  try {
    const res = await GraphQLAPI.query({
      query,
      variables
    });

    if (res && res.data && res.data.errors) {
      log("failed to fetch solidarity_matches: ".red, res.data.errors);
      return undefined;
    }

    const {
      data: { solidarity_matches }
    } = res;

    // log({ returning: solidarity_matches });

    return solidarity_matches || [];
  } catch (err) {
    log("failed to fetch solidarity_matches: ".red, err);
    return undefined;
  }
};

export default fetchSolidarityMatches;
