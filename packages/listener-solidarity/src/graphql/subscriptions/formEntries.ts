import gql from "graphql-tag";
import { client as GraphQLAPI } from "..";
import { handleIntegration } from "../../components";
import { Widget } from "../../types";
import logger from "../../logger";

const log = logger.child({ labels: { process: "subscriptionFormEntries" } });

const FORM_ENTRIES_SUBSCRIPTION = gql`
  subscription pipeline_form_entries($widgets: [Int!], $community_id: Int!) {
    form_entries(
      where: {
        widget_id: { _in: $widgets }
        rede_syncronized: { _eq: false }
        cached_community_id: { _eq: $community_id }
      }
      order_by: { id: asc }
    ) {
      id
      fields
      cached_community_id
      widget_id
      created_at
    }
  }
`;

const error = err => {
  log.error("Receiving error on subscription GraphQL API: %o", err);
};

export default async (widgets: Widget[]): Promise<unknown> => {
  try {
    const observable = GraphQLAPI.subscribe({
      query: FORM_ENTRIES_SUBSCRIPTION,
      variables: {
        widgets: widgets.map(w => w.id),
        community_id: Number(process.env.COMMUNITY_ID)
      },
      fetchPolicy: "network-only"
    }).subscribe({ next: handleIntegration(widgets), error });

    return observable;
  } catch (err) {
    log.error("failed on subscription: %o", err);
    return undefined;
  }
};
