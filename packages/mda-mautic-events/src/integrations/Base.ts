import { Logger } from "pino";
import urljoin from "url-join";
import axios from "axios";
import { Response } from "express";
import log from "../dbg";

export enum GMAPS_ERRORS {
  REQUEST_FAILED,
  INVALID_INPUT
}

abstract class Base {
  protected name: string;

  protected dbg: Logger;

  protected url: string;

  protected organizations: { [s: string]: number };

  protected res: Response;

  private method: "GET" | "POST" | "PUT";

  constructor(
    name: string,
    url: string,
    res: Response,
    method: "GET" | "POST" | "PUT" = "POST"
  ) {
    this.method = method;
    this.name = name;
    this.dbg = log.child({ label: { process: this.name } });
    this.url = url;
    this.res = res;
    const { ZENDESK_ORGANIZATIONS = "" } = process.env;
    this.organizations = JSON.parse(ZENDESK_ORGANIZATIONS);
  }

  protected send: any = async <T>(data?) => {
    const {
      ZENDESK_API_URL = "",
      ZENDESK_API_TOKEN = "",
      ZENDESK_API_USER = ""
    } = process.env;
    const endpoint = urljoin(ZENDESK_API_URL!, this.url);
    try {
      if (this.method === "POST") {
        const result = await axios.post<T>(endpoint, data, {
          auth: {
            username: ZENDESK_API_USER,
            password: ZENDESK_API_TOKEN
          }
        });
        return result;
      }
      if (this.method === "GET") {
        const result = await axios.get<T>(endpoint, {
          auth: {
            username: ZENDESK_API_USER,
            password: ZENDESK_API_TOKEN
          }
        });
        return result;
      }
      const result = await axios.put<T>(endpoint, data, {
        auth: {
          username: ZENDESK_API_USER,
          password: ZENDESK_API_TOKEN
        }
      });
      return result;
    } catch (e: any) {
      return this.dbg.error(e);
    }
  };

  abstract start: any;
}

export default Base;
