/*! Copyright (c) 2019, XAPPmedia */
/* tslint:disable:no-magic-numbers */
import { ActiveWithinable, FirstTimeable, HaveNotSeenWithinable } from "stentor-models";
import { expect } from "chai";
import * as moment from "moment";
import { findLastActiveMatch } from "../findLastActiveMatch";

const activeWithin0: ActiveWithinable = {
    activeWithin: {
        amount: 5,
        format: "minutes"
    }
};
const activeWithin1: ActiveWithinable = {
    activeWithin: {
        amount: 5,
        format: "months"
    }
};
const activeWithin2: ActiveWithinable = {
    activeWithin: {
        amount: 5,
        format: "hours"
    }
};
const haveNotSeenWithin: HaveNotSeenWithinable = {
    haveNotSeenWithin: {
        amount: 5,
        format: "minutes"
    }
};
const haveNotSeenWithin0: HaveNotSeenWithinable = {
    haveNotSeenWithin: {
        amount: 10,
        format: "minutes"
    }
};
const firstTime0: FirstTimeable = {
    firstTime: true
};
describe("#findLastActiveMatch()", () => {
    it("returns undefined when passed undefined", () => {
        expect(findLastActiveMatch(undefined, {})).to.be.undefined;
    });
    it("returns undefined when passed undefined context", () => {
        expect(findLastActiveMatch([activeWithin1], undefined)).to.be.undefined;
    });
    describe("when passed undefined lastActiveTimestamp", () => {
        describe("without a FirstTimeResponse", () => {
            it("returns undefined", () => {
                expect(findLastActiveMatch([], {})).to.be.undefined;
            });
        });
        describe("with a FirstTime", () => {
            it("returns the response", () => {
                expect(findLastActiveMatch([firstTime0, activeWithin0, haveNotSeenWithin], {})).to.equal(firstTime0);
            });
        });
    });
    describe("when passed a valid ActiveWithin", () => {
        it("returns the ActiveWithinResponse", () => {
            const lastActiveTimestamp: number = moment()
                .subtract(4, "months")
                .valueOf();
            const response = findLastActiveMatch([activeWithin1], { lastActiveTimestamp });
            expect(response).to.equal(activeWithin1);
        });
    });
    describe("when passed many valid ActiveWithin", () => {
        it("returns the one that has the most concise duration", () => {
            const lastActiveTimestamp: number = moment()
                .subtract(2, "hours")
                .valueOf();
            const response = findLastActiveMatch([activeWithin2, activeWithin1], { lastActiveTimestamp });
            expect(response).to.equal(activeWithin2);
        });
    });
    describe("when passed a valid and invalid ActiveWithin", () => {
        it("returns the valid one", () => {
            const lastActiveTimestamp: number = moment()
                .subtract(10, "hours")
                .valueOf();
            const response = findLastActiveMatch([activeWithin2, activeWithin1], { lastActiveTimestamp });
            expect(response).to.equal(activeWithin1);
        });
    });
    describe("when passed a valid HaveNotSeenWithin", () => {
        it("returns the HaveNotSeenWithin", () => {
            const lastActiveTimestamp: number = moment()
                .subtract(10, "minutes")
                .valueOf();
            const response = findLastActiveMatch([haveNotSeenWithin], { lastActiveTimestamp });
            expect(response).to.equal(haveNotSeenWithin);
        });
    });
    describe("when passed many valid HaveNotSeenWithin", () => {
        it("returns the one that is closest to the current time", () => {
            const lastActiveTimestamp: number = moment()
                .subtract(15, "minutes")
                .valueOf();
            const response = findLastActiveMatch([haveNotSeenWithin0, haveNotSeenWithin], { lastActiveTimestamp });
            expect(response).to.equal(haveNotSeenWithin);
        });
    });
    describe("when passed a valid ActiveWithin and HaveNotSeenWithin", () => {
        it("returns the HaveNotSeenWithin", () => {
            const lastActiveTimestamp: number = moment()
                .subtract(15, "minutes")
                .valueOf();
            const response = findLastActiveMatch([haveNotSeenWithin, activeWithin2], { lastActiveTimestamp });
            expect(response).to.equal(haveNotSeenWithin);
        });
    });
    describe("when passed a invalid ActiveWithin and valid HaveNotSeenWithin", () => {
        it("returns the HaveNotSeenWithin", () => {
            const lastActiveTimestamp: number = moment()
                .subtract(15, "minutes")
                .valueOf();
            const response = findLastActiveMatch([haveNotSeenWithin, activeWithin0], { lastActiveTimestamp });
            expect(response).to.equal(haveNotSeenWithin);
        });
    });
});
