import { User } from "../../types";
import { getRaceColor, getStatus } from "../../utils";

type msrPayload = {
	msrZendeskUserId: bigint;
	email: string;
	phone: string;
	firstName: string;
	city: string;
	state: string;
	neighborhood: string;
	zipcode: string;
	color: string;
	gender: string;
	status: string;
	dateOfBirth: string | null;
	hasDisability: boolean | null;
	acceptsOnlineSupport: boolean;
};
export function createMsrs(msrComposeUsers : User[] ) {

    //pecorrer objetos montando os payload
    let msrPayloads: msrPayload[] = [];
    msrComposeUsers.forEach((msr) => {
        
    
        //verifica informacòes de endereço
        msrPayloads.push( {
        msrZendeskUserId: msr.user_id as unknown as bigint,
        email: msr.email,
        phone: msr.phone,
        firstName: msr.name,
        city: msr.user_fields.city,
        state: msr.user_fields.state?msr.user_fields.state:"", 
        neighborhood: msr.user_fields.address,
        zipcode: msr.user_fields.cep,
        color: getRaceColor(msr.user_fields.cor) , 
        status: getStatus(msr.user_fields.condition), 
        gender: 'not_found',
        dateOfBirth: null,
        hasDisability: null,
        acceptsOnlineSupport: true
    })

    })
  
    //verificar se o cep e estaddo foram  preenchidos, se não chamar geolocation 

    return msrPayloads;


}