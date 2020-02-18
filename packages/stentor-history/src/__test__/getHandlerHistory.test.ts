/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { HandlerHistoryData, History } from "stentor-models";
import { getHandlerHistory } from "../getHandlerHistory";

const history: History = {
    ["token1"]: {
        currentTime: 0,
        lastPlayed: 333
    },
    ["token2"]: {
        currentTime: 55,
        lastPlayed: 555
    },
    handler: [
        {
            /* 0 */
            intentId: "intent1",
            sessionId: "1",
            timestamp: 4
        },
        {
            /* 1 */
            intentId: "intent2",
            sessionId: "1",
            timestamp: 2
        },
        {
            /* 2 */
            intentId: "intent3",
            sessionId: "0",
            timestamp: 5
        }
    ]
};

describe("#getHandlerHistory()", () => {
    describe("when passed undefined", () => {
        it("returns an empty array", () => {
            expect(getHandlerHistory(undefined)).to.have.length(0);
        });
    });
    describe("when passed history", () => {
        let handlerHistory: HandlerHistoryData[];
        beforeEach(() => {
            handlerHistory = getHandlerHistory(history);
        });
        it("returns an array of handler data", () => {
            const NUMBER_OF_INTENTS = 3;
            expect(handlerHistory).to.have.length(NUMBER_OF_INTENTS);
        });
        it("orders in reverse chronological", () => {
            expect(handlerHistory[0]).to.equal(history.handler[2]);
            expect(handlerHistory[1]).to.equal(history.handler[0]);
            expect(handlerHistory[2]).to.equal(history.handler[1]);
        });
    });
});
