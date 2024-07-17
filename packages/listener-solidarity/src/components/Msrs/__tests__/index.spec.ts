import axios from "axios";
import  createMsrs  from "..";
import mockMsrUsers from "./__mocks__/msrUsers";
import { getRaceColor, getStatus } from "../../../utils";

jest.mock("axios");

let mockMsrPayloads: any = [];

mockMsrUsers.forEach((msr) => {  
  return mockMsrPayloads.push({
    msrZendeskUserId: msr.user_id,
    email: msr.email,
    phone: msr.phone,
    firstName: msr.name,
    city: msr.user_fields.city,
    state: msr.user_fields.state,
    neighborhood: "",
    zipcode: msr.user_fields.cep,
    color: msr.user_fields.cor ? getRaceColor(msr.user_fields.cor) : "not_found",
    gender: 'not_found',
    status: getStatus(msr.user_fields.condition),
    dateOfBirth: null,
    hasDisability: null,
    acceptsOnlineSupport: true
  });

} )

const mockResult = mockMsrUsers.map((user) => {return  user.user_id})

describe("createMsrs", () => {
  it("should create one msr ", async () => {
    axios.post = jest.fn().mockResolvedValue({
      response: {
        status: 200,
        data: "foo bar",
      },
    });
    const response = await createMsrs([mockMsrUsers[0]])
    expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/create",mockMsrPayloads[0])
    expect(response).toEqual([mockResult[0]])
    

  });
  it("should create three msr ", async () => {
    axios.post = jest.fn().mockResolvedValue({
      response: {
        status: 200,
        data: "foo bar",
      },
    });
    const response = await createMsrs(mockMsrUsers)
    expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/create",mockMsrPayloads[0])
    expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/create",mockMsrPayloads[1])
    expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/create",mockMsrPayloads[2])
    expect(response).toEqual(mockResult)
    

  });

  it("should throw error", async () => {
    axios.post = jest.fn().mockRejectedValue({
      response: {
        status: 400,
        data: "foo bar",
      },
    });
  
    

  });

});