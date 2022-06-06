import apmNode from "elastic-apm-node";

const apm = apmNode.start({
  captureBody: "all"
});

import { subscriptionFormEntries } from "./graphql/subscriptions";
import widgets from "./form_entries_mapping";
import logger from "./logger";

const log = logger.child({ module: "main" });

const start = async () => {
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

    process.on("SIGTERM", function () {
      log.fatal(`Exiting`);
      log.info("Cleanup here");

      transaction.result = 503;
      transaction.end();

      process.exit();
    });
};

start();
