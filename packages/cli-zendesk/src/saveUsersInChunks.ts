import R from "ramda";
import dbg from "./dbg";
import saveUsers from "./hasura/saveUsers";
import User from "./interfaces/User";

const log = dbg.child({ labels: { process: "saveUsersInChunks" } });

const saveUsersInChunks = async (users: User[]) => {
  const splitedUsers = R.splitEvery(1000, users) as User[][];
  let contador = 0;
  for await (const usersChunk of splitedUsers) {
    await saveUsers(usersChunk);
    contador += usersChunk.length;
    log.info(`[${contador}/${users.length}]`);
  }
};

export default saveUsersInChunks;
