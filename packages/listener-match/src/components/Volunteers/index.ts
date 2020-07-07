import gql from "graphql-tag";
import {
  fetchSolidarityUsers,
  fetchSolidarityMatches
} from "../../graphql/queries";
import { zendeskOrganizations } from "../../utils";
import { Volunteer, MatchTickets } from "../../types";
import dbg from "../../dbg";

const log = dbg.extend("fetchVolunteersAvailable");

const FETCH_AVAILABLE_VOLUNTEERS = gql`
  query fetch_available_volunteers($individual_id: bigint!) {
    solidarity_users(
      where: {
        condition: { _eq: "disponivel" }
        longitude: { _is_null: false }
        latitude: { _is_null: false }
        _or: [{ phone: { _is_null: false } }, { whatsapp: { _is_null: false } }]
        _and: [
          { organization_id: { _neq: $individual_id } }
          { organization_id: { _is_null: false } }
          { name: { _is_null: false } }
          { registration_number: { _is_null: false } }
        ]
      }
    ) {
      user_id
      email
      name
      organization_id
      latitude
      longitude
      whatsapp
      phone
      registration_number
      id
      atendimentos_em_andamento_calculado_
    }
  }
`;

const PENDING_MATCH_TICKETS = gql`
  query($last_month: timestamp!) {
    solidarity_matches(
      order_by: { created_at: desc }
      where: {
        created_at: { _gte: $last_month }
        status: { _eq: "encaminhamento__realizado" }
      }
    ) {
      volunteers_user_id
      volunteers_ticket_id
      id
    }
  }
`;

export default async () => {
  log("Fetching available volunteers");
  const volunteersAvailable: Volunteer[] = await fetchSolidarityUsers({
    query: FETCH_AVAILABLE_VOLUNTEERS,
    variables: {
      individual_id: zendeskOrganizations["individual"]
    }
  });

  // log(volunteersAvailable);

  const today = new Date();
  // get last month and format
  const last_month = new Date().setDate(today.getDate() - 30);
  // format last_month timestamp
  const timestamp = new Date(last_month).toISOString();

  const pendingTickets: MatchTickets[] = await fetchSolidarityMatches({
    query: PENDING_MATCH_TICKETS,
    variables: {
      last_month: timestamp
    }
  });

  // only approved volunteers are available?
  return volunteersAvailable
    .map(user => {
      const {
        // disponibilidade_de_atendimentos,
        atendimentos_em_andamento_calculado_,
        user_id
      } = user;

      // let formatAvailability;
      // if (typeof Number(disponibilidade_de_atendimentos) === "number") {
      //   formatAvailability = Number(disponibilidade_de_atendimentos);
      // } else if (disponibilidade_de_atendimentos === "5_ou_mais") {
      //   formatAvailability = 5;
      // } else {
      //   formatAvailability = 1;
      // }

      const countForwardings = pendingTickets.filter(
        ticket => ticket.volunteers_user_id === user_id
      ).length;

      const availability =
        1 - (countForwardings + atendimentos_em_andamento_calculado_);

      return {
        ...user,
        pending: countForwardings,
        availability
      };
    })
    .filter(user => user.availability > 0);
};

export { default as fetchVolunteersAvailable } from ".";
export { default as getClosestVolunteer } from "./closestVolunteer";
export { default as createVolunteerTicket } from "./createVolunteerTicket";
