import { User } from "../../types";
import { getRaceColor, getStatus } from "../../utils";
import logger from "../../logger";
import axios, { AxiosError } from "axios";


type CreateMsrResponse = {
    message: 
      {
        msrId: number;
      } ;
  };

const log = logger.child({ labels: { process: "createMsrs" } }); 

export default async function createMsrs(msrComposeUsers : User[] ) {

    //pecorrer objetos montando os payload
    try {
     
       const msrPayloads =  msrComposeUsers.map((msr) => {


            //verifica informacòes de endereço
        return {
            msrZendeskUserId: msr.user_id as unknown as bigint,
            email: msr.email,
            phone: msr.phone,
            firstName: msr.name,
            city: msr.user_fields.city,
            state: msr.user_fields.state?msr.user_fields.state:"", 
            neighborhood: msr.user_fields.address, //pegar bairro form_entrie ou geolocation? 
            zipcode: msr.user_fields.cep,
            color: getRaceColor(msr.user_fields.cor) , 
            status: getStatus(msr.user_fields.condition), 
            gender: 'not_found',
            dateOfBirth: null,
            hasDisability: null,
            acceptsOnlineSupport: true
        }

        })

   
        log.info(`Starting create Msrs registers: `);
        const createMsrUrl = process.env["CREAT_MSR_URL"];
        const msrResults = msrPayloads.map(async (msr) => { 
            return await axios.post<CreateMsrResponse>(createMsrUrl!,msr);
        })
        
        log.info(
          `Success creating support requests for these msrs: ${msrResults}`
        );
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