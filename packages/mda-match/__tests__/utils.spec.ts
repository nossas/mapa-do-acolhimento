/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getVolunteerOrganizationId,
  calcDistance,
  getDifference,
  getCurrentDate,
  getVolunteerType,
  zendeskOrganizations
} from "../src/utils";

describe("Utils", () => {
  
  it('should return "therapist" if support type is "psicológico"', () => {
    const subject = "[Psicológico] Lilian, Paranapanema - SP";
    expect(getVolunteerOrganizationId(subject)).toStrictEqual(360282119532);
  });
  it('should return "lawyer" if support type is "jurídico"', () => {
    const subject = "[Jurídico] Teste, São Paulo - SP";
    expect(getVolunteerOrganizationId(subject)).toStrictEqual(360269610652);
  });
  it('should return "undefined" if there is no support type in subject', () => {
    const subject = "";
    expect(getVolunteerOrganizationId(subject)).toStrictEqual(undefined);
  });

  it("should return undefined if one of the values inside the tuple isn'nt a number", () => {
    expect(calcDistance([12.91001, 153.90263], [40.40719])).toStrictEqual(
      undefined
    );
    expect(calcDistance([-21.52472], [6.7367, -46.24922])).toStrictEqual(
      undefined
    );
    expect(calcDistance([58.20725, 44.79954], [-31.73592, 97.29179])).toBe(
      5077.827974980835
    );
  });

  describe("getDifference should return elements that weren't in cache", () => {
    const tickets_one: any = [
      {
        ticket_id: 22625
      },
      {
        ticket_id: 22626
      },
      {
        ticket_id: 22628
      }
    ];
    const tickets_two: any = [
      {
        ticket_id: 22625
      },
      {
        ticket_id: 22626
      }
    ];
    const tickets_three: any = [
      {
        ticket_id: 22630
      }
    ];
    const tickets_four: any = [
      {
        ticket_id: 22630
      },
      {
        ticket_id: 22631
      },
      {
        ticket_id: 22632
      }
    ];
    it("should return all tickets, because cache is empty and add them to cache", () => {
      let cache: any = [];
      expect(getDifference(cache, tickets_one)).toStrictEqual(tickets_one);
      cache = getDifference(cache, tickets_one);
      expect(cache).toStrictEqual(tickets_one);
    });
    it("should return an empty array, and cache stays the same", () => {
      let cache = tickets_one;
      expect(getDifference(cache, tickets_two)).toStrictEqual([]);
      cache = [...cache, ...getDifference(cache, tickets_two)];
      expect(cache).toStrictEqual(tickets_one);
    });
    it("should return the different ticket and add it to cache", () => {
      let cache = [...tickets_one];
      expect(getDifference(cache, tickets_three)).toStrictEqual(tickets_three);
      cache = [...cache, ...getDifference(cache, tickets_three)];
      expect(cache).toStrictEqual([...tickets_one, ...tickets_three]);
    });
    it("should return the different ticket and add it to cache", () => {
      let cache = tickets_one;
      expect(getDifference(cache, tickets_four)).toStrictEqual(tickets_four);
      cache = [...cache, ...getDifference(cache, tickets_four)];
      expect(cache).toStrictEqual([...tickets_one, ...tickets_four]);
    });
  });

  it("returns the current date", () => {
    expect(new Date(getCurrentDate())).toBeDate();
  });

  it("returns the correct volunteer type", () => {
    expect(getVolunteerType(zendeskOrganizations["lawyer"]).type).toStrictEqual(
      "Advogada"
    );
    expect(
      getVolunteerType(zendeskOrganizations["therapist"]).type
    ).toStrictEqual("Psicóloga");
  });
});
