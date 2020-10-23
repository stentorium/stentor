/*! Copyright (c) 2019, XAPPmedia */
/* tslint:disable:no-magic-numbers */
import { expect } from "chai";
import * as sinon from "sinon";

import { History } from "stentor-models";
import { DEFAULT_HISTORY_SIZE, trimHistory, TrimOptions } from "../trimHistory";

const ONE_HOUR_IN_SECONDS = 3600;
const ONE_MONTH_IN_SECONDS = 2628000;
const ONE_YEAR_IN_SECONDS = 31536000;

const HISTORY_SIZE = 4;

const OFFSET = 5000;

const trimOptions: TrimOptions = {
    tttSeconds: ONE_HOUR_IN_SECONDS,
    historySize: HISTORY_SIZE,
    lastPlayedForgetSeconds: ONE_YEAR_IN_SECONDS
};

describe("#trimHistory", () => {
    let NOW: number;

    let clock: sinon.SinonFakeTimers;

    beforeEach(() => {
        const date = new Date("2018-10-19T13:04:36Z");
        clock = sinon.useFakeTimers(date.getTime());
        NOW = Date.now();
    });
    afterEach(() => {
        clock.restore();
    });
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(trimHistory(undefined)).to.be.undefined;
        });
    });
    describe("with long handler history", () => {
        const history: History = {
            lastTrimmed: NOW - ONE_HOUR_IN_SECONDS * 1000 - 600000, // 1 hour plus 10 minutes ago
            handler: []
        };
        beforeEach(() => {
            /* tslint:disable:prefer-for-of */
            for (let i = 0; i < 30; i++) {
                history.handler.push({
                    sessionId: "sessionId",
                    intentId: `intent${i}`,
                    timestamp: i
                });
            }
            /* tslint:enable:prefer-for-of */
        });
        it("trims the handler history", () => {
            const trimmed = trimHistory(history);
            expect(trimmed.handler).to.have.length(DEFAULT_HISTORY_SIZE);
            expect(trimmed.handler[0].timestamp).to.equal(29);
        });
    });
    it("Test with larger than max size", () => {
        const history: History = {
            lastTrimmed: NOW - ONE_HOUR_IN_SECONDS * 1000 - 600000, // 1 hour plus 10 minutes ago
            token1: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 1000 },
            token5: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 5 * 1000 },
            token3: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 3 * 1000 },
            token2: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 2 * 1000 },
            token4: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 4 * 1000 },
            token6: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 6 * 1000 }
        };

        const newHistory = trimHistory(history, trimOptions);

        const lastTrimmed = newHistory.lastTrimmed;
        expect(NOW - lastTrimmed).lessThan(10);

        delete newHistory.lastTrimmed;

        expect(Object.keys(newHistory)).length(4);
        expect(newHistory).to.deep.equal({
            token1: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 1000 },
            token2: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 2 * 1000 },
            token3: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 3 * 1000 },
            token4: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 4 * 1000 }
        });
    });
    it("Test with early TS", () => {
        const history: History = {
            lastTrimmed: NOW - ONE_HOUR_IN_SECONDS * 1000 + 600000, // 1 hr - 10 minutes
            token1: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 1000 },
            token5: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 5 * 1000 },
            token3: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 3 * 1000 },
            token2: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 2 * 1000 },
            token4: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 4 * 1000 },
            token6: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 6 * 1000 }
        };

        const lastTrimmed = history.lastTrimmed;
        const newHistory = trimHistory(history, trimOptions);
        expect(newHistory.lastTrimmed).equal(lastTrimmed);

        expect(Object.keys(newHistory)).length(7); // with TS
    });
    it("Test with old entries", () => {
        const history: History = {
            lastTrimmed: NOW - ONE_HOUR_IN_SECONDS * 1000 - 600000, // 1 hour plus 10 minutes ago
            token1: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 1000 },
            token5: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 5 * 1000 },
            token3: { currentTime: OFFSET, lastPlayed: NOW - ONE_YEAR_IN_SECONDS * 3 * 1000 },
            token2: { currentTime: OFFSET, lastPlayed: NOW - ONE_YEAR_IN_SECONDS * 2 * 1000 },
            token4: { currentTime: OFFSET, lastPlayed: NOW - ONE_YEAR_IN_SECONDS * 4 * 1000 },
            token6: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 6 * 1000 }
        };

        const newHistory = trimHistory(history, trimOptions);

        const lastTrimmed = newHistory.lastTrimmed;
        expect(NOW - lastTrimmed).lessThan(10);

        delete newHistory.lastTrimmed;

        expect(Object.keys(newHistory)).length(3);
        expect(newHistory).to.deep.equal({
            token1: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 1000 },
            token5: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 5 * 1000 },
            token6: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 6 * 1000 }
        });
    });
    it("Test with last played missing entries", () => {
        const history: History = {
            lastTrimmed: NOW - ONE_HOUR_IN_SECONDS * 1000 - 600000, // 1 hour plus 10 minutes ago
            token1: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 1000 },
            token5: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 5 * 1000 },
            token3: { currentTime: OFFSET },
            token2: { currentTime: OFFSET, lastPlayed: NOW - ONE_YEAR_IN_SECONDS * 2 * 1000 },
            token4: { currentTime: OFFSET, lastPlayed: NOW - ONE_YEAR_IN_SECONDS * 4 * 1000 },
            token6: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 6 * 1000 }
        };

        const newHistory = trimHistory(history, trimOptions);

        const lastTrimmed = newHistory.lastTrimmed;
        expect(NOW - lastTrimmed).lessThan(10);

        delete newHistory.lastTrimmed;

        expect(Object.keys(newHistory)).length(4);
        expect(newHistory).to.deep.equal({
            token3: { currentTime: OFFSET },
            token1: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 1000 },
            token5: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 5 * 1000 },
            token6: { currentTime: OFFSET, lastPlayed: NOW - ONE_MONTH_IN_SECONDS * 6 * 1000 }
        });
    });
});
