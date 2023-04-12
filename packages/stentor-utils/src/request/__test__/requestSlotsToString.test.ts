/*! Copyright (c) 2020, XAPPmedia */

import { expect } from "chai";
import { requestSlotsToString } from "../requestSlotsToString";

describe(`#${requestSlotsToString.name}()`, () => {
    it('returns the correct value', () => {
        expect(requestSlotsToString(undefined)).to.equal("");
        // @ts-expect-error For testing bad input
        expect(requestSlotsToString(true)).to.equal("");
        expect(requestSlotsToString(null)).to.equal("");
        // @ts-expect-error For testing bad input
        expect(requestSlotsToString([])).to.equal("");
        expect(requestSlotsToString({})).to.equal("");
        expect(requestSlotsToString({
            name: {
                name: "name",
                value: "Bob Vance"
            }
        })).to.equal("name:Bob Vance");
        expect(requestSlotsToString({
            name: {
                name: "name",
                value: "Bob Vance"
            },
            birthday: {
                name: "birthday",
                value: { date: "2019-09-11", time: "18:30:00", tz: "Z" }
            }
        })).to.equal("name:Bob Vance  birthday:2019-09-11T18:30:00");
    });
});