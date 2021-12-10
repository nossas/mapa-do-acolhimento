import pino from "pino";
import ecsFormat from "@elastic/ecs-pino-format";

const logger = pino({
  ...ecsFormat({ convertReqRes: true }),
});

export default logger;
