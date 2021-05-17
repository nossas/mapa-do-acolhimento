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

export const handleIntegration = (widgets: Widget[], apm) => async (
  response: FormEntriesResponse
) => {
  const transaction = apm.startTransaction("integration");

  let syncronizedForms: number[] = [];
  log.info(`Receiving data on subscription GraphQL API...`);

  const {
    data: { form_entries: entries }
  } = response;

  cache = cache
    .filter(c => !entries.map(e => e.id).includes(c.id))
    .concat(entries);

  if (cache.length > 0) {
    apm.setCustomContext({
      entries: cache
    });

    const usersToRegister = await composeUsers(cache, widgets, getGeolocation);

    // Batch insert individuals
    // Create users in Zendesk
    const userBatches = await makeBatchRequests(usersToRegister);
    if (!userBatches) {
      log.error(
        "Zendesk user creation failed on these form entries: %o",
        cache
      );

      apm.setCustomContext({
        usersWithError: usersToRegister
      });

      transaction.result = 500;
      transaction.end();

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
      const usersWithError = userBatches.filter(u => !!u.error);

      log.error("Zendesk user creation results with error: %o", usersWithError);
      handleUserError(usersWithError);

      apm.setCustomContext({
        usersWithError
      });
      apm.captureError(userBatches);

      transaction.result = 500;
      transaction.end();

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
      const tickets = composeTickets(removeDesabilitadedUsers);
      await limiter.schedule(() => createZendeskTickets(tickets));
    }

    // Save users in Hasura
    insertSolidarityUsers(withoutDuplicates as never).catch(e => {
      handleUserError(withoutDuplicates);

      apm.captureError(e);
    });

    // Save users in Mautic
    userToContact(withoutDuplicates).catch(e => {
      apm.captureError(e);
    });

    // Batch update syncronized forms
    syncronizedForms = [
      ...syncronizedForms,
      ...(withoutDuplicates as User[])
        .filter(i => !!i.external_id)
        .map(i => Number(i.external_id))
    ];

    return updateFormEntries(syncronizedForms)
      .then(entries => {
        log.info({ entries });
        log.info("User integration is done.");

        transaction.result = 200;
        transaction.end();

        return (cache = []);
      })
      .catch(e => {
        log.error(
          "Couldn't update form entries with already syncronized forms: %o",
          syncronizedForms
        );

        apm.captureError(e);

        transaction.result = 500;
        transaction.end();

        return undefined;
      });
  } else {
    transaction.result = 200;
    transaction.end();
    log.info("No items for integration.");
  }
};

export default handleIntegration;
