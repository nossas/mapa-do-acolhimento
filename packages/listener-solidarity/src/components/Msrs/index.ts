import { User } from "../../types";
import { getRaceColor } from "../../utils";
import logger from "../../logger";
import axios, { AxiosError } from "axios";

type CreateMsrResponse = {
  data: {
    msrId: number;
  };
};

const log = logger.child({ labels: { process: "createMsrs" } });

function getMsrPayload(msr: User) {
  return {
    msrZendeskUserId: (msr.user_id as unknown) as bigint,
    email: msr.email,
    phone: msr.user_fields.whatsapp,
    firstName: msr.name,
    city: msr.user_fields.city,
    state: msr.user_fields.state,
    neighborhood: msr.user_fields.neighborhood,
    zipcode: msr.user_fields.cep ? msr.user_fields.cep : "not_found",
    color: getRaceColor(msr.user_fields.cor),
    status: "registered",
    gender: "not_found",
    dateOfBirth: null,
    hasDisability: null,
    acceptsOnlineSupport: true
  };
}

export async function createMsr(msrComposeUser: User) {
  try {
    log.info(`Start create msr register:${msrComposeUser.user_id}`);
    const msrPayload = getMsrPayload(msrComposeUser);
    const createMsrUrl = process.env["CREATE_MSR_URL"];
    const response = await axios.post<CreateMsrResponse>(
      createMsrUrl!,
      msrPayload
    );
    log.info(
      `Success creating register for this msr: ${JSON.stringify(response.data)}`
    );
    return response.data;
  } catch (e) {
    const axiosError = e as AxiosError;
    if (axiosError.response) {
      const axiosErrorMsg = `Couldnt create msr and got this error: ${
        axiosError?.response?.status
      } - ${JSON.stringify(axiosError?.response?.data)}`;
      log.error(axiosErrorMsg);
      throw new Error(axiosErrorMsg);
    }

    const error = e as Error;
    const errorMsg = `Couldnt create msr got this error: ${error.message}`;
    log.error(errorMsg);
    throw new Error(errorMsg);
  }
}

export default async function createManyMsrs(msrComposeUsers: User[]) {
  log.info(`Starting create msrs registers:`);
  for (let i = 0; i < msrComposeUsers.length; i++) {
    await createMsr(msrComposeUsers[i]);
  }
}
