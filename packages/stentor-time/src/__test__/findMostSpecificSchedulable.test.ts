/*! Copyright (c) 2019, XAPPmedia */
import { Schedule } from "stentor-models";
import { expect } from "chai";
import { determineSpecificityScore, findMostSpecificSchedulable } from "../findMostSpecificSchedulable";

const year: Schedule = {
  start: {
    time: "1986",
    format: "YYYY",
  },
  duration: {
    amount: 2,
    format: "m",
  },
};

const monthDay: Schedule = {
  start: {
    time: "07-19",
    format: "MM-DD",
  },
  duration: {
    amount: 2,
    format: "m",
  },
};

const hoursMinutes: Schedule = {
  start: {
    time: "12:30",
    format: "HH:mm",
  },
  duration: {
    amount: 2,
    format: "m",
  },
};

const hoursMinutesDayOfWeek: Schedule = {
  start: {
    time: "12:30",
    format: "HH:mm",
    dayOfWeek: "2345",
  },
  duration: {
    amount: 2,
    format: "m",
  },
};

const hoursMinutesMonthDay: Schedule = {
  start: {
    time: "07-19 12:30",
    format: "MM-DD HH:mm",
  },
  duration: {
    amount: 2,
    format: "m",
  },
};

const noFormat: Schedule = {
  start: {
    time: "2018-02-14T17:20:15Z",
  },
  duration: {
    amount: 2,
    format: "m",
  },
};

describe("#determineSpecificityScore()", () => {
  describe("when passed undefined", () => {
    it("returns 0", () => {
      expect(determineSpecificityScore(undefined)).to.equal(0);
    });
  });
  describe("when passed an object without a schedule", () => {
    it("returns 0", () => {
      expect(determineSpecificityScore({} as any)).to.equal(0);
    });
  });
  describe("when passed a schedule with year", () => {
    it("returns 1", () => {
      const schedule = year;
      expect(determineSpecificityScore({ schedule })).to.equal(1);
    });
  });
  describe("when passed a schedule with month and day", () => {
    it("returns 2", () => {
      const schedule = monthDay;
      expect(determineSpecificityScore({ schedule })).to.equal(2);
    });
  });
  describe("when passed a schedule with hours (H) and minutes", () => {
    it("returns 3", () => {
      const schedule = hoursMinutes;
      /* tslint:disable:no-magic-numbers */
      expect(determineSpecificityScore({ schedule })).to.equal(3);
      /* tslint:enable:no-magic-numbers */
    });
  });
  describe("when passed a schedule with hours (H), minutes and day of week", () => {
    it("returns 4", () => {
      const schedule = hoursMinutesDayOfWeek;
      /* tslint:disable:no-magic-numbers */
      expect(determineSpecificityScore({ schedule })).to.equal(4);
      /* tslint:enable:no-magic-numbers */
    });
  });
  describe("when passed a schedule with month, day, hours (H) and minutes", () => {
    it("returns 5", () => {
      const schedule = hoursMinutesMonthDay;
      /* tslint:disable:no-magic-numbers */
      expect(determineSpecificityScore({ schedule })).to.equal(5);
      /* tslint:enable:no-magic-numbers */
    });
  });
  describe("when passed a schedule without start format", () => {
    it("returns 4 for the defaulted format", () => {
      const schedule = noFormat;
      /* tslint:disable:no-magic-numbers */
      expect(determineSpecificityScore({ schedule })).to.equal(4);
      /* tslint:enable:no-magic-numbers */
    });
  });
});

describe("#findMostSpecificSchedulable()", () => {
  describe("when passed undefined", () => {
    it("returns undefined", () => {
      expect(findMostSpecificSchedulable(undefined)).to.be.undefined;
    });
  });
  describe("when passed an empty array", () => {
    it("returns undefined", () => {
      expect(findMostSpecificSchedulable([])).to.be.undefined;
    });
  });
  describe("when passed one item", () => {
    it("returns the item", () => {
      const scheduled = { schedule: hoursMinutes };
      expect(findMostSpecificSchedulable([scheduled])).to.equal(scheduled);
    });
  });
  describe("when passed multiple", () => {
    it("returns the most specific schedule", () => {
      const scheduled0 = { schedule: hoursMinutes };
      const scheduled1 = { schedule: hoursMinutesMonthDay };
      expect(findMostSpecificSchedulable([scheduled0, scheduled1])).to.equal(scheduled1);
    });
  });
});
