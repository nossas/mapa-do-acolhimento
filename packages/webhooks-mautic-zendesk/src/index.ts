import dotenv from "dotenv";

dotenv.config();

import { install } from "source-map-support";
import Server from "./Server";
import { apmAgent } from "./dbg";

install();

const app = new Server(apmAgent);
app.start();
