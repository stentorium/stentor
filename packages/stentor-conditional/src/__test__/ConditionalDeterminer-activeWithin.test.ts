/*! Copyright (c) 2025, XAPPmedia */
import { expect } from "chai";
import { ConditionalDeterminer } from "../ConditionalDeterminer";
import { TimeConditionalCheck } from "stentor-time";
import { Conditional } from "stentor-models";

describe("ConditionalDeterminer activeWithin function", () => {
    describe("when evaluating string conditions with activeWithin", () => {
        it("should make activeWithin function available in sandbox", () => {
            const conditionalDeterminer = new ConditionalDeterminer([
                TimeConditionalCheck({ lastActiveTimestamp: Date.now() - 1000 }) // 1 second ago
            ]);

            const conditionals: Conditional<any>[] = [
                {
                    id: "test-conditional",
                    conditions: 'activeWithin(1, "day")'
                }
            ];

            // This should not throw a ReferenceError
            const result = conditionalDeterminer.determine(conditionals);
            expect(result).to.have.length(1);
            expect(result[0]).to.equal(conditionals[0]);
        });

        it("should handle activeWithin with undefined lastActiveTimestamp", () => {
            const conditionalDeterminer = new ConditionalDeterminer([
                TimeConditionalCheck({ lastActiveTimestamp: undefined })
            ]);

            const conditionals: Conditional<any>[] = [
                {
                    id: "test-conditional",
                    conditions: 'activeWithin(1, "day")'
                }
            ];

            // Should not throw error, but should return empty array since condition evaluates to false
            const result = conditionalDeterminer.determine(conditionals);
            expect(result).to.have.length(0);
        });

        it("should handle activeWithin with old timestamp", () => {
            // Timestamp from a week ago
            const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
            
            const conditionalDeterminer = new ConditionalDeterminer([
                TimeConditionalCheck({ lastActiveTimestamp: weekAgo })
            ]);

            const conditionals: Conditional<any>[] = [
                {
                    id: "test-conditional",
                    conditions: 'activeWithin(1, "day")'
                }
            ];

            // Should not throw error, but should return empty array since user was not active within 1 day
            const result = conditionalDeterminer.determine(conditionals);
            expect(result).to.have.length(0);
        });
    });
});