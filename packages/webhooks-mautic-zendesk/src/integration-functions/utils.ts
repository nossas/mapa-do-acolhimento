import debug, { Debugger } from "debug";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("../../package.json");

export const useDebug = (name: string): Debugger => {
  return debug(`${pkg.name}:${name}`);
};
