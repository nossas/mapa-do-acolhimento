import apmNode from "elastic-apm-node";
import throng from "throng";
const apm = apmNode.start({
  captureBody: 'all'
});

import { subscriptionFormEntries } from "./graphql/subscriptions";
import widgets from "./form_entries_mapping";
import logger from "./logger";

const log = logger.child({ module: "main" });

throng({
  workers: 1,
  start: async (id: number) => {
    log.info(`Started worker ${id}`);
    const transaction: any = apm.startTransaction("worker");

    try {
      log.info("Fetching solidarity users...");
      log.info(
        "Call subscriptions to form_entries... %s",
        widgets.map(w => w.id)
      );
      await subscriptionFormEntries(widgets, apm);
    } catch (err) {
      apm.captureError(err + "");

      transaction.result = 500;
      transaction.end();

      log.error("throng err: %s", err);
    }

    process.on("SIGTERM", function() {
      log.fatal(`Worker ${id} exiting`);
      log.info("Cleanup here");

      transaction.result = 503;
      transaction.end();

      process.exit();
    });
  }
});
