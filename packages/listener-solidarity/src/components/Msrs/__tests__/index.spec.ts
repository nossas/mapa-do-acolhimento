import axios from "axios";
import  createManyMsrs, { createMsr }  from "..";
import mockMsrUsers from "../__mocks__/msrUsers";
import { getRaceColor } from "../../../utils";

jest.mock("axios");

let mockMsrPayloads: any = [];

mockMsrUsers.forEach((msr) => {  
  return mockMsrPayloads.push({
    msrZendeskUserId: msr.user_id,
    email: msr.email,
    phone: msr.user_fields.whatsapp,
    firstName: msr.name,
    city: msr.user_fields.city,
    state: msr.user_fields.state,
    neighborhood: msr.user_fields.neighborhood,
    zipcode: msr.user_fields.cep,
    color: msr.user_fields.cor ? getRaceColor(msr.user_fields.cor) : "not_found",
    gender: 'not_found',
    status: "registered",
    dateOfBirth: null,
    hasDisability: null,
    acceptsOnlineSupport: true
  });

} )

describe("createMsrs", () => {

  it("should throw error", async () => {
    axios.post = jest.fn().mockRejectedValue({
      response: {
        status: 400,
        data: "foo bar",
      },
    });
  
    await expect(
      createMsr(mockMsrUsers[0])
    ).rejects.toThrow('Couldnt create msrs and got this error: 400 - "foo bar"');
  });   

  it("should create one msr ", async () => {
    axios.post = jest.fn().mockResolvedValue({
      response: {
        status: 200,
        data: "foo bar",
      },
    });
    createManyMsrs([mockMsrUsers[0]])
    expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/create",mockMsrPayloads[0])
  });
  it("should create three msr ", async () => {
    axios.post = jest.fn().mockResolvedValue({
      response: {
        status: 200,
        data: "foo bar",
      },
    });
    await createManyMsrs(mockMsrUsers)
    expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/create",mockMsrPayloads[0])
    expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/create",mockMsrPayloads[1])
    expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/create",mockMsrPayloads[2])
  });

  
});