jest.mock("subscriptions-transport-ws");

import { getClosestVolunteer } from "../src/components/Volunteers";
import { Volunteer } from "../src/types";
import faker from "faker/locale/pt_BR";

describe("Get closest volunteer", () => {
  const geolocation = {
    latitude: "-106.66751859701958",
    longitude: "39.24940851428889"
  };
  it("should get the closest volunteer to the msr", () => {
    const volunteers = [
      {
        name: faker.name.firstName(),
        latitude: "-106.95669008334858",
        longitude: "39.654823157985106"
      },
      {
        name: faker.name.firstName(),
        latitude: "-105.02619705107622",
        longitude: "40.57685967151977"
      },
      {
        name: faker.name.firstName(),
        latitude: "-109.23711249881757",
        longitude: "41.592217559692784"
      }
    ];
    expect(
      getClosestVolunteer(geolocation, volunteers as Volunteer[])
    ).toMatchObject(volunteers[0]);
  });

  it("should return undefined if there are not close volunteers", () => {
    const volunteers = [
      {
        name: faker.name.firstName(),
        latitude: "-105.02619705107622",
        longitude: "40.57685967151977"
      },
      {
        name: faker.name.firstName(),
        latitude: "-109.23711249881757",
        longitude: "41.592217559692784"
      }
    ];
    expect(getClosestVolunteer(geolocation, volunteers as Volunteer[])).toBe(
      undefined
    );
  });
});
