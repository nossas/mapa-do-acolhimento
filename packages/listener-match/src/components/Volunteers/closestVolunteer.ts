import * as turf from "@turf/turf";
import { Volunteer } from "../../types";
// import dbg from "../../dbg";

// const log = dbg.extend("closestVolunteer");

const calcDistance = (pointA: number[], pointB: number[]) => {
  if (
    Number.isNaN(pointA[0]) ||
    Number.isNaN(pointA[1]) ||
    Number.isNaN(pointB[0]) ||
    Number.isNaN(pointB[1])
  )
    return undefined;
  const a = turf.point(pointA);
  const b = turf.point(pointB);

  return Number(turf.distance(a, b));
};

export default (
  { latitude, longitude }: { latitude: string; longitude: string },
  volunteers: Volunteer[]
) => {
  return volunteers
    .map(volunteer => {
      const pointA = [Number(longitude), Number(latitude)];
      const pointB = [Number(volunteer.longitude), Number(volunteer.latitude)];
      const distance = calcDistance(pointA, pointB);
      return {
        ...volunteer,
        name: volunteer.name.split(" ")[0],
        distance
      };
    })
    .filter(volunteer => volunteer.distance && volunteer.distance < 150)
    .sort((a, b) => Number(a.distance) - Number(b.distance))[0];
};
