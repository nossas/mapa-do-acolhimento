import apm from "elastic-apm-node";
import dotenv from "dotenv";

dotenv.config();

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
    environment: process.env.NODE_ENV,
    captureBody: "errors"
  });
}

import { install } from "source-map-support";
import Server from "./Server";

install();

const app = new Server(apmAgent);
app.start();
