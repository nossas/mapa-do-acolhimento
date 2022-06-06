import { User, ZendeskUserCreationResponse } from "../../types";
import logger from "../../logger";
import createOrUpdateMany from "./createOrUpdateMany";

const log = logger.child({ labels: { process: "createZendeskUsers" } });

export default async (
  users: User[]
): Promise<ZendeskUserCreationResponse[] | undefined> => {
  log.info(`Entering createZendeskUser`);
  // ADD YUP VALIDATION
  return new Promise(resolve => {

    createOrUpdateMany(users)
    .then((results)=>{
      if (
        results &&
        results["job_status"] &&
        results["job_status"]["status"] === "completed"
      ) {
        return resolve(results["job_status"]["results"]);
      }
    })
    .catch( (err) => {
      log.error(err);
      return resolve(undefined);
    });
  });
};
