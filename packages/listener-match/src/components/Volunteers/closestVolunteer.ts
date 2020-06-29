import { Volunteer } from "../../types";
import { calcDistance } from "../../utils";

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
