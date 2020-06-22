import gql from "graphql-tag";
import { client as GraphQLAPI } from "../";
import dbg from "../../dbg";

const log = dbg.extend("updateSolidarityTickets");

const UPDATING_TICKETS_MUTATION = gql`
  mutation updateSolidarityTickets(
    $ticket: solidarity_tickets_set_input
    $ids: [bigint!]
  ) {
    update_solidarity_tickets(
      _set: $ticket
      where: { ticket_id: { _in: $ids } }
    ) {
      returning {
        ticket_id
        status_acolhimento
      }
    }
  }
`;

export default async (
  ticket,
  ids: number[]
): Promise<Array<{ ticket_id: number }> | undefined> => {
  log(`Updating tickets '${ids}' in Hasura...`);
  try {
    const res = await GraphQLAPI.mutate({
      mutation: UPDATING_TICKETS_MUTATION,
      variables: { ticket, ids }
    });

    if (res && res.data && res.data.errors) {
      log("failed on update solidarity tickets: ".red, res.data.errors);
      return undefined;
    }

    const {
      data: { update_solidarity_tickets }
    } = res;

    return update_solidarity_tickets && update_solidarity_tickets.returning;
  } catch (err) {
    log("failed on update solidarity tickets: ".red, err);
    return undefined;
  }
};
