import Express from "express";
import { Logger } from "pino";
import log from "./dbg";
import { mauticZendeskHandle } from "./resolvers/mauticZendesk";

class Server {
  private server = Express().use(Express.json());

  private dbg: Logger;

  constructor() {
    this.dbg = log;
  }

  start = () => {
    const { PORT } = process.env;

    this.server
      .get("/", async (_req, res) => {
        return res.status(200).json({ status: "success" });
      })
      .post("/", mauticZendeskHandle)
      .listen(Number(PORT), "0.0.0.0", () => {
        this.dbg.info(`Server listen on port ${PORT}`);
      });
  };
}

export default Server;
