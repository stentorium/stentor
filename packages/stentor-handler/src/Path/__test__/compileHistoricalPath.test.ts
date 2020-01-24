/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { ContextBuilder } from "stentor-context";
import { Context, HistoricalPath } from "stentor-models";
import { compileHistoricalPath } from "../compileHistoricalPath";

const path0: HistoricalPath = {
    historicalIndex: 0
};

const path1: HistoricalPath = {
    historicalIndex: 1
};

describe("#compileHistoricalPath()", () => {
    describe("when passed undefined parameters", () => {
        it("returns undefined", () => {
            expect(compileHistoricalPath(undefined, undefined)).to.be.undefined;
            expect(compileHistoricalPath(path0, undefined)).to.be.undefined;
        });
    });
    describe("when passed a path and context", () => {
        let context: Context;
        beforeEach(() => {
            context = new ContextBuilder()
                .withStorage({
                    createdTimestamp: 123,
                    lastActiveTimestamp: 1234,
                    history: {
                        handler: [
                            {
                                sessionId: "sessionId",
                                intentId: "intent1",
                                timestamp: 1
                            }
                        ]
                    }
                })
                .build();
        });
        it("returns the path with updated intentId", () => {
            expect(compileHistoricalPath(path0, context)).to.deep.equal({
                intentId: "intent1",
                type: "START"
            });
        });
        describe("when passed a path without enough history", () => {
            it("returns undefined", () => {
                expect(compileHistoricalPath(path1, context)).to.be.undefined;
            });
        });
    });
});
