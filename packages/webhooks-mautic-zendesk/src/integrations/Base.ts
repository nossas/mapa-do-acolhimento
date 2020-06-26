import debug, { Debugger } from "debug";
import urljoin from "url-join";
import axios from "axios";
import { Response } from "express";

export enum GMAPS_ERRORS {
  REQUEST_FAILED,
  INVALID_INPUT
}

abstract class Base {
  protected name: string;

  protected dbg: Debugger;

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
    this.name = `webhooks-mautic-zendesk:${name}`;
    this.dbg = debug(this.name);
    this.url = url;
    this.res = res;
    const { ZENDESK_ORGANIZATIONS } = process.env;
    this.organizations = JSON.parse(ZENDESK_ORGANIZATIONS);
  }

  protected getAddress = async (cep: string) => {
    const log = debug("gmaps");
    const { GOOGLE_MAPS_API_KEY } = process.env;
    let data;
    try {
      log(`requesting google with cep ${cep}...`);
      const response = await axios.post(
        "https://maps.googleapis.com/maps/api/geocode/json",
        undefined,
        {
          params: {
            address: cep,
            key: GOOGLE_MAPS_API_KEY
          }
        }
      );
      log("response!", response.data);
      data = response.data;
    } catch (e) {
      this.dbg("falha na requisição para o google maps");
      return {
        error: GMAPS_ERRORS.REQUEST_FAILED
      };
    }

    if (data.status === "OK") {
      const {
        results: [
          {
            geometry: {
              location: { lat, lng }
            },
            address_components: addressComponents,
            formatted_address: address
          }
        ]
      } = data;

      let state: string | undefined;
      let city: string | undefined;
      let country: string | undefined;
      let tagInvalidCep = false;

      addressComponents.forEach(
        ({
          types,
          short_name: shortName
        }: {
          types: string[];
          short_name: string;
        }) => {
          if (types.includes("administrative_area_level_1")) {
            state = shortName;
          }
          if (types.includes("administrative_area_level_2")) {
            city = shortName;
          }
          if (types.includes("country")) {
            country = shortName;
          }
        }
      );

      if (country !== "BR") {
        state = undefined;
        city = undefined;
        tagInvalidCep = true;
      }

      return {
        lat,
        lng,
        address,
        state,
        city,
        tagInvalidCep
      };
    }

    return {
      error: GMAPS_ERRORS.INVALID_INPUT
    };
  };

  protected send = async <T>(data?) => {
    const {
      ZENDESK_API_URL,
      ZENDESK_API_TOKEN,
      ZENDESK_API_USER
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
    } catch (e) {
      return this.dbg(e);
    }
  };

  abstract start: Function;
}

export default Base;
