/*! Copyright (c) 2025, XAPP AI */
import { expect } from "chai";

import { getDurationMs } from "../getDurationMs";

describe("getDurationMs", () => {
  it("returns correct milliseconds for each supported format", () => {
    expect(getDurationMs(1, "milliseconds")).to.equal(1);
    expect(getDurationMs(1, "seconds")).to.equal(1000);
    expect(getDurationMs(1, "minutes")).to.equal(60_000);
    expect(getDurationMs(1, "hours")).to.equal(3_600_000);
    expect(getDurationMs(1, "days")).to.equal(86_400_000);
    expect(getDurationMs(1, "weeks")).to.equal(604_800_000);
    expect(getDurationMs(1, "months")).to.equal(2_592_000_000);
    expect(getDurationMs(1, "years")).to.equal(31_536_000_000);
  });

  it("handles zero correctly", () => {
    expect(getDurationMs(0, "minutes")).to.equal(0);
  });

  it("throws on negative values", () => {
    expect(() => getDurationMs(-5, "minutes")).to.throw("Invalid duration amount");
  });

  it("throws on NaN", () => {
    expect(() => getDurationMs(NaN, "hours")).to.throw("Invalid duration amount");
  });

  it("throws on invalid format", () => {
    expect(() => getDurationMs(1, "decades" as any)).to.throw("Unsupported duration format");
  });

  it("throws on non-number input", () => {
    expect(() => getDurationMs("5" as any, "minutes")).to.throw("Invalid duration amount");
  });
});
