/*! Copyright (c) 2025, XAPPmedia */
import { expect } from "chai";
import { ConditionalDeterminer } from "stentor-conditional";

import { TimeConditionalCheck } from "../TimeConditionalCheck";

describe("activeWithin in ConditionalDeterminer", () => {
  it("should be available in conditional expressions", () => {
    const context = { lastActiveTimestamp: Date.now() };
    const timeCheck = TimeConditionalCheck(context);
    const determiner = new ConditionalDeterminer([timeCheck]);

    const conditional = {
      conditions: 'activeWithin(1, "day")'
    };

    const results = determiner.determine([conditional]);
    expect(results).to.have.length(1);
    expect(results[0]).to.equal(conditional);
  });

  it("should work with undefined lastActiveTimestamp", () => {
    const context = { lastActiveTimestamp: undefined };
    const timeCheck = TimeConditionalCheck(context);
    const determiner = new ConditionalDeterminer([timeCheck]);

    const conditional = {
      conditions: 'activeWithin(1, "day")'
    };

    const results = determiner.determine([conditional]);
    expect(results).to.have.length(0); // Should not match when no timestamp
  });

  it("should work with recent timestamp", () => {
    const context = { lastActiveTimestamp: Date.now() - (1000 * 60 * 30) }; // 30 minutes ago
    const timeCheck = TimeConditionalCheck(context);
    const determiner = new ConditionalDeterminer([timeCheck]);

    const conditional = {
      conditions: 'activeWithin(1, "hour")'
    };

    const results = determiner.determine([conditional]);
    expect(results).to.have.length(1);
  });

  it("should not match with old timestamp", () => {
    const context = { lastActiveTimestamp: Date.now() - (1000 * 60 * 60 * 25) }; // 25 hours ago
    const timeCheck = TimeConditionalCheck(context);
    const determiner = new ConditionalDeterminer([timeCheck]);

    const conditional = {
      conditions: 'activeWithin(1, "day")'
    };

    const results = determiner.determine([conditional]);
    expect(results).to.have.length(0); // Should not match
  });

  it("should verify function names are correctly processed", () => {
    const context = { lastActiveTimestamp: Date.now() };
    const timeCheck = TimeConditionalCheck(context);
    
    expect(timeCheck.functions).to.exist;
    expect(timeCheck.functions).to.have.length(2);
    
    const activeWithinFunc = timeCheck.functions[0];
    const fitsScheduleFunc = timeCheck.functions[1];
    
    // Verify that function names are available and not bound names
    expect(activeWithinFunc.name).to.equal('activeWithin');
    expect(fitsScheduleFunc.name).to.equal('fitsSchedule');
    
    // Test that the functions work when called directly
    expect(activeWithinFunc(1, "day")).to.be.true;
    expect(fitsScheduleFunc).to.be.a("function");
  });

  it("should handle complex conditional expressions", () => {
    const context = { lastActiveTimestamp: Date.now() - (1000 * 60 * 30) }; // 30 minutes ago
    const timeCheck = TimeConditionalCheck(context);
    const determiner = new ConditionalDeterminer([timeCheck]);

    const conditional = {
      conditions: 'activeWithin(1, "hour") && fitsSchedule("2024-01-01", "yyyy-MM-dd", 365, "days")'
    };

    const results = determiner.determine([conditional]);
    expect(results).to.have.length(1);
  });
});