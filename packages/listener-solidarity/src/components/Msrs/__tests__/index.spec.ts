//import axios from "axios";
//import { createMsrs } from "..";

import faker from "faker/locale/pt_BR";

export const geolocation = {
  latitude: Number(faker.address.latitude()).toFixed(2),
  longitude: Number(faker.address.longitude()).toFixed(2),
  address: faker.address.streetAddress(true),
  state: faker.address.state(true),
  city: faker.address.city(),
  cep: faker.address.zipCode()
};

jest.mock("axios");

const mockMsrUsers  = [
  {
    user_id: 1234567,
    name: "Lua",
    role: "end-user" as "end-user",
    organization_id: 360273031591,
    email: "lua@email.org",
    external_id: "2000302",
    phone: "19982915333",
    verified: true,
    user_fields: {
      cor: null,
      address: geolocation.address,
      cep: geolocation.cep,
      city: geolocation.city,
      latitude: geolocation.latitude,
      longitude: geolocation.longitude,
      state: geolocation.state,
      tipo_de_acolhimento: "psicológico" as "psicológico",
      condition: "inscrita"  as "inscrita",
      whatsapp: null,
      registration_number: null,
      occupation_area: null,
      disponibilidade_de_atendimentos: null,
      data_de_inscricao_no_bonde: "2020-05-08T12:37:01.553574"
    }
  },
  {
    user_id: 7654321,
    name: "Sol",
    role: "end-user" as "end-user",
    organization_id: 360273031591,
    email: "sol@gmail.com",
    external_id: "2000364",
    phone: "11984328888",
    verified: true,
    user_fields: {
      cor: null,
      address: geolocation.address,
      cep: geolocation.cep,
      city: geolocation.city,
      latitude: geolocation.latitude,
      longitude: geolocation.longitude,
      state: geolocation.state,
      tipo_de_acolhimento: "psicológico_e_jurídico" as "psicológico_e_jurídico",
      condition: "inscrita" as "inscrita",
      whatsapp: null,
      registration_number: null,
      occupation_area: null,
      disponibilidade_de_atendimentos: null,
      data_de_inscricao_no_bonde: "2020-05-27T13:14:24.678628"
    }
  },
  {
    user_id: 67891234,
    name: "Venus",
    role: "end-user" as "end-user" ,
    organization_id: 360273031591,
    email: "venus@email.com",
    external_id: "2000365",
    phone: "32994329912",
    verified: true,
    user_fields: {
      cor: null,
      address: geolocation.address,
      cep: geolocation.cep,
      city: geolocation.city,
      latitude: geolocation.latitude,
      longitude: geolocation.longitude,
      state: geolocation.state,
      tipo_de_acolhimento: "psicológico" as "psicológico",
      condition: "desabilitada"  as "desabilitada",
      whatsapp: null,
      registration_number: null,
      occupation_area: null,
      disponibilidade_de_atendimentos: null,
      data_de_inscricao_no_bonde: "2020-05-27T13:15:47.93393"
    }
  },
]


describe("createMsrs", () => {
  it("should return a array de msrPayloads", async () => {


   // expect(createMsrs(mockMsrUsers)).toEqual(mockMsrUsers)
   
  });

});
