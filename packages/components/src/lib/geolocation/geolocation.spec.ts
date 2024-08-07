import { processGoogleResponse, default as getGeolocation } from "./index";
import faker from "faker/locale/pt_BR";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
process.env.GEOCODING_API_KEY = "a1111";

describe("geolocation tests", () => {
  const validOutput = {
    latitude: Number(faker.address.latitude()).toFixed(3),
    longitude: Number(faker.address.longitude()).toFixed(3),
    address: faker.address.streetAddress(true),
    state: faker.address.state(true),
    city: faker.address.city(),
    cep: faker.address.zipCode()
  };
  const mapsSuccess = {
    results: [
      {
        geometry: {
          location: {
            lat: Number(parseFloat(validOutput.latitude)),
            lng: Number(parseFloat(validOutput.longitude))
          }
        },
        formatted_address: validOutput.address,
        address_components: [
          {
            long_name: validOutput.cep,
            short_name: validOutput.cep,
            types: ["postal_code"]
          },
          {
            long_name: validOutput.city,
            short_name: validOutput.city,
            types: ["administrative_area_level_2", "political"]
          },
          {
            long_name: validOutput.state,
            short_name: validOutput.state,
            types: ["administrative_area_level_1", "political"]
          },
          {
            long_name: "Brazil",
            short_name: "BR",
            types: ["country", "political"]
          }
        ]
      }
    ],
    status: "OK"
  };

  const email = faker.internet.email();
  const invalidOutput = {
    latitude: null,
    longitude: null,
    address: `Endereço não encontrado - ${validOutput.address}`,
    state: "not_found",
    city: "not_found",
    cep: "not_found"
  };

  it("should return valid output if there are results", () => {
    const success = processGoogleResponse(
      email,
      validOutput.address,
      mapsSuccess
    );
    expect(success).toStrictEqual(validOutput);
  });

  it("should return invalid output if ZERO_RESULTS", () => {
    const mapsFailure = {
      results: [],
      status: "ZERO_RESULTS"
    };
    const failure = processGoogleResponse(
      email,
      validOutput.address,
      mapsFailure
    );
    expect(failure).toStrictEqual(invalidOutput);
  });

  it("should return invalid output if there was an error with Google Maps API", () => {
    const failure = processGoogleResponse(
      email,
      validOutput.address,
      undefined
    );
    expect(failure).toStrictEqual(invalidOutput);
  });

  const validOutput2 = {
    latitude: Number(faker.address.latitude()).toFixed(3),
    longitude: Number(faker.address.longitude()).toFixed(3),
    address: faker.address.streetAddress(true),
    state: faker.address.state(true),
    city: faker.address.city(),
    cep: faker.address.zipCode()
  };

  const input = {
    email: faker.internet.email(),
    cep: validOutput2.cep
  };

  it("should return output with BrasilAPI", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        cep: validOutput2.cep,
        state: validOutput2.state,
        city: validOutput2.city,
        neighborhood: "",
        street: "",
        service: "correios"
      },
      statusText: "OK"
    });
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        documentation: "https://opencagedata.com/api",
        licenses: [
          {
            name: "see attribution guide",
            url: "https://opencagedata.com/credits"
          }
        ],
        rate: {
          limit: 2500,
          remaining: 2496,
          reset: 1652918400
        },
        results: [
          {
            geometry: {
              lat: validOutput2.latitude,
              lng: validOutput2.longitude
            },
            formatted: validOutput2.address
          }
        ],
        status: {
          code: 200,
          message: "OK"
        },
        stay_informed: {
          blog: "https://blog.opencagedata.com",
          twitter: "https://twitter.com/OpenCage"
        },
        thanks: "For using an OpenCage API",
        timestamp: {
          created_http: "Wed, 18 May 2022 21:43:18 GMT",
          created_unix: 1652910198
        },
        total_results: 0
      }
    });

    const result = await getGeolocation(input);
    expect(mockedAxios.get).toBeCalledTimes(2);
    expect(result).toStrictEqual(validOutput2);
  });
});
