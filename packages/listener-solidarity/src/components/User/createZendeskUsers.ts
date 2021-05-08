import client from "../../zendesk";
import { User, ZendeskUserCreationResponse } from "../../types";
import logger from "../../logger";

const log = logger.child({ labels: { process: "createZendeskUsers" } });

export default async (
  users: User[]
): Promise<ZendeskUserCreationResponse[] | undefined> => {
  log.info(`${new Date()}: \nEntering createZendeskUser`);
  // ADD YUP VALIDATION
  return new Promise(resolve => {
    return client.users.createOrUpdateMany({ users }, (err, _req, result) => {
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
          const results = result as { job_status: { status: string; results } };
          // log(
          //   `Results from zendesk user creation ${JSON.stringify(
          //     result,
          //     null,
          //     2
          //   )}`
          // );
          if (
            results &&
            results["job_status"] &&
            results["job_status"]["status"] === "completed"
          ) {
            return resolve(results["job_status"]["results"]);
          }
        }
      );
    });
  });
};
