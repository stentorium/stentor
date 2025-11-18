/*! Copyright (c) 2025, XAPP AI */
import { expect } from "chai";
import { normalizeLegacyFormat } from "../normalizeLegacyFormat"; // Adjust import path as needed

describe("normalizeLegacyFormat", () => {
  describe("basic date formats", () => {
    it("should convert basic ISO date format", () => {
      const result = normalizeLegacyFormat("YYYY-MM-DD");
      expect(result).to.equal("yyyy-MM-dd");
    });

    it("should convert European date format", () => {
      const result = normalizeLegacyFormat("DD/MM/YYYY");
      expect(result).to.equal("dd/MM/yyyy");
    });

    it("should convert US date format", () => {
      const result = normalizeLegacyFormat("MM/DD/YYYY");
      expect(result).to.equal("MM/dd/yyyy");
    });
  });

  describe("time formats", () => {
    it("should convert 24-hour time format", () => {
      const result = normalizeLegacyFormat("HH:mm:ss");
      expect(result).to.equal("HH:mm:ss");
    });

    it("should convert 12-hour time format with AM/PM", () => {
      const result = normalizeLegacyFormat("h:mm A");
      expect(result).to.equal("h:mm a");
    });

    it("should convert 12-hour time format with lowercase am/pm", () => {
      const result = normalizeLegacyFormat("hh:mm a");
      expect(result).to.equal("hh:mm a");
    });
  });

  describe("month name formats", () => {
    it("should convert full month name format", () => {
      const result = normalizeLegacyFormat("MMMM Do, YYYY");
      expect(result).to.equal("MMMM Do, yyyy");
    });

    it("should convert short month name format", () => {
      const result = normalizeLegacyFormat("MMM DD, YYYY");
      expect(result).to.equal("MMM dd, yyyy");
    });

    it("should convert numeric month format", () => {
      const result = normalizeLegacyFormat("M/D/YYYY");
      expect(result).to.equal("M/d/yyyy");
    });
  });

  describe("weekday formats", () => {
    it("should convert full weekday name format", () => {
      const result = normalizeLegacyFormat("dddd, MMMM Do YYYY");
      expect(result).to.equal("cccc, MMMM Do yyyy");
    });

    it("should convert short weekday name format", () => {
      const result = normalizeLegacyFormat("ddd MMM DD");
      expect(result).to.equal("ccc MMM dd");
    });

    it("should convert min weekday name format", () => {
      const result = normalizeLegacyFormat("dd MM/DD");
      expect(result).to.equal("cc MM/dd");
    });

    it("should convert weekday number format", () => {
      const result = normalizeLegacyFormat("d - MM/DD");
      expect(result).to.equal("c - MM/dd");
    });
  });

  describe("special formats", () => {
    it("should convert day of year format", () => {
      const result = normalizeLegacyFormat("YYYY-DDD");
      expect(result).to.equal("yyyy-o");
    });

    it("should convert padded day of year format", () => {
      const result = normalizeLegacyFormat("YYYY-DDDD");
      expect(result).to.equal("yyyy-ooo");
    });

    it("should convert week of year format", () => {
      const result = normalizeLegacyFormat("ww [weeks]");
      expect(result).to.equal("WW 'weeks'");
    });

    it("should convert quarter format", () => {
      const result = normalizeLegacyFormat("Q[Q] YYYY");
      expect(result).to.equal("q'Q' yyyy");
    });
  });

  describe("timezone formats", () => {
    it("should convert timezone offset with colon", () => {
      const result = normalizeLegacyFormat("YYYY-MM-DD[T]HH:mm:ssZ");
      expect(result).to.equal("yyyy-MM-dd'T'HH:mm:ssZZ");
    });

    it("should convert timezone offset without colon", () => {
      const result = normalizeLegacyFormat("YYYY-MM-DD[T]HH:mm:ssZZ");
      expect(result).to.equal("yyyy-MM-dd'T'HH:mm:ssZZZ");
    });
  });

  describe("millisecond formats", () => {
    it("should convert millisecond format", () => {
      const result = normalizeLegacyFormat("HH:mm:ss.SSS");
      expect(result).to.equal("HH:mm:ss.SSS");
    });

    it("should convert centisecond format", () => {
      const result = normalizeLegacyFormat("HH:mm:ss.SS");
      expect(result).to.equal("HH:mm:ss.SS");
    });

    it("should convert decisecond format", () => {
      const result = normalizeLegacyFormat("HH:mm:ss.S");
      expect(result).to.equal("HH:mm:ss.S");
    });
  });

  describe("escaped text handling", () => {
    it("should convert single escaped text segment", () => {
      const result = normalizeLegacyFormat("[Today is] dddd");
      expect(result).to.equal("'Today is' cccc");
    });

    it("should convert multiple escaped text segments", () => {
      const result = normalizeLegacyFormat("[Date:] YYYY-MM-DD [Time:] HH:mm");
      expect(result).to.equal("'Date:' yyyy-MM-dd 'Time:' HH:mm");
    });

    it("should handle escaped brackets", () => {
      const result = normalizeLegacyFormat("YYYY-MM-DD[T]HH:mm:ss[Z]");
      expect(result).to.equal("yyyy-MM-dd'T'HH:mm:ss'Z'");
    });

    it("should handle empty escaped text", () => {
      const result = normalizeLegacyFormat("YYYY[] MM");
      expect(result).to.equal("yyyy'' MM");
    });
  });

  describe("complex combined formats", () => {
    it("should convert full datetime with timezone", () => {
      const result = normalizeLegacyFormat("dddd, MMMM Do YYYY [at] h:mm A Z");
      expect(result).to.equal("cccc, MMMM Do yyyy 'at' h:mm a ZZ");
    });

    it("should convert log timestamp format", () => {
      const result = normalizeLegacyFormat("[LOG] YYYY-MM-DD HH:mm:ss.SSS");
      expect(result).to.equal("'LOG' yyyy-MM-dd HH:mm:ss.SSS");
    });

    it("should handle mixed case and special characters", () => {
      const result = normalizeLegacyFormat("ddd, MMM Do ['YY] @ h:mm A");
      expect(result).to.equal("ccc, MMM Do ''YY' @ h:mm a");
    });
  });

  describe("unix timestamp formats", () => {
    it("should convert unix timestamp format", () => {
      const result = normalizeLegacyFormat("X");
      expect(result).to.equal("X");
    });

    it("should convert unix millisecond timestamp format", () => {
      const result = normalizeLegacyFormat("x");
      expect(result).to.equal("x");
    });
  });

  describe("production format cases", () => {
    it("should convert format with timezone and day number", () => {
      // Production case: "0:00 -0500 3" with format "H:mm Z D"
      const result = normalizeLegacyFormat("H:mm Z D");
      expect(result).to.equal("H:mm ZZ d");
    });

    it("should convert simple time with timezone format", () => {
      // Production case: "4:00 Z" with format "H:mm Z"
      const result = normalizeLegacyFormat("H:mm Z");
      expect(result).to.equal("H:mm ZZ");
    });

    it("should handle already normalized Luxon format", () => {
      // Production case: "2018-02-14 06:55" with format "yyyy-MM-dd HH:mm"
      const result = normalizeLegacyFormat("yyyy-MM-dd HH:mm");
      expect(result).to.equal("yyyy-MM-dd HH:mm");
    });

    it("should convert mixed legacy and modern format", () => {
      // Edge case: partially converted format
      const result = normalizeLegacyFormat("YYYY-MM-dd HH:mm");
      expect(result).to.equal("yyyy-MM-dd HH:mm");
    });

    it("should handle timezone with day of week", () => {
      // Additional production-like case
      const result = normalizeLegacyFormat("ddd H:mm Z");
      expect(result).to.equal("ccc H:mm ZZ");
    });

    it("should convert datetime with timezone offset", () => {
      // Production-like case with full datetime and timezone
      const result = normalizeLegacyFormat("YYYY-MM-DD HH:mm:ss Z");
      expect(result).to.equal("yyyy-MM-dd HH:mm:ss ZZ");
    });

    it("should handle time with compact timezone", () => {
      // Production case with ZZ (no colon) timezone
      const result = normalizeLegacyFormat("H:mm ZZ D");
      expect(result).to.equal("H:mm ZZZ d");
    });
  });

  describe("edge cases", () => {
    it("should handle empty string", () => {
      const result = normalizeLegacyFormat("");
      expect(result).to.equal("");
    });

    it("should handle format with no moment tokens", () => {
      const result = normalizeLegacyFormat("Hello World");
      expect(result).to.equal("Hello World");
    });

    it("should handle format with only escaped text", () => {
      const result = normalizeLegacyFormat("[Static Text Only]");
      expect(result).to.equal("'Static Text Only'");
    });

    it("should preserve non-moment format tokens", () => {
      const result = normalizeLegacyFormat("YYYY-MM-DD abc XYZ");
      expect(result).to.equal("yyyy-MM-dd abc XYZ");
    });
  });

  describe("token ordering and replacement", () => {
    it("should handle overlapping tokens correctly (YYYY vs YY)", () => {
      const result = normalizeLegacyFormat("YY YYYY");
      expect(result).to.equal("yy yyyy");
    });

    it("should handle overlapping tokens correctly (DD vs D)", () => {
      const result = normalizeLegacyFormat("D DD DDD DDDD");
      expect(result).to.equal("d dd o ooo");
    });

    it("should handle overlapping tokens correctly (SSS vs SS vs S)", () => {
      const result = normalizeLegacyFormat("S SS SSS");
      expect(result).to.equal("S SS SSS");
    });
  });
});
