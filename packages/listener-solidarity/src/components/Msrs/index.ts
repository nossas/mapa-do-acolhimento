import { User } from "../../types";

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
        state: msr.user_fields.state?msr.user_fields.state:"", //nao pode ser nulo 
        neighborhood: msr.user_fields.address,
        zipcode: msr.user_fields.cep,
        color: msr.user_fields.cor? msr.user_fields.cor: "not_found" , //pmapear DEPARA
        gender: 'not_found',
        status: msr.user_fields.condition, //mapear DEPARA
        dateOfBirth: null,
        hasDisability: null,
        acceptsOnlineSupport: true
    })

    })
  
    //verificar se o cep e estaddo foram  preenchidos, se não chamar geolocation 

    return msrPayloads;


}