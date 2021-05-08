import getUsersByPage from "./zendesk/getUsersByPage";
import User, { UserResponse } from "./interfaces/User";
import dbg from "./dbg";

const log = dbg.child({ labels: { process: "getAllUsers" } });

const getAllUsers = async () => {
  const users: User[] = [];
  let start_time = 1;
  let counter = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const actualPageUsers = await getUsersByPage(start_time);
    // eslint-disable-next-line no-await-in-loop
    await new Promise(r => setTimeout(r, 5000));
    if (actualPageUsers) {
      const {
        data: { count, end_time, users: requestedUsers }
      } = actualPageUsers as { data: UserResponse };
      start_time = end_time;
      requestedUsers.forEach(i => users.push(i));
      counter += count;
      log.info(`[${counter}], end_time: ${start_time}`);
      if (count < 1000) {
        break;
      }
    } else {
      // Posteriormente fazer tratamento para tentar a requisição novamente
    }
  }

  return users;
};

export default getAllUsers;
