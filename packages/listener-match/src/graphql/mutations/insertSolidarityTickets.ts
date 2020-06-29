import gql from "graphql-tag";
import { client as GraphQLAPI } from "../";
import dbg from "../../dbg";

const log = dbg.extend("insertSolidarityTickets");

const SAVE_TICKETS_MUTATION = gql`
  mutation saveSolidarityTicket($tickets: [solidarity_tickets_insert_input!]!) {
    insert_solidarity_tickets(
      objects: $tickets
      on_conflict: {
        constraint: solidarity_tickets_ticket_id_key
        update_columns: [
          status
          assignee_id
          custom_fields
          tags
          updated_at
          link_match
          data_encaminhamento
          nome_voluntaria
          status_acolhimento
          match_syncronized
        ]
      }
    ) {
      returning {
        ticket_id
      }
    }
  }
`;

export default async (
  tickets: Array<{
    ticket_id: number;
  }>
): Promise<Array<{ ticket_id: number }> | undefined> => {
  try {
    const res = await GraphQLAPI.mutate({
      mutation: SAVE_TICKETS_MUTATION,
      variables: { tickets }
    });

    if (res && res.data && res.data.errors) {
      log("failed on insert solidarity tickets: ".red, res.data.errors);
      return undefined;
    }

    const {
      data: { insert_solidarity_tickets }
    } = res;

    return insert_solidarity_tickets && insert_solidarity_tickets.returning;
  } catch (err) {
    log("failed on insert solidarity tickets: ".red, err);
    return undefined;
  }
};
