import apm from "elastic-apm-node";
import dotenv from "dotenv";

dotenv.config();

const {
  ELASTIC_APM_SECRET_TOKEN: secretToken,
  ELASTIC_APM_SERVER_URL: serverUrl,
  ELASTIC_APM_SERVICE_NAME: serviceName
} = process.env;

if (secretToken && serverUrl && serviceName) {
  apm.start({
    secretToken,
    serverUrl,
    serviceName,
    environment: process.env.NODE_ENV
  });
}

import { install } from "source-map-support";
import Server from "./Server";

install();

const app = new Server();
app.start();
