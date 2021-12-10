import dotenv from "dotenv";
import apmNode from "elastic-apm-node";

dotenv.config();
const apm = apmNode.start({
    captureBody: 'all'
});

import { install } from "source-map-support";
import Server from "./Server";

install();

const app = new Server(apm);
app.start();
