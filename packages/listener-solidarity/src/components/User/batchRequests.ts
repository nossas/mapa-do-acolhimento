import Bottleneck from "bottleneck";
import { createZendeskUsers } from "./";
import { User } from "../../types";
import logger from "../../logger";

const log = logger.child({ module: "batchRequests" });

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 1000
});

export default async (users: User[]) => {
  if (users.length < 1) return undefined;
  log.info("Performing batch requests to Zendesk...");
  let start = 0;
  const step = 50;
  const usersLength = users.length;
  for (start; start < usersLength; start += step) {
    // log({ start, step });
    const batch = users.slice(start, start + step - 1);
    return await limiter.schedule(() => createZendeskUsers(batch));
  }
};
