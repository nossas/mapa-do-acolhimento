import fs from "fs";
import path from "path";
import { promisify } from "util";
import dbg from "./dbg";

const writeFile = promisify(fs.writeFile);

const log = dbg.child({ labels: { process: "saveStateToFile" } });

const saveStateToFile = async (
  filename: string,
  state: null | Record<string, string | number>
) => {
  try {
    await writeFile(
      path.resolve("src/__tests__/data", `${filename}.json`),
      JSON.stringify(state)
    );
    log.info(`saved to file '${filename}'.`);
  } catch (e) {
    log.error(e);
  }
};

export default saveStateToFile;
