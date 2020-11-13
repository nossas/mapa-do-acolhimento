import gql from "graphql-tag";
import { client as GraphQLAPI } from "../../graphql";
import dbg from "../../dbg";

const log = dbg.extend("fetchVolunteersAvailable");

const VOLUNTEERS_FOR_MATCH = gql`
  query VolunteersForMatch(
    $recipientOrganizationId: bigint_comparison_exp!
    $lastMonth: timestamp_comparison_exp!
  ) {
    volunteers: solidarity_users(
      where: {
        condition: { _eq: "disponivel" }
        longitude: { _is_null: false }
        latitude: { _is_null: false }
        name: { _is_null: false }
        registration_number: { _is_null: false }
        atendimentos_em_andamento_calculado_: { _eq: 0 }
        state: { _neq: "int" }
        city: { _neq: "Internacional" }
        _or: [{ phone: { _is_null: false } }, { whatsapp: { _is_null: false } }]
        _and: [
          { organization_id: $recipientOrganizationId }
          { organization_id: { _is_null: false } }
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
    }
    pendingTickets: solidarity_matches(
      order_by: { created_at: desc }
      where: {
        created_at: $lastMonth
        status: { _eq: "encaminhamento__realizado" }
      }
    ) {
      volunteers_user_id
      volunteers_ticket_id
      id
    }
  }
`;

export default async (volunteerOrganizationId: number) => {
  log("Fetching available volunteers");
  const today = new Date();
  // get last month and format
  const last_month = new Date().setDate(today.getDate() - 30);
  // format last_month timestamp
  const timestamp = new Date(last_month).toISOString();

  try {
    const res = await GraphQLAPI.query({
      query: VOLUNTEERS_FOR_MATCH,
      variables: {
        recipientOrganizationId: { _eq: volunteerOrganizationId },
        lastMonth: { _gte: timestamp }
      }
    });

    if (res && res.data && res.data.errors) {
      log("failed to fetch available volunteers: ".red, res.data.errors);
      return undefined;
    }

    return res.data.volunteers
      .map(user => {
        const { user_id } = user;

        const countForwardings = res.data.pendingTickets.filter(
          ticket => ticket.volunteers_user_id === user_id
        ).length;

        const availability = 1 - (countForwardings || 0);

        return {
          ...user,
          pending: countForwardings,
          availability
        };
      })
      .filter(user => user.availability > 0);
  } catch (err) {
    log("failed to fetch available volunteers: ".red, err);
    return undefined;
  }
};

export { default as fetchVolunteersAvailable } from ".";
export { default as getClosestVolunteer } from "./closestVolunteer";
export { default as createVolunteerTicket } from "./createVolunteerTicket";
