import dotenv from "dotenv";
import { install } from "source-map-support";
import apmNode from "elastic-apm-node";

install();
const apm = apmNode.start({
  captureBody: 'all'
});
dotenv.config();

import Router from "./Router";
import checkConfig from "./checkConfig";
import log from "./dbg";

try {
  checkConfig();
  const { PORT } = process.env;
  Router(apm).listen(Number(PORT), "0.0.0.0", () => {
    log.info(`Server listen on PORT ${PORT}`);
  });
} catch (e) {
  log.error(e);
  apm.captureError(e as string);
}
