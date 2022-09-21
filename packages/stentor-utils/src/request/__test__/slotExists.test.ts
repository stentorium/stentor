/*! Copyright (c) 2022, XAPP AI */
import { expect } from 'chai';

import { slotExists } from "../slotExists";

describe(`#${slotExists.name}()`, () => {
    it("returns the correct value", () => {
        expect(slotExists({}, ["foo"])).to.be.false;
        expect(slotExists({}, [])).to.be.false;
        expect(slotExists({
            foo: {
                name: "foo",
                value: "foo"
            }
        }, ["bar"])).to.be.false;
        expect(slotExists({
            foo: {
                name: "foo",
                value: "foo"
            }
        }, ["foo"])).to.be.true;
        expect(slotExists({
            foo: {
                name: "foo",
                value: "foo"
            }
        }, ["foo", "bar"])).to.be.true;
        expect(slotExists({
            foo: {
                name: "foo",
                value: "foo"
            },
            bar: {
                name: "bar",
                value: "bar"
            }
        }, ["foo", "bar"])).to.be.true;
        expect(slotExists({
            foo: {
                name: "foo",
                value: "foo"
            },
            bar: {
                name: "bar",
                value: "bar"
            }
        }, ["bar", "baz"])).to.be.true;
        expect(slotExists({
            foo: {
                name: "foo",
                value: "foo"
            },
            bar: {
                name: "bar",
                value: "bar"
            }
        }, ["baz"])).to.be.false;
    });
});