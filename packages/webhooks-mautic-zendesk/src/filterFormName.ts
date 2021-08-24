import * as yup from "yup";
import log, { apmAgent } from "./dbg";
import { Mautic } from "./filterService";

const dbg = log.child({ labels: { process: "filterFormName" } });

export enum FILTER_FORM_NAME_STATUS {
  SUCCESS,
  FORM_NOT_IMPLEMENTED,
  INVALID_REQUEST
}

export const filterName = async (data: Mautic) => {
  const validation = yup.object().shape({
    "mautic.form_on_submit": yup.array().of(
      yup.object().shape({
        submission: yup.object().shape({
          form: yup.object().shape({
            name: yup.string().required()
          }),
          results: yup
            .object()
            .shape({
              email: yup.string().required()
            })
            .required(),
          dateSubmitted: yup.string().required()
        }),
        timestamp: yup.string().required()
      })
    )
  });

  let validationResult;

  try {
    validationResult = await validation.validate(data);
  } catch (e) {
    dbg.error(e);
    apmAgent?.captureError(e);
    return {
      status: FILTER_FORM_NAME_STATUS.INVALID_REQUEST,
      data
    };
  }
  const {
    "mautic.form_on_submit": [
      {
        submission: {
          form: { name },
          results,
          dateSubmitted
        },
        timestamp
      }
    ]
  } = validationResult;

  apmAgent?.setCustomContext({
    formName: name
  });

  let organization;

  if (typeof name === "string") {
    if (name.toLowerCase().includes("cadastro: advogadas")) {
      organization = "ADVOGADA";
    } else if (name.toLowerCase().includes("cadastro: psicólogas")) {
      organization = "PSICÓLOGA";
    } else {
      dbg.warn(`InstanceClass "${name}" doesn't exist`);
      return {
        status: FILTER_FORM_NAME_STATUS.FORM_NOT_IMPLEMENTED,
        name
      };
    }
  }
  return {
    status: FILTER_FORM_NAME_STATUS.SUCCESS,
    organization,
    results,
    timestamp,
    dateSubmitted
  };
};
