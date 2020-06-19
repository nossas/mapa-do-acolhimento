import gql from "graphql-tag";
import { client as GraphQLAPI } from "../";
import dbg from "../../dbg";

const log = dbg.extend("insertSolidarityTickets");

const CREATE_TICKETS_MUTATION = gql`
  mutation createSolidarityTicket($ticket: solidarity_tickets_insert_input!) {
    insert_solidarity_tickets_one(
      object: $ticket
      on_conflict: {
        constraint: solidarity_tickets_ticket_id_key
        update_columns: [
          community_id
          ticket_id
          assignee_id
          custom_fields
          description
          organization_id
          requester_id
          status
          subject
          submitter_id
          tags
          updated_at
          external_id
          link_match
          data_encaminhamento
          nome_msr
          nome_voluntaria
          status_acolhimento
        ]
      }
    ) {
      ticket_id
    }
  }
`;

export default async (ticket: {
  ticket_id: number;
}): Promise<number | undefined> => {
  log({ ticket });
  log(`Saving ticket '${ticket.ticket_id}' in Hasura...`);
  try {
    // log(validatedTicket);
    const res = await GraphQLAPI.mutate({
      mutation: CREATE_TICKETS_MUTATION,
      variables: { ticket }
    });

    if (res && res.data && res.data.errors) {
      log("failed on insert solidarity tickets: ".red, res.data.errors);
      return undefined;
    }

    const {
      data: { insert_solidarity_tickets_one }
    } = res;

    // log({ returning: insert_solidarity_tickets_one });

    return (
      insert_solidarity_tickets_one && insert_solidarity_tickets_one.ticket_id
    );
  } catch (err) {
    log("failed on insert solidarity tickets: ".red, err);
    return undefined;
  }
};
