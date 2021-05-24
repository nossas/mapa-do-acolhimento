import dotenv from "dotenv";
import apm from "elastic-apm-node";
import Server from "./Server";

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
    serviceName
  });
}

try {
  const app = new Server();
  app.start();
  app.listen();
} catch (e) {
  apmAgent.captureError(e);
}
