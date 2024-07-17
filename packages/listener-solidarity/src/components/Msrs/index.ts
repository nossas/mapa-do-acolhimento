import { User } from "../../types";
import { getRaceColor, getStatus } from "../../utils";
import logger from "../../logger";
import axios, { AxiosError } from "axios";

//verificar se tá correto o tipo 
type CreateMsrResponse = {
    data: 
      {
        msrId: number;
      } ;
  };

const log = logger.child({ labels: { process: "createMsrs" } }); 

export default async function createMsrs(msrComposeUsers : User[] ) {

    //pecorrer objetos montando os payload
    try {
     
       const msrPayloads =  msrComposeUsers.map((msr) => {
        
        return {
            msrZendeskUserId: msr.user_id as unknown as bigint,
            email: msr.email,
            phone: msr.phone,
            firstName: msr.name,
            city: msr.user_fields.city,
            state: msr.user_fields.state,
            neighborhood: "", //pegar bairro form_entrie ou geolocation? 
            zipcode: msr.user_fields.cep?msr.user_fields.cep: "not_found",
            color: getRaceColor(msr.user_fields.cor) , 
            status: getStatus(msr.user_fields.condition), 
            gender: 'not_found',
            dateOfBirth: null,
            hasDisability: null,
            acceptsOnlineSupport: true
        }

        })

        log.info(`Starting create Msrs registers: `);
        const createMsrUrl = process.env["CREATE_MSR_URL"];
        let  msrResults:any = []
     
        while(msrPayloads.length > 0 ){
          const msr = msrPayloads.shift();
          const response = await  axios.post<CreateMsrResponse>(createMsrUrl!, msr);
          log.info(
            `Success creating support requests for this msr: ${response.data}`
          );
          msrResults.push(msr?.msrZendeskUserId)
        }
      
        return msrResults
      } catch (e) {
        const axiosError = e as AxiosError;
        if (axiosError.response) {
          const axiosErrorMsg = `Couldnt create msrs and got this error: ${
            axiosError?.response?.status
          } - ${JSON.stringify(axiosError?.response?.data)}`;
          log.error(axiosErrorMsg);
          throw new Error(axiosErrorMsg);
        }
    
        const error = e as Error;
        const errorMsg = `Couldnt create msrs got this error: ${error.message}`;
        log.error(errorMsg);
    
        throw new Error(errorMsg);
      }

}