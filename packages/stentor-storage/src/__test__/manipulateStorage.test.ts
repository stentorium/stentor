/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { Storage } from "stentor-models";
import { manipulateStorage, performAction } from "../manipulateStorage";

describe("#manipulateStorage()", () => {
    let storage: Storage;
    beforeEach(() => {
        storage = {
            createdTimestamp: 123,
            sessionStore: {
                id: "id",
                data: {}
            }
        };
    });
    describe("when passed undefined storage", () => {
        it("returns undefined", () => {
            expect(manipulateStorage(undefined, [])).to.equal(undefined);
        });
    });
    describe("when passed an empty array", () => {
        it("returns the storage", () => {
            expect(manipulateStorage(storage, [])).to.equal(storage);
        });
    });
    describe("for one action", () => {
        it("completes the action", () => {
            const newStorage = manipulateStorage(storage, [
                {
                    type: "SET",
                    store: "SESSION",
                    key: "FOO",
                    value: "bar"
                }
            ]);
            expect(newStorage.sessionStore.data.FOO).to.equal("bar");
        });
    });
    describe("for multiple actions", () => {
        it("completes the actions", () => {
            const newStorage = manipulateStorage(storage, [
                {
                    type: "SET",
                    store: "SESSION",
                    key: "FOO",
                    value: "bar"
                },
                {
                    type: "SET",
                    store: "SESSION",
                    key: "BAZ",
                    value: 0
                }
            ]);
            expect(newStorage.sessionStore.data.FOO).to.equal("bar");
            expect(newStorage.sessionStore.data.BAZ).to.equal(0);
        });
    });
});

describe("#performAction()", () => {
    let storage: Storage;
    beforeEach(() => {
        storage = {
            createdTimestamp: 123,
            sessionStore: {
                id: "id",
                data: {}
            }
        };
    });
    describe("when passed undefined storage", () => {
        it("returns undefined", () => {
            expect(performAction(undefined, undefined)).to.equal(undefined);
        });
    });
    describe("when passed an undefined action", () => {
        it("returns the storage untouched", () => {
            expect(performAction(storage, undefined)).to.equal(storage);
        });
    });
    describe("for a SET action", () => {
        describe("on SESSION store", () => {
            it("sets a key that did not exist before", () => {
                const newStorage = performAction(storage, {
                    type: "SET",
                    store: "SESSION",
                    key: "FOO",
                    value: "bar"
                });
                expect(newStorage.sessionStore.data.FOO).to.equal("bar");
            });
            it("overwrites a key that did not exist before", () => {
                storage.sessionStore.data.BAZ = 1;
                const NEW_VALUE = 5;
                const newStorage = performAction(storage, {
                    type: "SET",
                    store: "SESSION",
                    key: "BAZ",
                    value: NEW_VALUE
                });
                expect(newStorage.sessionStore.data.BAZ).to.equal(NEW_VALUE);
            });
        });
        describe("on PERMANENT store", () => {
            it("sets the key-value pair on the storage", () => {
                const newStorage = performAction(storage, {
                    type: "SET",
                    store: "PERMANENT",
                    key: "FOO",
                    value: "bar"
                });
                expect(newStorage.FOO).to.equal("bar");
            });
        });
    });
    describe("for a DELETE action", () => {
        it("throws an error", () => {
            expect(
                performAction.bind(this, storage, {
                    type: "DELETE",
                    store: "SESSION",
                    key: "FOO",
                    value: "bar"
                })
            ).to.throw("Unsupported storage action DELETE");
        });
    });
});
