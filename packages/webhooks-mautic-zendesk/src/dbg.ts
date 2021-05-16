import pino from "pino";
import ecsFormat from "@elastic/ecs-pino-format";

const log = pino({ ...ecsFormat({ convertReqRes: true }) });

export default log;
