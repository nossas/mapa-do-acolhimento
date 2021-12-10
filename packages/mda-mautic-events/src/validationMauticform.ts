
import * as yup from "yup";

export const mauticValidation = yup.object().shape({
    "mautic.form_on_submit": yup.array().of(yup.object().shape({ 
      submission : yup.object().shape({
        id: yup.number().required(),
        ipAddress: yup.object().shape({  
          ipDetails: yup.object().shape({
            extra: yup.string(),
            country:yup.string(),
            latitude: yup.string(),
            zipcode: yup.string(),
            city: yup.string(),
            isp: yup.string(),
            region: yup.string(),
            organization: yup.string(),
            timezone:yup.string(),
            longitude: yup.string()
          }),
          ip: yup.string().required(),
          id: yup.number().required()
        }),
        results: yup.object().required(),
        dateSubmitted: yup.string().required(),
        page: yup.string().nullable(),
        lead: yup.object().shape({
          points: yup.number().required(),
          color: yup.string().nullable(),
          id: yup.number().required(),
          fields: yup.object().shape({
          personal: yup.array(), 
          professional: yup.array(), 
          core: yup.object()
        }).required(),
      }),     
      form: yup.object().shape({
        category: yup.string().nullable(),
        alias: yup.string().required(),
        name: yup.string().required(),
        id: yup.number().required()
      }).required(),
      referer: yup.string().required() }).required(),
    timestamp: yup.string().required()})).required()
  });



  