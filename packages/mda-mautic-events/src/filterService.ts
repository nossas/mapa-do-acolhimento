import { Request } from "express";
import { mauticValidation } from "./validationMauticform";
import log, { apmAgent } from "./dbg";

const dbg = log.child({ label: { process: "filterService" } });

type IPDetails = {
  extra?: string;
  country?: string;
  latitude?: string;
  zipcode?: string;
  city?: string;
  isp?: string;
  region?: string;
  organization?: string;
  timezone?: string;
  longitude?: string;
};

type IPAddress = {
  ipDetails: IPDetails;
  ip: string;
  id: number;
};

type Field = {
  group: string;
  value: string;
  alias: string;
  object: string;
  id: string;
  type: string;
  is_fixed: string;
  label: string;
};

type Fields = {
  personal?: any[];
  professional?: any[];
  core: Record<string, Field>;
};

type Lead = {
  points: number;
  color?: string;
  id: number;
  fields: Fields;
};

type Form = {
  category?: string;
  alias: string;
  name: string;
  id: number;
};

type Submission = {
  id: number;
  ipAddress: IPAddress;
  results: Record<string, string>;
  trackingId: string;
  dateSubmitted: string;
  page?: string;
  lead: Lead;
  form: Form;
  referer: string;
};

type FormSubmit = {
  submission: Submission;
  timestamp: string;
};

export type Mautic = {
  "mautic.form_on_submit": FormSubmit[];
};

export const readMauticRequest: any = async (
  req: Request<unknown, unknown, Mautic>
): Promise<Mautic | any> => {
  try {
    return await mauticValidation.validate(req.body);
  } catch (error: any) {
    log.error(error);
    apmAgent?.captureError(error);
    throw new Error("Mautic payload invalid!");
  }
};

interface Payload {
  event: {
    data: {
      new: {
        service_name: string;
        data: any;
        created_at: string;
      };
    };
  };
}

export enum FILTER_SERVICE_STATUS {
  SUCCESS,
  NOT_DESIRED_SERVICE,
  INVALID_REQUEST
}

const filterService: any = (payload: Payload) => {
  try {
    const {
      event: {
        data: {
          new: { service_name: serviceName, data }
        }
      }
    } = payload;
    dbg.info(`received service "${serviceName}"`);
    if (serviceName !== "mautic-form") {
      dbg.warn(`${serviceName} not desired service`);
      return {
        status: FILTER_SERVICE_STATUS.NOT_DESIRED_SERVICE,
        serviceName
      };
    }
    return {
      status: FILTER_SERVICE_STATUS.SUCCESS,
      data
    };
  } catch (e: any) {
    dbg.error(e);
    return {
      status: FILTER_SERVICE_STATUS.INVALID_REQUEST
    };
  }
};

export default filterService;