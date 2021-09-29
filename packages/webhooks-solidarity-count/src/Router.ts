import Express from "express";
import * as yup from "yup";
import dbg from "./dbg";
import App from "./App";

const log = dbg.child({ module: "router" });

const getTicketIdFromRequest = async (req: Express.Request) => {
  const {
    ticket: { id }
  } = await yup
    .object({
      ticket: yup
        .object({
          id: yup.string().required()
        })
        .required()
    })
    .required()
    .validate(req.body);

  return id;
};

const Router = (apm): Express.Express =>
  Express()
    .use(Express.json())
    .post("/", async (req, res) => {
      try {
        const id = await getTicketIdFromRequest(req);
        log.info(`incoming request with id '${id}'`);
        apm.setCustomContext({
          ticketId: id
        });
        const response = await App(id, apm);
        return res.status(200).json(response);
      } catch (e: any) {
        log.error(e.msg);
        apm.captureError(new Error(e.msg));
        return res.status(e.status).json(e.msg);
      }
    });

export default Router;
