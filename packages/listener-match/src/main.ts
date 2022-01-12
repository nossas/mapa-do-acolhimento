import apmNode from "elastic-apm-node";
import { subscriptionSolidarityTickets } from "./graphql/subscriptions";
import dbg from "./dbg";
apmNode.start({
  captureBody: "all"
});

const log = dbg.extend("main");

const start = async () => {
  try {
    log("Fetching solidarity tickets for match...");
    await subscriptionSolidarityTickets();
  } catch (err) {
    log("throng err: ".red, err);
  }

  process.on("SIGTERM", function() {
    log(`Exiting`);
    log("Cleanup here");
    process.exit();
  });
};

start();
