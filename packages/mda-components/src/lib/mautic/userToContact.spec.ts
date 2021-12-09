import { newContact } from "./userToContact";
import { StatusMulher } from "../../types";
import faker from "faker";
import * as yup from "yup";

export const geolocation = {
  latitude: Number(faker.address.latitude()).toFixed(2),
  longitude: Number(faker.address.longitude()).toFixed(2),
  address: faker.address.streetAddress(true),
  state: faker.address.stateAbbr().toLowerCase(),
  city: faker.address.city(),
  cep: faker.address.zipCode()
};

describe("Check if user is correctly transformed into Mautic contact", () => {
  it("should be a valid contact", async () => {
    const user = {
      name: "Joana Lima",
      role: "end-user",
      organization_id: 360269610652,
      email: "joana@email.com",
      external_id: "2000373",
      phone: "12988805543",
      verified: true,
      user_id: 123123,
      user_fields: {
        cor: null,
        address: geolocation.address,
        cep: geolocation.cep,
        city: geolocation.city,
        latitude: geolocation.latitude,
        longitude: geolocation.longitude,
        state: geolocation.state,
        tipo_de_acolhimento: null,
        condition: "desabilitada" as StatusMulher,
        whatsapp: "12988805543",
        registration_number: "21312312",
        occupation_area: null,
        disponibilidade_de_atendimentos: "4",
        data_de_inscricao_no_bonde: "2020-05-29T00:25:28.593533"
      }
    };
    const result = {
      firstname: "Joana Lima",
      email: "joana@email.com",
      user_id: 123123,
      data_de_inscricao_no_bond1: "2020-05-29T00:25:28.593533",
      f_condition: "desabilitada" as StatusMulher,
      city: geolocation.city,
      state1: geolocation.state,
      address: geolocation.address,
      phone: "12988805543",
      whatsapp: "12988805543",
      tipo_de_acolhimento: null,
      cor: null,
      organization_id: 360269610652
    };
    const contact = await newContact(user);

    expect(contact).toStrictEqual(result);
  });

  it("should be an invalid contact", async () => {
    const user = {
      name: "Igor",
      role: "end-user",
      organization_id: 360273031591,
      email: "igor@nossas.org",
      external_id: "2000302",
      phone: "",
      verified: true,
      user_fields: {
        cor: null,
        address: geolocation.address,
        cep: geolocation.cep,
        city: geolocation.city,
        latitude: geolocation.latitude,
        longitude: geolocation.longitude,
        state: geolocation.state,
        tipo_de_acolhimento: "psicológico",
        condition: "inscrita" as StatusMulher,
        whatsapp: null,
        registration_number: null,
        occupation_area: null,
        disponibilidade_de_atendimentos: null,
        data_de_inscricao_no_bonde: "2020-05-08T12:37:01.553574"
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contact = await newContact(user as any);

    expect((contact as unknown as yup.ValidationError).name).toEqual("ValidationError");
    expect((contact as unknown as yup.ValidationError).message).toEqual("user_id is a required field");

  });
});
