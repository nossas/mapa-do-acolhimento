import dbg from "../../dbg";

const log = dbg.extend("forwardPublicService");

export default async (id: number, state: string) => {
  log(id, state);
  return [id, state];
};
