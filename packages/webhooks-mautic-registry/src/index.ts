import dotenv from "dotenv";
import apm from "elastic-apm-node";
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

const app = new Server();
app.start();
app.listen();
