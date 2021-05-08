import Router from "./Router";
import dbg from "./dbg";

const log = dbg.child({ module: "server" });

const Server = () => {
  const { PORT } = process.env;
  return Router().listen(Number(PORT), "0.0.0.0", () => {
    log.info(`Server listen on PORT ${PORT}`);
  });
};

export default Server;
