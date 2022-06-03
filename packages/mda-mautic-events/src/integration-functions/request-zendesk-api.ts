import urljoin from "url-join";
import axios from "axios";

const requestZendeskApi: any = async <T>(
  method: "POST" | "PUT" | "GET" = "POST",
  path: string,
  data?: unknown
) => {

  if(!process.env.ZENDESK_API_URL || !process.env.ZENDESK_API_USER || !process.env.ZENDESK_API_TOKEN){
    throw new Error(`zendesk API information is not valid`);
  }

  const endpoint = urljoin(process.env.ZENDESK_API_URL!, path);
  const auth = {
    username: process.env.ZENDESK_API_USER,
    password: process.env.ZENDESK_API_TOKEN
  };
  switch (method) {
    case "POST":
      return await axios.post<T>(endpoint, data, { auth });
    case "GET":
      return await axios.get<T>(endpoint, { auth });
    case "PUT":
      return await axios.put<T>(endpoint, data, { auth });
    default:
      throw new Error(`method ${method} not is valid`);
  }
};

export default requestZendeskApi;
