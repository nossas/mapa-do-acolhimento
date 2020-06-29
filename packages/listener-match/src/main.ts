import throng from "throng";
import { subscriptionSolidarityTickets } from "./graphql/subscriptions";
import dbg from "./dbg";

const log = dbg.extend("main");

throng({
  workers: 1,
  start: async (id: number) => {
    log(`Started worker ${id}`);

    try {
      log("Fetching solidarity tickets for match...");
      await subscriptionSolidarityTickets();
    } catch (err) {
      log("throng err: ".red, err);
    }

    process.on("SIGTERM", function() {
      log(`Worker ${id} exiting`);
      log("Cleanup here");
      process.exit();
    });
  },
});
