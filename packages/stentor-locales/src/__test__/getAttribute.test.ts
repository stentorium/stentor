/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { getAttribute } from "../getAttribute";

describe("#getAttribute()", () => {
    it("Tests that no parameters returns an undefined.", () => {
        expect(getAttribute()).to.be.undefined;
    });

    it("Tests that a call with only the attribute parameter returns undefined.", () => {
        expect(getAttribute<any, any>("testAttrib")).to.be.undefined;
    });

    it("Tests that the default attribute is returned with undefined.", () => {
        const obj = {
            testAttrib: "TestValue"
        };
        expect(getAttribute<any, any>("testAttrib", undefined, obj)).to.equal("TestValue");
    });

    it("Tests that a language overridden attribute returns the correct value.", () => {
        const obj = {
            testAttrib: "TestValue",
            locales: {
                en: {
                    testAttrib: "Another Value"
                }
            }
        };
        expect(getAttribute<any, any>("testAttrib", "en", obj)).to.equal("Another Value");
        expect(getAttribute<any, any>("testAttrib", "es", obj)).to.equal("TestValue");
    });

    it("Tests that a dialect overridden attribute returns the correct value.", () => {
        const obj = {
            testAttrib: "TestValue",
            locales: {
                "en-US": {
                    testAttrib: "Another Value"
                }
            }
        };
        expect(getAttribute<any, any>("testAttrib", "en", obj)).to.equal("TestValue");
        expect(getAttribute<any, any>("testAttrib", "en-US", obj)).to.equal("Another Value");
    });

    it("Tests that a dialect overriding a language locale attribute returns the correct value.", () => {
        const obj = {
            testAttrib: "TestValue",
            locales: {
                en: {
                    testAttrib: "Another Value"
                },
                "en-US": {
                    testAttrib: "Another Value in the US"
                }
            }
        };
        expect(getAttribute<any, any>("testAttrib", "en", obj)).to.equal("Another Value");
        expect(getAttribute<any, any>("testAttrib", "en-US", obj)).to.equal("Another Value in the US");
        expect(getAttribute<any, any>("testAttrib", "es", obj)).to.equal("TestValue");
    });

    it("Tests that an attribute overwritten with undefined gets properly overwritten.", () => {
        const obj = {
            testAttrib: "TestValue",
            locales: {
                en: {
                    testAttrib: undefined as string
                }
            }
        };
        expect(getAttribute<any, any>("testAttrib", "en", obj)).to.be.undefined;
    });
});
