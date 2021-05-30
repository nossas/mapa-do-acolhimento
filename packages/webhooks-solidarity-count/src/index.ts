import dotenv from "dotenv";
import { install } from "source-map-support";
import apm from "elastic-apm-node";

install();

dotenv.config();

const {
  ELASTIC_APM_SECRET_TOKEN: secretToken,
  ELASTIC_APM_SERVER_URL: serverUrl,
  ELASTIC_APM_SERVICE_NAME: serviceName,
  PORT
} = process.env;

let apmAgent;

if (secretToken && serverUrl && serviceName) {
  apmAgent = apm.start({
    secretToken,
    serverUrl,
    serviceName,
    captureBody: "errors",
    environment: process.env.NODE_ENV
  });
}

import Router from "./Router";
import checkConfig from "./checkConfig";
import log from "./dbg";

try {
  checkConfig();
  Router(apmAgent).listen(Number(PORT), "0.0.0.0", () => {
    log.info(`Server listen on PORT ${PORT}`);
  });
} catch (e) {
  log.error(e);
  apmAgent.captureError(e);
}
