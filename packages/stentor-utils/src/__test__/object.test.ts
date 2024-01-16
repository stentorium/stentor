/*! Copyright (c) 2019, XAPPmedia */
import Chai from "chai";
import sinon from "sinon";
import SinonChai from "sinon-chai";

import * as Utils from "../object";

Chai.use(SinonChai);
const expect = Chai.expect;

describe("Utils", () => {
    describe("objHasAttrs", () => {
        it("Tests that it return false when object is undefined", () => {
            expect(Utils.objHasAttrs(undefined)).to.be.false;
        });

        it("Tests that it returns false when object is null.", () => {
            expect(Utils.objHasAttrs(null)).to.be.false;
        });

        it("Tests that it returns false when object is empty.", () => {
            expect(Utils.objHasAttrs({})).to.be.false;
        });

        it("Tests that it returns true when the object actually has attrs.", () => {
            expect(Utils.objHasAttrs({ attr1: "Exists" })).to.be.true;
        });

        it("Tests that it returns false when it's not an object.", () => {
            expect(Utils.objHasAttrs("Test" as any)).to.be.false; // There was a bug where it was possible Thanks to the wonders of Javascript
        });
    });

    describe("Throw if contains banned.", () => {
        let testObj: object;

        before(() => {
            testObj = {
                param1: "value1",
                param2: "value2",
                param3: "value3",
                param4: "value4",
                param5: "value5"
            };
        });

        it("Tests that no error is thrown if the there is no banned items.", () => {
            try {
                Utils.throwIfDoesContain(testObj, []);
                Utils.throwIfDoesContain(testObj, undefined);
            } catch (e) {
                expect(e, "An exception was thrown even though it was not supposed to be.").to.not.exist;
            }
        });

        it("Tests that no error is thrown if the object does not contain banned items.", () => {
            try {
                Utils.throwIfDoesContain(testObj, ["param6", "param7"]);
            } catch (e) {
                expect(e, "An exception was thrown even though it was not supposed to be.").to.not.exist;
            }
        });

        it("Tests that an error is thrown if the object contains banned items.", () => {
            let error: any;
            try {
                Utils.throwIfDoesContain(testObj, ["param2", "param3", "param6", "param7"]);
            } catch (e) {
                error = e;
            }
            expect(error).to.exist;
            expect(error).to.be.instanceof(Error);
            expect(error.message).to.contain(["param2", "param3"].join(", "));
        });

        it("Tests that the onError callback is used with the appropriate items.", () => {
            const callback = sinon.stub();
            Utils.throwIfDoesContain(testObj, ["param2", "param3", "param6", "param7"], callback);
            expect(callback).to.be.calledOnce;
            expect(callback).to.be.calledWith(["param2", "param3"]);
        });
    });

    describe("Throw if missing required.", () => {
        let testObj: object;

        before(() => {
            testObj = {
                param1: "value1",
                param2: "value2",
                param3: "value3",
                param4: "value4",
                param5: "value5"
            };
        });

        it("Tests that no error is thrown if the object contains the keys that are necessary", () => {
            try {
                Utils.throwIfDoesNotContain(testObj, ["param1", "param2", "param3"]);
            } catch (e) {
                expect(e, "An exception was thrown even though it was not supposed to be.").to.not.exist;
            }
        });

        it("Tests that no error is thrown if the required params are empty.", () => {
            try {
                Utils.throwIfDoesNotContain(testObj, []);
            } catch (e) {
                expect(e, "An exception was thrown even though it was not supposed to be.").to.not.exist;
            }
        });

        it("Tests that no error is thrown if the required params are undefined.", () => {
            try {
                Utils.throwIfDoesNotContain(testObj, undefined);
            } catch (e) {
                expect(e, "An exception was thrown even though it was not supposed to be.").to.not.exist;
            }
        });

        it("Tests that an exception was thrown if the object does not contain the keys that are necessary.", () => {
            let error: any;
            try {
                Utils.throwIfDoesNotContain(testObj, ["param1", "param2", "param3", "param6", "param7"]);
            } catch (e) {
                error = e;
            }
            expect(error).to.exist;
            expect(error).to.be.instanceof(Error);
            expect(error.message).to.contain(["param6", "param7"].join(", "));
        });

        it("Tests that an exception was thrown if the object is undefined and it should not be.", () => {
            let error: any;
            try {
                Utils.throwIfDoesNotContain(undefined, ["param1", "param2", "param3"]);
            } catch (e) {
                error = e;
            }
            expect(error).to.exist;
            expect(error).to.be.instanceof(Error);
        });

        it("Tests that the callback is used with the appropriate items.", () => {
            const callback = sinon.stub();
            Utils.throwIfDoesNotContain(testObj, ["param1", "param2", "param3", "param6", "param7"], false, callback);
            expect(callback).to.be.calledWith(["param6", "param7"]);
        });

        it("Tests that an exception was not thrown if the object is undefined and it is allowed.", () => {
            try {
                Utils.throwIfDoesNotContain(undefined, ["param1", "param2", "param3"], true);
            } catch (e) {
                expect(e, "An exception was thrown even though it was not supposed to be.").to.not.exist;
            }
        });

        it("Tests that it is not thrown if the object contains a value of 0.", () => {
            try {
                Utils.throwIfDoesNotContain({ param1: 0 }, ["param1"], false);
            } catch (e) {
                expect(e, "An exception was thrown even though it was not supposed to be.").to.not.exist;
            }
        });
    });

    describe("Throw if contains extra", () => {
        let testObj: object;

        before(() => {
            testObj = {
                param1: "value1",
                param2: "value2",
                param3: "value3",
                param4: "value4",
                param5: "value5"
            };
        });

        it("Tests that an error is not thrown if the object contains exactly the right amount of keys.", () => {
            try {
                Utils.throwIfContainsExtra(testObj, ["param1", "param2", "param3", "param4", "param5"]);
            } catch (e) {
                expect(e, "An exception was thrown even though it was not supposed to be.").to.not.exist;
            }
        });

        it("Tests that an error is not thrown if the object has no restricted properties.", () => {
            try {
                Utils.throwIfContainsExtra(testObj, []);
            } catch (e) {
                expect(e, "An exception was thrown even though it was not supposed to be.").to.not.exist;
            }
        });

        it("Tests that an error is not thrown if the object contains all the keys, but it's checking for even more.", () => {
            try {
                Utils.throwIfContainsExtra(testObj, [
                    "param1",
                    "param2",
                    "param3",
                    "param4",
                    "param5",
                    "param6",
                    "param7"
                ]);
            } catch (e) {
                expect(e, "An exception was thrown even though it was not supposed to be.").to.not.exist;
            }
        });

        it("Tests that an error is thrown if the object contains extra keys.", () => {
            let error: any;
            try {
                Utils.throwIfContainsExtra(testObj, ["param1", "param2", "param3"]);
            } catch (e) {
                error = e;
            }
            expect(error).to.exist;
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.contain(["param4", "param5"].join(", "));
        });

        it("Tests that the callback is used when provided.", () => {
            const callback = sinon.stub();
            Utils.throwIfContainsExtra(testObj, ["param1", "param2", "param3"], false, callback);
            expect(callback).to.be.calledWith(["param4", "param5"]);
        });

        it("Tests that an error is thrown if the object is undefined.", () => {
            let error: any;
            try {
                Utils.throwIfContainsExtra(undefined, ["param1", "param2", "param3"]);
            } catch (e) {
                error = e;
            }
            expect(error).to.exist;
            expect(error).to.be.instanceOf(Error);
        });

        it("Tests that an error is not thrown if the object is undefined and undefined are permitted.", () => {
            try {
                Utils.throwIfContainsExtra(undefined, ["param1", "param2", "param3"], true);
                // Rejoice!
            } catch (e) {
                expect(e, "An exception was thrown even though it was not supposed to be.").to.not.exist;
            }
        });
    });

    describe("subset", () => {
        let testObj: object;

        beforeEach(() => {
            testObj = {
                param1: "value1",
                param2: "value2",
                param3: "value3",
                param4: "value4",
                param5: "value5"
            };
        });

        it("Tests that it returns undefined when undefined is passed in.", () => {
            expect(Utils.subset(undefined, ["param3", "param4"])).to.be.undefined;
        });

        it("Tests that it returns null when null is passed in.", () => {
            expect(Utils.subset(null, ["param3", "param4"])).to.be.null;
        });

        it("Tests that it returns the same contents if attrs is undefined.", () => {
            expect(Utils.subset(testObj, undefined)).to.deep.equal({});
        });

        it("Tests that it returns the same contents if the attrs is empty.", () => {
            expect(Utils.subset(testObj, [])).to.deep.equal({});
        });

        it("Tests that it will return only the parameters I want.", () => {
            expect(Utils.subset(testObj, ["param3", "param4"])).to.deep.equal({
                param3: "value3",
                param4: "value4"
            });
        });

        it("Tests that nothing weird happens when I give it attributes that don't exist in the object.", () => {
            expect(Utils.subset(testObj, ["param3", "param4", "noop1", "noop2", "noop3"])).to.deep.equal({
                param3: "value3",
                param4: "value4"
            });
        });

        it("Tests that it works when the values are arrays.", () => {
            const testObj = {
                array1: ["value1", "value2", "value3"],
                array2: ["value4", "value5", "value6"],
                array3: ["value7", "value8", "value9"]
            };
            expect(Utils.subset(testObj, ["array2"])).to.deep.equal({ array2: ["value4", "value5", "value6"] });
        });

        it("Tests that it works when the values are falsy", () => {
            const testObj = {
                param1: false,
                param2: 0,
                param3: undefined as any,
                param4: null as any,
                param5: "false",
                param6: "",
                param7: NaN,
                param8: "Value3",
                param9: "Value4"
            };
            expect(
                Utils.subset(testObj, ["param1", "param2", "param3", "param4", "param5", "param6", "param7"])
            ).to.deep.equal({
                param1: false,
                param2: 0,
                param3: undefined as any,
                param4: null as any,
                param5: "false",
                param6: "",
                param7: NaN
            });
        });
    });

    describe("removeItems", () => {
        let testObj: object;

        beforeEach(() => {
            testObj = {
                param1: "value1",
                param2: "value2",
                param3: "value3",
                param4: "value4",
                param5: "value5"
            };
        });

        it("Tests that it returns undefined if 'undefined' object is passed in.", () => {
            expect(Utils.removeItems(undefined, ["value1"])).to.be.undefined;
        });

        it("Tests that a copy of the original object is returned if values are undefined.", () => {
            const obj = Utils.removeItems(testObj, undefined);
            expect(obj).to.deep.equal(testObj);
            expect(obj).to.not.equal(testObj);
        });

        it("Tests that a copy of the original object is returned if values are empty.", () => {
            const obj = Utils.removeItems(testObj, []);
            expect(obj).to.deep.equal(testObj);
            expect(obj).to.not.equal(testObj);
        });

        it("Tests that an object is returned with the items removed.", () => {
            const obj = Utils.removeItems(testObj, ["param1", "param3", "param5"]);
            expect(obj).to.not.have.property("param1");
            expect(obj).to.not.have.property("param3");
            expect(obj).to.have.property("param2");
            expect(obj).to.have.property("param4");
        });

        it("Tests that original object is not affected.", () => {
            const copy = { ...testObj };
            Utils.removeItems(testObj, ["param1", "param3", "param5"]);
            expect(copy).to.deep.equal(testObj);
        });

        it("Tests that it works with a callback function.", () => {
            let i = 0;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const callback = (key: any): boolean => {
                switch (i++) {
                    case 0:
                    case 2:
                    case 4:
                        return false;
                    default:
                        return true;
                }
            };
            const spy = sinon.spy(callback);

            const obj = Utils.removeItems(testObj, spy);
            expect(obj).to.not.have.property("param1");
            expect(obj).to.not.have.property("param3");
            expect(obj).to.have.property("param2");
            expect(obj).to.have.property("param4");
            expect(spy).to.have.have.callCount(5);
        });

        it("Tests that the object works with arrays and a function.", () => {
            let i = 0;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const callback = (key: any): boolean => {
                switch (i++) {
                    case 0:
                    case 2:
                    case 4:
                        return false;
                    default:
                        return true;
                }
            };
            const spy = sinon.spy(callback);

            const obj = Utils.removeItems(["One", "Two", "Three", "Four", "Five"], spy);
            expect(obj).to.have.length(2);
            expect(obj[0]).to.equal("Two");
            expect(obj[1]).to.equal("Four");
            expect(spy).to.have.callCount(5);
        });

        it("Tests that the items are removed at the indexes.", () => {
            const obj = Utils.removeItems(["One", "Two", "Three", "Four", "Five"], [0, 2, 4]);
            expect(obj).to.have.length(2);
            expect(obj[0]).to.equal("Two");
            expect(obj[1]).to.equal("Four");
        });
        /* tslint:enable:no-magic-numbers */
    });

    describe("#removeEmptyStrings", () => {
        describe("when passed undefined", () => {
            it("returns undefined", () => {
                expect(Utils.removeEmptyStrings(undefined)).to.be.undefined;
            });
        });
        describe("when passed an object with keys and values", () => {
            let cleaned: object;
            const original = {
                greeting: "",
                key: "value",
                bool: true
            };
            beforeEach(() => {
                cleaned = Utils.removeEmptyStrings(original);
            });
            it("preserves the original", () => {
                expect(original.greeting).to.equal("");
            });
            it("removes the empty strings", () => {
                expect((cleaned as any).greeting).to.be.undefined;
            });
            it("does not remove valid keys", () => {
                expect((cleaned as any).key).to.equal("value");
                expect((cleaned as any).bool).to.be.true;
            });
        });
    });
});
