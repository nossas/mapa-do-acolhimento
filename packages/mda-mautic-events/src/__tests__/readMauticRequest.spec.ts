import { readMauticRequest } from "../filterService";
import dbg, { apmAgent } from "../dbg"
import { mockMauticFormRequest } from "../mocks";

describe("Validation of Mautic Form", () => {
  // let readMauticRequest: any;
  let spyApm: any;
  let spyLog: any;

  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
    process.env.ELASTIC_APM_SECRET_TOKEN = "teste";
    process.env.ELASTIC_APM_SERVER_URL = "https://localhost";
    process.env.ELASTIC_APM_SERVICE_NAME = "teste";

    spyLog = jest.spyOn(dbg, "error");
    spyApm = jest.spyOn(apmAgent, "captureError");
  });
  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it("Correct mautic form", async () => {
    return readMauticRequest(mockMauticFormRequest).then((data) => {
      expect(data).toEqual(mockMauticFormRequest.body);
    })
  });

  it("Capture error validation schema", async () => {
    const mockRequest: any = {
      body: undefined
    };

    return readMauticRequest(mockRequest)
      .catch((err) => {
        expect(err.message).toEqual("Mautic payload invalid!");
        expect(spyApm).toBeCalledTimes(1);
        expect(spyLog).toBeCalledTimes(1);
      });
  });
});
