import throng from "throng";
import apm from "elastic-apm-node";
import { subscriptionSolidarityTickets } from "./graphql/subscriptions";
import dbg from "./dbg";

const log = dbg.child({ module: "main" });

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
      log.info("Fetching solidarity tickets for match...");
      await subscriptionSolidarityTickets();
    } catch (err) {
      log.error("throng err: ".red, err);
    }

    process.on("SIGTERM", function() {
      log.info(`Worker ${id} exiting`);
      log.info("Cleanup here");
      process.exit();
    });
  }
});
