import { Request } from "express";
import {mauticValidation} from "./validationMauticform"
import log, {apmAgent} from "./dbg"

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

export default  async (req: Request<any, any, Mautic>): Promise<Mautic | any> => {
  
  try {
    const mautic = await mauticValidation.validate(req.body);   
    return mautic;
  } catch (error) {
    log.error(error);
    apmAgent?.captureError(error);
    throw new Error("Mautic payload invalid!");  
  }
};
