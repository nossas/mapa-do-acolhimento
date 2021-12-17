#!/usr/bin/env node
import createOrUpdateMany from "./components/User/createOrUpdateMany";

const role: 'end-user' = 'end-user'; 
const condition: "inscrita" | "desabilitada" = 'desabilitada';
const users = [{
    name: "Teste",
    role: role,
    organization_id: 360269610652,
    email: "teste@email.com",
    external_id: "00000",
    phone: "99999999999",
    verified: false,
    user_fields: {
      cor: null,
      address: "",
      cep: '',
      city: '',
      latitude: '',
      longitude: '',
      state: '',
      tipo_de_acolhimento: null,
      condition: condition,
      whatsapp: "",
      registration_number: "21312312",
      occupation_area: null,
      disponibilidade_de_atendimentos: "1",
      data_de_inscricao_no_bonde: "2020-05-29T00:28:29.55569"
    }
  }]

createOrUpdateMany(users)
.then((result)=> {
    console.log(result)
})
.catch((err)  => {
    console.log(err)
}); 