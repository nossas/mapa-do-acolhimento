import ZendeskBase from "./ZendeskBase";
import User from "../interfaces/User";

interface Response {
  data: {
    user: User;
  };
}

const getUser = async (id: number): Promise<Response> =>
  await ZendeskBase.get(`users/${id}`);

export default getUser;
