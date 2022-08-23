import * as yup from "yup";

export const mauticValidation = yup.object().shape({
  "mautic.form_on_submit": yup
    .array()
    .of(
      yup.object().shape({
        submission: yup
          .object()
          .shape({
            id: yup.number().required(),
            ipAddress: yup.object(),
            results: yup.object().required(),
            dateSubmitted: yup.string().required(),
            page: yup.string().nullable(),
            lead: yup.object().shape({
              points: yup.number().required(),
              color: yup.string().nullable(),
              id: yup.number().required(),
              fields: yup
                .object()
                .shape({
                  personal: yup.array(),
                  professional: yup.array(),
                  core: yup.object()
                })
                .required()
            }),
            form: yup
              .object()
              .shape({
                category: yup.string().nullable(),
                alias: yup.string().required(),
                name: yup.string().required(),
                id: yup.number().required()
              })
              .required(),
            referer: yup.string()
          })
          .required(),
        timestamp: yup.string()
      })
    )
    .required()
});
