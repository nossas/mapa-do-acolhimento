import apm from "elastic-apm-node";

const {
  ELASTIC_APM_SECRET_TOKEN: secretToken,
  ELASTIC_APM_SERVER_URL: serverUrl,
  ELASTIC_APM_SERVICE_NAME: serviceName
} = process.env;

let apmAgent;
if (secretToken && serverUrl && serviceName) {
  apmAgent = apm.start({
    secretToken,
    serverUrl,
    serviceName,
    environment: process.env.NODE_ENV
  });
}

import throng from "throng";
import { subscriptionFormEntries } from "./graphql/subscriptions";
import widgets from "./form_entries_mapping";
import logger from "./logger";

const log = logger.child({ module: "main" });

throng({
  workers: 1,
  start: async (id: number) => {
    log.info(`Started worker ${id}`);
    const transaction = apmAgent.startTransaction("worker");

    try {
      log.info("Fetching solidarity users...");
      log.info(
        "Call subscriptions to form_entries... %s",
        widgets.map(w => w.id)
      );
      await subscriptionFormEntries(widgets, apmAgent);
    } catch (err) {
      apmAgent.captureError(err);

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
