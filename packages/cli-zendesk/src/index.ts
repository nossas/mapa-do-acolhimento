import dotenv from "dotenv";

dotenv.config();

const {
  ELASTIC_APM_SECRET_TOKEN: secretToken,
  ELASTIC_APM_SERVER_URL: serverUrl,
  ELASTIC_APM_SERVICE_NAME: serviceName
} = process.env;

import apm from "elastic-apm-node";
import { install } from "source-map-support";
import commander from "commander";
import signale from "signale";
import checkConfig from "./checkConfig";
import dbg from "./dbg";
import App from "./App";

install();

const program = new commander.Command();
program.option(
  "-m, --mode <mode>",
  'Required. Selects the operation mode. It can be "ticket" or "user"'
);

const init = async () => {
  try {
    if (secretToken && serverUrl && serviceName) {
      apm.start({
        secretToken,
        serverUrl,
        serviceName
      });
    }
    checkConfig();

    program.parse(process.argv);
    if (program.mode === "ticket") {
      signale.time("duration");
      await App.ticket();
      signale.timeEnd("duration");
    } else if (program.mode === "user") {
      signale.time("duration");
      await App.user();
      signale.timeEnd("duration");
    } else if (program.mode === undefined) {
      signale.fatal("operation mode is required");
    } else {
      signale.fatal(`'${program.mode}' is not a valid operation mode`);
    }
  } catch (e) {
    dbg.error(e);
  }
};

init();
