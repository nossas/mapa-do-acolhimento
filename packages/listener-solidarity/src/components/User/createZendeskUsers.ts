import client from "../../zendesk";
import { User, ZendeskUserCreationResponse } from "../../types";
import logger from "../../logger";
import { isProduction } from "../../utils";

const log = logger.child({ labels: { process: "createZendeskUsers" } });

export default async (
  users: User[]
): Promise<ZendeskUserCreationResponse[] | undefined> => {
  log.info(`Entering createZendeskUser`);

  let zendeskUsers = users;
  const shouldRemoveExternalId = !isProduction();
  if (shouldRemoveExternalId) {
    zendeskUsers = users.map(({ external_id: _, ...user }) => user);
  }

  return new Promise(resolve => {
    return client.users.createOrUpdateMany(
      { users: zendeskUsers },
      (err, _req, result) => {
        if (err) {
          log.error(err);
          return resolve(undefined);
        }
        return client.jobstatuses.watch(
          (result as { job_status: { id: number } })["job_status"].id,
          5000,
          0,
          (err, _req, result) => {
            if (err) {
              log.error(err);
              return resolve(undefined);
            }
            const results = result as {
              job_status: { status: string; results };
            };

            if (
              results &&
              results["job_status"] &&
              results["job_status"]["status"] === "completed"
            ) {
              return resolve(results["job_status"]["results"]);
            }
          }
        );
      }
    );
  });
};
