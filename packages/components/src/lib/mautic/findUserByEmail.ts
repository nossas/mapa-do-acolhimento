import axios from "axios";
import { getToken } from "../../utils";
import { ContactSearchRes } from "../../types";
import log from "../../logger";

export default async (email: string): Promise<ContactSearchRes | undefined> => {
  const {
    MAUTIC_API_URL,
    MAUTIC_USERNAME = "",
    MAUTIC_PASSWORD = ""
  } = process.env;

  const config = {
    headers: {
      Authorization: "Basic " + getToken(MAUTIC_USERNAME, MAUTIC_PASSWORD)
    },
    params: {
      search: `email:${email}`
    }
  };

  try {
    const data = await axios.get(MAUTIC_API_URL + "/contacts", config);
    log.info("Successfully returned a contact");
    return data && data.data;
  } catch (e) {
    log.error(`${e.response.status}: ${e.response.statusText} %o`, e.config);
    return undefined;
  }
};
