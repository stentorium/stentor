/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";
import { DateTime } from "luxon";
import * as sinon from "sinon";

import { ActiveWithinable } from "stentor-models";

import { TimeConditionalCheck } from "../TimeConditionalCheck";

const obj: ActiveWithinable = {
  activeWithin: {
    amount: 5,
    format: "days",
  },
};

const now = DateTime.now();
const lastActiveFourMonthsAgo: number = now.minus({ months: 4 }).toMillis();

const YMD_FORMAT = "yyyy-MM-dd";
const yesterday: string = now.minus({ days: 1 }).toFormat(YMD_FORMAT);

describe(`${TimeConditionalCheck.name}`, () => {
  describe(`test`, () => {
    it("returns the correct result", () => {
      expect(TimeConditionalCheck({ lastActiveTimestamp: Date.now() }).test(undefined)).to.be.false;
      expect(TimeConditionalCheck({ lastActiveTimestamp: Date.now() }).test(obj)).to.be.true;
    });
  });
  describe("check", () => {
    it("returns the correct result", () => {
      expect(TimeConditionalCheck({ lastActiveTimestamp: Date.now() }).check(obj)).to.be.true;
    });
  });
  describe("functions", () => {
    it("returns the correct result", () => {
      const lastActive0 = TimeConditionalCheck({ lastActiveTimestamp: Date.now() }).functions[0];
      expect(lastActive0).to.exist;
      expect(lastActive0(5, "days")).to.be.true;

      const lastActive1 = TimeConditionalCheck({ lastActiveTimestamp: lastActiveFourMonthsAgo }).functions[0];
      expect(lastActive1).to.exist;
      expect(lastActive1(5, "days")).to.be.false;

      const fitsSchedule = TimeConditionalCheck({ lastActiveTimestamp: Date.now() }).functions[1];
      expect(fitsSchedule).to.exist;
      expect(fitsSchedule(yesterday, YMD_FORMAT, 4, "days")).to.be.true;
    });

    it("fits a Moment-style schedule with a bare T and a single-digit hour", () => {
      const fitsSchedule = TimeConditionalCheck({ lastActiveTimestamp: Date.now() }).functions[1];
      const args = ["09-19-2026T6:55 pm", "MM-DD-YYYYThh:mm a", 330, "minutes", "America/New_York"];
      const at = (iso: string): number => DateTime.fromISO(iso, { zone: "America/New_York" }).toMillis();

      const clock = sinon.useFakeTimers(at("2026-09-19T20:00:00"));
      try {
        expect(fitsSchedule(...args)).to.be.true;
        clock.setSystemTime(at("2026-09-19T18:50:00"));
        expect(fitsSchedule(...args)).to.be.false;
        clock.setSystemTime(at("2026-09-20T00:25:00"));
        expect(fitsSchedule(...args)).to.be.false;
      } finally {
        clock.restore();
      }
    });

    it("handles undefined lastActiveTimestamp", () => {
      const lastActiveUndefined = TimeConditionalCheck({ lastActiveTimestamp: undefined }).functions[0];
      expect(lastActiveUndefined).to.exist;
      expect(lastActiveUndefined(1, "day")).to.be.false;
    });
  });
});
