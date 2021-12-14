import readMauticRequest from "../filterService";
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

  it("Correct mautic form", async done => {
    await expect(await readMauticRequest(mockMauticFormRequest)).resolves.toEqual(
      mockMauticFormRequest.body
    );
    return done();
  });

  it("Capture error validation schema", async done => {
    const mockRequest: any = {
      body: undefined
    };

    await expect(await readMauticRequest(mockRequest)).rejects.toThrow(
      "Mautic payload invalid!"
    );
    expect(spyApm).toBeCalledTimes(1);
    expect(spyLog).toBeCalledTimes(1);
    return done();
  });
});
