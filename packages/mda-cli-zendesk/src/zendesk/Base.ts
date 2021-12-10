import urljoin from "url-join";
import axios from "axios";
import { Debugger } from "debug";

const get: any = async <T>(url: string, log: Debugger, params?: unknown) => {
  const {
    ZENDESK_API_URL = "",
    ZENDESK_API_TOKEN = "",
    ZENDESK_API_USER = ""
  } = process.env;
  const endpoint = urljoin(ZENDESK_API_URL, url);
  try {
    return await axios.get<T>(endpoint, {
      auth: {
        username: ZENDESK_API_USER,
        password: ZENDESK_API_TOKEN
      },
      params
    });
  } catch (e: any) {
    return log(e.response.data);
  }
};

const put: any = async <T>(url: string, log: Debugger, data?: unknown) => {
  const {
    ZENDESK_API_URL = "",
    ZENDESK_API_TOKEN = "",
    ZENDESK_API_USER = ""
  } = process.env;
  const endpoint = urljoin(ZENDESK_API_URL!, url);
  try {
    return await axios.put<T>(endpoint, data, {
      auth: {
        username: ZENDESK_API_USER,
        password: ZENDESK_API_TOKEN
      }
    });
  } catch (e: any) {
    return log(e);
  }
};

export default { get, put };
