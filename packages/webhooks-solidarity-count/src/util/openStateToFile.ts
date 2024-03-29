import fs from "fs";
import { promisify } from "util";
import path from "path";
import dbg from "./dbg";

const readFile = promisify(fs.readFile);
const log = dbg.child({ labels: { process: "openStateFile" } });

const openStateFile = async (filename: string) => {
  try {
    const buffer = await readFile(
      path.resolve("src/__tests__/data", `${filename}.json`)
    );
    const state = buffer.toString();
    return JSON.parse(state);
  } catch (e) {
    log.error(e + "");
    return null;
  }
};

export default openStateFile;
