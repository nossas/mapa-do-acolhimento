import Express from "express";
import * as yup from "yup";
import dbg from "./dbg";
import App from "./App";

const log = dbg.child({ module: "router" });

const JSONErrorHandler = (
  err: Error,
  _: Express.Request,
  res: Express.Response,
  __: Express.NextFunction
) => {
  if (err instanceof SyntaxError) {
    log.error(err);
    res.status(400).json("Falha de sintaxe, objeto JSON inválido!");
  }
};

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
    .use(JSONErrorHandler)
    .post("/", async (req, res) => {
      try {
        const id = await getTicketIdFromRequest(req);
        log.info(`incoming request with id '${id}'`);
        apm.setCustomContext({
          ticket_id: id
        });
        const response = await App(id);
        return res.status(200).json(response);
      } catch (e) {
        log.error(e);
        apm.captureError(e);
        return res.status(500).json(e);
      }
    });

export default Router;
