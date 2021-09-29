import pino from "pino";
import apm from "elastic-apm-node";
import ecsFormat from "@elastic/ecs-pino-format";

const log = pino({ ...ecsFormat({ convertReqRes: true }) });

const {
  ELASTIC_APM_SECRET_TOKEN: secretToken,
  ELASTIC_APM_SERVER_URL: serverUrl,
  ELASTIC_APM_SERVICE_NAME: serviceName
} = process.env;

export let apmAgent;

if (secretToken && serverUrl && serviceName) {
  apmAgent = apm.start({
    secretToken,
    serverUrl,
    serviceName,
    environment: process.env.NODE_ENV,
    captureBody: "errors"
  });
}

export default log;
