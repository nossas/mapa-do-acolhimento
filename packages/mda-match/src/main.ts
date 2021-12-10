import apmNode from "elastic-apm-node";
import throng from "throng";
import { subscriptionSolidarityTickets } from "./graphql/subscriptions";
import dbg from "./dbg";
apmNode.start({
  captureBody: 'all'
});

const log = dbg.child({ module: "main" });

export default throng({
  workers: 1,
  start: async (id: number) => {
    log.info(`Started worker ${id}`);

    try {
      log.info("Fetching solidarity tickets for match...");
      await subscriptionSolidarityTickets();
    } catch (err) {
      log.error("throng err: ".red, err);
    }

    process.on("SIGTERM", function () {
      log.info(`Worker ${id} exiting`);
      log.info("Cleanup here");
      process.exit();
    });
  }
});
