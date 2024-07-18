import axios from "axios";
import createManyMsrs, { createMsr } from "..";
import mockMsrUsers from "../__mocks__/msrUsers";
import { getMsrPayload } from "../../../utils";

jest.mock("axios");

let mockMsrPayloads: any = [];

mockMsrUsers.forEach(msr => {
  mockMsrPayloads.push(getMsrPayload(msr));
});

describe("createMsrs", () => {
  it("should throw error", async () => {
    axios.post = jest.fn().mockRejectedValue({
      response: {
        status: 400,
        data: "foo bar"
      }
    });

    await expect(createMsr(mockMsrUsers[0])).rejects.toThrow(
      'Couldnt create msr and got this error: 400 - "foo bar"'
    );
  });

  it("should create one msr ", async () => {
    axios.post = jest.fn().mockResolvedValue({
      response: {
        status: 200,
        data: "foo bar"
      }
    });
    await createManyMsrs([mockMsrUsers[0]]);
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3000/create",
      mockMsrPayloads[0]
    );
  });
  it("should create three msr ", async () => {
    axios.post = jest.fn().mockResolvedValue({
      response: {
        status: 200,
        data: "foo bar"
      }
    });
    await createManyMsrs(mockMsrUsers);
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3000/create",
      mockMsrPayloads[0]
    );
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3000/create",
      mockMsrPayloads[1]
    );
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3000/create",
      mockMsrPayloads[2]
    );
  });
});
