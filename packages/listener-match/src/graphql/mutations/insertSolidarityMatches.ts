import gql from "graphql-tag";
import * as yup from "yup";
import { client as GraphQLAPI } from "../";
import dbg from "../../dbg";
import { IndividualTicket, Volunteer, MatchTicket } from "../../types";

const log = dbg.extend("insertSolidaritymatches");

const CREATE_MATCH_TICKET_MUTATION = gql`
  mutation createMatchTicket($match: solidarity_matches_insert_input!) {
    insert_solidarity_matches(
      object: $match
      on_conflict: {
        constraint: solidarity_matches_individuals_ticket_id_volunteers_ticket__key
        update_columns: [
          community_id
          created_at
          updated_at
          individuals_user_id
          volunteers_user_id
          volunteers_ticket_id
          status
        ]
      }
    ) {
      affected_rows
    }
  }
`;

const schema = yup.object().shape({
  individuals_ticket_id: yup.number().required(),
  volunteers_ticket_id: yup.number().required(),
  individuals_user_id: yup.number().required(),
  volunteers_user_id: yup.number().required(),
  community_id: yup.number().required(),
  status: yup.string().required()
});

export default async (
  individual: IndividualTicket,
  volunteer: Volunteer & { ticket_id: number }
) => {
  log(
    `Saving match ticket for individual '${individual.requester_id}' and volunteer '${volunteer.user_id}' in Hasura...`
  );
  const match: MatchTicket = {
    individuals_ticket_id: individual.ticket_id,
    volunteers_ticket_id: volunteer.ticket_id,
    individuals_user_id: individual.requester_id,
    volunteers_user_id: volunteer.user_id,
    community_id: Number(process.env.COMMUNITY_ID),
    status: "encaminhamento__realizado"
  };
  try {
    const validatedTicket = await schema.validate(match, {
      stripUnknown: true
    });
    log(validatedTicket);
    const res = await GraphQLAPI.mutate({
      mutation: CREATE_MATCH_TICKET_MUTATION,
      variables: { match: validatedTicket }
    });

    if (res && res.data && res.data.errors) {
      log("failed on insert solidarity matches: ".red, res.data.errors);
      return undefined;
    }

    const {
      data: { insert_solidarity_matches_one }
    } = res;

    log({ returning: insert_solidarity_matches_one });

    return (
      insert_solidarity_matches_one &&
      insert_solidarity_matches_one.affected_rows
    );
  } catch (err) {
    log("failed on insert solidarity matches: ".red, err);
    return undefined;
  }
};
