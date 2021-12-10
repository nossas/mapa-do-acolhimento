import { client as GraphQLAPI } from "../";
import dbg from "../../dbg";

const log = dbg.child({
  module: "hasura",
  labels: { process: "fetchSolidarityMatches" }
});

const fetchSolidarityMatches = async ({
  query,
  variables
}: {
  query;
  variables?;
}) => {
  try {
    const res = await GraphQLAPI.query({
      query,
      variables
    });

    if (res && res.data && res.data.errors) {
      log.error("failed to fetch solidarity_matches: ".red, res.data.errors);
      return undefined;
    }

    const {
      data: { solidarity_matches }
    } = res;

    // log({ returning: solidarity_matches });

    return solidarity_matches || [];
  } catch (err) {
    log.error("failed to fetch solidarity_matches: ".red, err);
    return undefined;
  }
};

export default fetchSolidarityMatches;
