/*! Copyright (c) 2025, XAPP AI */
import { expect } from "chai";

import { zipToTz } from "../zipToTZ";

describe(`#${zipToTz.name}()`, () => {
  it("should return the correct timezone for a known ZIP", () => {
    expect(zipToTz("01038")).to.equal("America/New_York");
    expect(zipToTz("01040")).to.equal("America/New_York");
  });

  it("should handle ZIPs with spaces", () => {
    expect(zipToTz(" 01038 ")).to.equal("America/New_York");
  });

  it("should return undefined for invalid ZIP formats", () => {
    expect(zipToTz("12345-6789")).to.be.undefined;
    expect(zipToTz("abcde")).to.be.undefined;
    expect(zipToTz("123")).to.be.undefined;
    expect(zipToTz("")).to.be.undefined;
  });

  it("returns undefined if ZIP is not found", () => {
    expect(zipToTz("99999")).to.be.undefined;
  });
});
