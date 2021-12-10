import * as zendesk from "node-zendesk";

export default zendesk.createClient({
  username: process.env.ZENDESK_API_USER || "",
  token: process.env.ZENDESK_API_TOKEN || "",
  remoteUri: process.env.ZENDESK_API_URL || ""
});

export { default as createTicket } from "./createTicket";
export { default as updateTicket } from "./updateTicket";
