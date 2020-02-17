/*! Copyright (c) 2019, XAPPmedia */
import { Schedulable } from "stentor-models";
import { expect } from "chai";
import { findWithoutSchedule } from "../findWithoutSchedule";

const noSchedule: object = { name: "zero" };

const scheduled: Schedulable = {
    schedule: {
        start: {
            time: "4:00 Z",
            format: "H:mm Z",
            timeZone: "America/New_York"
        },
        duration: {
            amount: 6,
            format: "h"
        }
    }
};

describe("#findWithoutSchedule()", () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(findWithoutSchedule(undefined)).to.be.undefined;
        });
    });
    describe("when passed an empty array", () => {
        it("returns undefined", () => {
            expect(findWithoutSchedule([])).to.be.undefined;
        });
    });
    describe("when passed an array with just a scheduled object", () => {
        it("returns undefined", () => {
            expect(findWithoutSchedule([scheduled])).to.be.undefined;
        });
    });
    describe("when passed an array with a schedulable and object", () => {
        it("returns the object", () => {
            expect(findWithoutSchedule([noSchedule, scheduled])).to.equal(noSchedule);
        });
    });
});
