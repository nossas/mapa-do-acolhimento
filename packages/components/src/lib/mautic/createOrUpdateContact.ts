import axios from "axios";
import { getToken } from "../../utils";
import { Contact, FullContact } from "../../types";
import logger from "./childLogger";

const log = logger.child({ module: "createOrUpdateContact" });

/**
 * Creates or updates a Mautic Contact based on the params id and body
 */
export default async (
  id = 0,
  body: Contact
): Promise<{ contact: FullContact } | undefined> => {
  const {
    MAUTIC_API_URL,
    MAUTIC_USERNAME = "",
    MAUTIC_PASSWORD = ""
  } = process.env;

  const config = {
    headers: {
      Authorization: "Basic " + getToken(MAUTIC_USERNAME, MAUTIC_PASSWORD),
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.put(
      MAUTIC_API_URL + `/contacts/${id}/edit`,
      body,
      config
    );
    log.info("Successfully edited contact");
    return res && res.data;
  } catch (e) {
    log.error(e.response.data.errors);
    return undefined;
  }
};
