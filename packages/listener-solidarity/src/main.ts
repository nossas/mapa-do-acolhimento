import throng from "throng";
import apm from "elastic-apm-node";
import { subscriptionFormEntries } from "./graphql/subscriptions";
import widgets from "./form_entries_mapping";
import logger from "./logger";

const log = logger.child({ module: "main" });

const {
  ELASTIC_APM_SECRET_TOKEN: secretToken,
  ELASTIC_APM_SERVER_URL: serverUrl,
  ELASTIC_APM_SERVICE_NAME: serviceName
} = process.env;

throng({
  workers: 1,
  start: async (id: number) => {
    log.info(`Started worker ${id}`);

    try {
      if (secretToken && serverUrl && serviceName) {
        apm.start({
          secretToken,
          serverUrl,
          serviceName
        });
      }

      log.info("Fetching solidarity users...");
      log.info(
        "Call subscriptions to form_entries... %s",
        widgets.map(w => w.id)
      );
      await subscriptionFormEntries(widgets);
    } catch (err) {
      log.error("throng err: %s", err);
    }

    process.on("SIGTERM", function() {
      log.fatal(`Worker ${id} exiting`);
      log.info("Cleanup here");
      process.exit();
    });
  }
});
