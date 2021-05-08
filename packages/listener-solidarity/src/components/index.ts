import Bottleneck from "bottleneck";
import { getGeolocation } from "bonde-core-tools";
import { userToContact } from "components/dist";
import { makeBatchRequests, composeUsers } from "./User";
import createZendeskTickets, { composeTickets } from "./Ticket";
import { insertSolidarityUsers, updateFormEntries } from "../graphql/mutations";
import { handleUserError, removeDuplicatesBy } from "../utils";
import { Widget, FormEntry, User, FormEntriesResponse } from "../types";
import logger from "../logger";

const log = logger.child({ labels: { process: "handleIntegration" } });

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 1000
});

let cache: FormEntry[] = [];

export const handleIntegration = (widgets: Widget[]) => async (
  response: FormEntriesResponse
) => {
  let syncronizedForms: number[] = [];
  log.info(`${new Date()}: Receiving data on subscription GraphQL API...`);

  const {
    data: { form_entries: entries }
  } = response;

  cache = cache
    .filter(c => !entries.map(e => e.id).includes(c.id))
    .concat(entries);

  if (cache.length > 0) {
    const usersToRegister = await composeUsers(cache, widgets, getGeolocation);
    // log(usersToRegister);

    // Batch insert individuals
    // Create users in Zendesk
    const userBatches = await makeBatchRequests(usersToRegister);
    if (!userBatches) {
      log.error(
        "Zendesk user creation failed on these form entries: %o",
        cache
      );
      return undefined;
    }

    if (
      userBatches.find(
        r =>
          r.error &&
          (r.error.match(/error/i) || r.error.match(/permissiondenied/i))
      ) ||
      userBatches.length < 1 ||
      usersToRegister.length < 1
    ) {
      log.error(
        "Zendesk user creation results with error: %o",
        userBatches.filter(u => !!u.error)
      );
      handleUserError(usersToRegister);
      return undefined;
    }

    log.info("Preparing zendesk users to be saved in Hasura");
    const hasuraUsers = userBatches
      .filter(r => !(r.error && r.error.match(/permissiondenied/i)))
      .map(r => {
        const user = usersToRegister.find(u => u.external_id === r.external_id);
        return {
          ...user,
          ...((user && user.user_fields) || {}),
          community_id: Number(process.env.COMMUNITY_ID),
          user_id: r.id
        };
      });

    const withoutDuplicates = removeDuplicatesBy(x => x.user_id, hasuraUsers);

    // Create users tickets if they're not "desabilitada"
    // approved MSRs and not a volunteer
    const removeDesabilitadedUsers = (withoutDuplicates as User[]).filter(
      user => user["condition"] && user["condition"] !== "desabilitada"
    );

    if (removeDesabilitadedUsers.length > 0) {
      const tickets = await composeTickets(removeDesabilitadedUsers);
      // log(JSON.stringify(tickets, null, 2));
      await limiter.schedule(() => createZendeskTickets(tickets));
    }

    // Save users in Hasura
    const inserted = await insertSolidarityUsers(withoutDuplicates as never);
    if (!inserted) handleUserError(withoutDuplicates);

    // Save users in Mautic
    await userToContact(withoutDuplicates);

    // Batch update syncronized forms
    syncronizedForms = [
      ...syncronizedForms,
      ...(withoutDuplicates as User[])
        .filter(i => !!i.external_id)
        .map(i => Number(i.external_id))
    ];
    const updateEntries = await updateFormEntries(syncronizedForms);
    if (!updateEntries) {
      log.error(
        "Couldn't update form entries with already syncronized forms: %o",
        syncronizedForms
      );
      return undefined;
    }
    log.info({ syncronizedForms });
    log.info("User integration is done.");
    return (cache = []);
  } else {
    log.info("No items for integration.");
  }
};

export default handleIntegration;
