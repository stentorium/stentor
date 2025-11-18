/*! Copyright (c) 2025, XAPP AI */
import { Schedulable } from "stentor-models";
import { expect } from "chai";
import { DateTime } from "luxon";
import * as sinon from "sinon";
import { SCHEDULE_DEBUG_FORMAT } from "../Constants";
import { findSchedulableMatch } from "../findSchedulableMatch";

let now: DateTime;
let fiveHoursInTheFuture: Schedulable;
let today: Schedulable;
let tomorrow: Schedulable;
let nowForFiveSeconds: Schedulable;
let nowWithinHour: Schedulable;
let nowWithinHourAndAHalf: Schedulable;
const badData = {} as Schedulable;
let centralNow: Schedulable;
let keithIntro: Schedulable;
let jimAndDebIntro: Schedulable;
let specificDateAndTime: Schedulable;

describe("#findSchedulableMatch()", () => {
  before(() => {
    now = DateTime.now().toUTC();

    today = {
      schedule: {
        start: {
          time: now.toISO(),
          dayOfWeek: (now.weekday % 7).toString(),
        },
        duration: { amount: 5, format: "s" },
      },
    };

    tomorrow = {
      schedule: {
        start: {
          time: now.toISO(),
          dayOfWeek: (((now.weekday % 7) + 1) % 7).toString(),
        },
        duration: { amount: 5, format: "s" },
      },
    };

    nowForFiveSeconds = {
      schedule: {
        start: { time: now.toISO() },
        duration: { amount: 5, format: "s" },
      },
    };

    nowWithinHour = {
      schedule: {
        start: {
          time: now.toFormat("HH:mm"),
          format: "HH:mm",
        },
        duration: { amount: 1, format: "h" },
      },
    };

    nowWithinHourAndAHalf = {
      schedule: {
        start: {
          time: now.toFormat("HH:mm"),
          format: "HH:mm",
        },
        duration: { amount: 1.5, format: "h" },
      },
    };

    fiveHoursInTheFuture = {
      schedule: {
        start: { time: now.plus({ hours: 5 }).toISO() },
        duration: { amount: 5, format: "h" },
      },
    };

    specificDateAndTime = {
      schedule: {
        start: {
          time: "2018-02-14 06:55",
          format: "yyyy-MM-dd HH:mm",
          timeZone: "America/New_York",
        },
        duration: { amount: 155, format: "minutes" },
      },
    };

    centralNow = {
      schedule: {
        start: {
          time: now.setZone("America/Chicago").toFormat("HH:mm:ss ZZ"),
          format: "HH:mm:ss ZZ",
          timeZone: "America/Chicago",
        },
        duration: { amount: 5, format: "s" },
      },
    };

    keithIntro = {
      schedule: {
        start: {
          time: "4:00 Z",
          format: "H:mm Z",
          timeZone: "America/New_York",
        },
        duration: { amount: 6, format: "h" },
      },
    };

    jimAndDebIntro = {
      schedule: {
        start: {
          time: "10:00 Z",
          format: "H:mm Z",
          timeZone: "America/New_York",
        },
        duration: {
          amount: 4,
          format: "h",
        },
      },
    };
  });

  it("returns undefined for an empty list", () => {
    expect(findSchedulableMatch([])).to.be.undefined;
  });

  it("returns undefined when it can't find a match", () => {
    expect(findSchedulableMatch([fiveHoursInTheFuture])).to.be.undefined;
  });

  it("uses the current time when no time is passed in", () => {
    expect(findSchedulableMatch([nowForFiveSeconds])).to.equal(nowForFiveSeconds);
  });

  it("doesn't crash with bad data", () => {
    expect(() => findSchedulableMatch([badData])).to.not.throw();
  });

  it("returns undefined when passed undefined", () => {
    expect(findSchedulableMatch(undefined)).to.be.undefined;
  });

  it("returns undefined when passed an object", () => {
    expect(findSchedulableMatch({} as any[])).to.be.undefined;
  });

  it("returns undefined for bad data", () => {
    expect(findSchedulableMatch([badData])).to.be.undefined;
  });

  it("does not match if incorrect day of week", () => {
    expect(findSchedulableMatch([tomorrow])).to.be.undefined;
  });

  it("matches with correct day of week", () => {
    expect(findSchedulableMatch([tomorrow, today])).to.equal(today);
  });

  it("matches for the correct time zone", () => {
    const forDate = now.setZone("America/Chicago");
    expect(findSchedulableMatch([centralNow], forDate)).to.equal(centralNow);
  });

  describe("with keithIntro and jimAndDebIntro", () => {
    it("matches keithIntro at 4:59 AM Central", () => {
      const dt = DateTime.fromFormat("2017-07-19 4:59 AM -05:00", "yyyy-MM-dd h:mm a Z");
      const clock = sinon.useFakeTimers(dt.toMillis());
      try {
        // Keith Intro is at 4:00 AM Eastern, which is 3:00 AM Central
        // Jim & Deb Intro is at 10:00 AM Eastern, which is 9:00 AM Central
        expect(findSchedulableMatch([keithIntro, jimAndDebIntro], dt)).to.equal(keithIntro);
      } finally {
        clock.restore();
      }
    });

    it("matches jimAndDebIntro at 10:01 AM Eastern", () => {
      const dt = DateTime.fromFormat("2017-07-19 10:01 AM -04:00", "yyyy-MM-dd h:mm a Z", {
        zone: "America/New_York",
      });
      const clock = sinon.useFakeTimers(dt.toMillis());
      try {
        expect(findSchedulableMatch([keithIntro, jimAndDebIntro], dt)).to.equal(jimAndDebIntro);
      } finally {
        clock.restore();
      }
    });
  });

  describe("with a specific date", () => {
    it("matches correctly on the right day", () => {
      const forDate = DateTime.fromFormat("2/14/2018 7:05:00 -05:00", SCHEDULE_DEBUG_FORMAT, {
        zone: "America/New_York",
      });
      expect(findSchedulableMatch([specificDateAndTime], forDate)).to.equal(specificDateAndTime);
    });

    it("does not match on the wrong day", () => {
      const forDate = DateTime.fromFormat("2/13/2018 7:05:00 -05:00", SCHEDULE_DEBUG_FORMAT, {
        zone: "America/New_York",
      });
      expect(findSchedulableMatch([specificDateAndTime], forDate)).to.be.undefined;
    });
  });

  it("picks the most specific when multiple match", () => {
    expect(findSchedulableMatch([nowForFiveSeconds, nowWithinHour])).to.equal(nowForFiveSeconds);
  });

  it("handles decimal durations", () => {
    expect(findSchedulableMatch([nowWithinHourAndAHalf])).to.equal(nowWithinHourAndAHalf);
  });

  describe("backwards compatibility", () => {
    it("matches a schedule using 'H:mm Z D' format", () => {
      const testDate = DateTime.fromISO("2017-03-03T05:00:00.000-05:00"); // 5am local time on March 3, 2017
      const schedulable: Schedulable & { token: string; url: string } = {
        token: "token-test",
        url: "https://test.url",
        schedule: {
          start: {
            time: "0:00 -0500 3",
            format: "H:mm Z D",
          },
          duration: {
            amount: 24,
            format: "h",
          },
        },
      };

      const match = findSchedulableMatch([schedulable], testDate);
      expect(match).to.equal(schedulable);
    });
  });
});
