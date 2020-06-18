import dbg from "../dbg";

const log = dbg.extend("match");

export const handleMatch = () => async (response: any) => {
  log(`${new Date()}: \nReceiving data on subscription GraphQL API...`);
  log({ response: response.data.solidarity_tickets });
};

export default handleMatch;
