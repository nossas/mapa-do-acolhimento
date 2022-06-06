import apmNode from "elastic-apm-node";
import { subscriptionSolidarityTickets } from "./graphql/subscriptions";
import dbg from "./dbg";
apmNode.start({
  captureBody: 'all'
});

const log = dbg.child({ module: "main" });

const start = async () => {

    log.info(`Started master`)

    try {
      log.info("Fetching solidarity tickets for match...");
      await subscriptionSolidarityTickets(apmNode);
    } catch (err) {
      log.error("err: ".red, err);
    }

    process.on("SIGTERM", function () {
     log.info(`Master exiting`);
      log.info("Cleanup here");
      process.exit();
    });
  };

start();