import dotenv from "dotenv";
import apm from "elastic-apm-node";
import { install } from "source-map-support";
import Server from "./Server";

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
    serviceName
  });
}

install();

const app = new Server();
app.start();
