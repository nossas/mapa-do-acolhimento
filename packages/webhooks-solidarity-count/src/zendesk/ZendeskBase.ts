import urljoin from "url-join";
import axios from "axios";
import dbg from "./dbg";

const log = dbg.child({ labels: { process: "base" } });

const get = async (url: string, params?) => {
  const { ZENDESK_API_URL, ZENDESK_API_TOKEN, ZENDESK_API_USER } = process.env;
  const endpoint = urljoin(ZENDESK_API_URL, url);
  try {
    return await axios.get(endpoint, {
      auth: {
        username: ZENDESK_API_USER,
        password: ZENDESK_API_TOKEN
      },
      params
    });
  } catch (e) {
    log.error(e.response.data);
    return undefined;
  }
};

const put = async (url: string, data?) => {
  const { ZENDESK_API_URL, ZENDESK_API_TOKEN, ZENDESK_API_USER } = process.env;
  const endpoint = urljoin(ZENDESK_API_URL!, url);
  try {
    return await axios.put(endpoint, data, {
      auth: {
        username: ZENDESK_API_USER,
        password: ZENDESK_API_TOKEN
      }
    });
  } catch (e) {
    log.error(e);
    return undefined;
  }
};

export default { get, put };
