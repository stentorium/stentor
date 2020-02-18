/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { STORAGE_ACTION_ADD, STORAGE_ACTION_DELETE, STORAGE_ACTION_SET, STORAGE_ACTION_SUBTRACT } from "../Constants";
import { add } from "../StorageActionExecutorAdd";
import { StorageActionExecutorFactory } from "../StorageActionExecutorFactory";
import { set } from "../StorageActionExecutorSet";
import { subtract } from "../StorageActionExecutorSubtract";

describe("StorageActionExecutorFactory", () => {
    let factory: StorageActionExecutorFactory;
    beforeEach(() => {
        factory = new StorageActionExecutorFactory();
    });
    describe("#executorForAction()", () => {
        describe("when passed undefined", () => {
            it("throw an error", () => {
                expect(factory.executorForAction).to.throw(
                    "Unable to determine executor.  Undefined was passed for the action."
                );
            });
        });
        describe("when passed a subtract action", () => {
            it("returns the add executor", () => {
                expect(
                    factory.executorForAction({
                        store: "PERMANENT",
                        type: STORAGE_ACTION_SUBTRACT,
                        key: "key",
                        value: "value"
                    })
                ).to.equal(subtract);
            });
        });
        describe("when passed an addition action", () => {
            it("returns the add executor", () => {
                expect(
                    factory.executorForAction({
                        store: "PERMANENT",
                        type: STORAGE_ACTION_ADD,
                        key: "key",
                        value: "value"
                    })
                ).to.equal(add);
            });
        });
        describe("when passed a set action", () => {
            it("returns the add executor", () => {
                expect(
                    factory.executorForAction({
                        store: "PERMANENT",
                        type: STORAGE_ACTION_SET,
                        key: "key",
                        value: "value"
                    })
                ).to.equal(set);
            });
        });
        describe("when passed an unknown action", () => {
            it("throws an error", () => {
                expect(
                    factory.executorForAction.bind(this, {
                        store: "PERMANENT",
                        type: STORAGE_ACTION_DELETE,
                        key: "key",
                        value: "value"
                    })
                ).to.throw("Unsupported storage action DELETE");
            });
        });
    });
});
