import throng from "throng";
import { subscriptionFormEntries } from "./graphql/subscriptions";
import widgets from "./form_entries_mapping";
import logger from "./logger";

const log = logger.child({ module: "main" });

throng({
  workers: 1,
  start: async (id: number) => {
    log.info(`Started worker ${id}`);

    try {
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
