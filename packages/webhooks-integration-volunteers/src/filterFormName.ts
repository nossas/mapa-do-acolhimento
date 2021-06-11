import * as yup from "yup";
import debug from "debug";

const dbg = debug("filterFormName");

export enum FILTER_FORM_NAME_STATUS {
  SUCCESS,
  FORM_NOT_IMPLEMENTED,
  INVALID_REQUEST
}

export const filterFormName = async (data: object) => {
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
    dbg(e);
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
  
  let organization: string ="";
  if (typeof name === "string") {
    if (name.toLowerCase().includes("cadastro: advogadas")) {
      organization = "Advogada";
    } else if (name.toLowerCase().includes("cadastro: psicólogas")) {
      organization = "Psicóloga";
    } else {
      dbg(`Organization "${name}" doesn't exist`);
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
