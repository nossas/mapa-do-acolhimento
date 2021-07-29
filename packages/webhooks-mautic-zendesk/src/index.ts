import dotenv from "dotenv";

dotenv.config();

import { install } from "source-map-support";
import Server from "./Server";

install();

const app = new Server();
app.start();
