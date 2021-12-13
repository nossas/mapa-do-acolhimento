import dotenv from "dotenv";
import apmNode from "elastic-apm-node";

dotenv.config();
const apm = apmNode.start({
    captureBody: 'all'
});

import Server from "./Server";

const app = new Server(apm);

export default app;
