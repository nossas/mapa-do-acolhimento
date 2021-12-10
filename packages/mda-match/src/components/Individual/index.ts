// import dbg from "../../dbg";
import gql from "graphql-tag";
import { fetchSolidarityUsers } from "../../graphql/queries";
import { Individual } from "../../types";

const FETCH_INDIVIDUAL = gql`
  query fetch_solidarity_user($requester_id: bigint!) {
    solidarity_users(
      where: {
        user_id: { _eq: $requester_id }
        latitude: { _is_null: false }
        longitude: { _is_null: false }
        state: { _is_null: false }
      }
    ) {
      latitude
      longitude
      state
    }
  }
`;

export default async (requester_id: number): Promise<Individual[]> =>
  await fetchSolidarityUsers({
    query: FETCH_INDIVIDUAL,
    variables: {
      requester_id
    }
  });

export { default as forwardPublicService } from "./forwardPublicService";
export { default as updateIndividualTicket } from "./updateIndividualTicket";
export { default as fetchIndividual } from ".";
