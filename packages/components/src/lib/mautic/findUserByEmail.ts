import axios, { AxiosError } from "axios";
import { getToken } from "../../utils";
import { ContactSearchRes } from "../../types";
import logger from "./childLogger";

const log = logger.child({ module: "findUserByEmail" });

/**
 * Tries to find a Mautic contact based on the email passed in the param
 */
export default async (email: string): Promise<ContactSearchRes | undefined> => {
  const {
    MAUTIC_API_URL,
    MAUTIC_USERNAME = "",
    MAUTIC_PASSWORD = "",
  } = process.env;

  const config = {
    headers: {
      Authorization: "Basic " + getToken(MAUTIC_USERNAME, MAUTIC_PASSWORD),
    },
    params: {
      search: `email:${email}`,
    },
  };

  try {
    const data = await axios.get(MAUTIC_API_URL + "/contacts", config);
    log.info("Successfully returned a contact");
    return data && data.data;
  } catch (e) {
    const error = e as AxiosError;
    log.error(
      `${error?.response?.status}: ${error?.response?.statusText} %o`,
      error?.config
    );
    return undefined;
  }
};
