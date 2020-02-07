/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { Localizable } from "stentor-models";
import { localize } from "../localize";

describe("#localize()", () => {
    interface Foo extends Localizable<Foo> {
        testAttrib1: string;
        testAttrib2: string;
    }

    it("Tests that an undefined returns an undefined.", () => {
        expect(localize<Foo>(undefined, "es")).to.be.undefined;
    });

    it("Tests that an input with no locale returns the default.", () => {
        const obj: Foo = {
            testAttrib1: "TestValue1",
            testAttrib2: "TestValue2",
            locales: {
                es: {
                    testAttrib1: "A new value"
                }
            }
        };
        expect(localize<Foo>(obj)).to.deep.equal({
            testAttrib1: "TestValue1",
            testAttrib2: "TestValue2"
        });
    });

    it("Tests that an object with an overriding language is flattened to that language.", () => {
        const obj: Foo = {
            testAttrib1: "TestValue1",
            testAttrib2: "TestValue2",
            locales: {
                es: {
                    testAttrib1: "A new value"
                }
            }
        };
        expect(localize<Foo>(obj, "es")).to.deep.equal({
            testAttrib1: "A new value",
            testAttrib2: "TestValue2"
        });
    });

    it("Tests that an object with an overriding language is flattened when no language override exists.", () => {
        const obj: Foo = {
            testAttrib1: "TestValue1",
            testAttrib2: "TestValue2",
            locales: {
                es: {
                    testAttrib1: "A new value"
                }
            }
        };
        expect(localize<Foo>(obj, "en")).to.deep.equal({
            testAttrib1: "TestValue1",
            testAttrib2: "TestValue2"
        });
    });

    it("Tests that an object with an overriding dialect is flattened.", () => {
        const obj: Foo = {
            testAttrib1: "TestValue1",
            testAttrib2: "TestValue2",
            locales: {
                "es-MX": {
                    testAttrib1: "A new value"
                }
            }
        };
        expect(localize<Foo>(obj, "es-MX")).to.deep.equal({
            testAttrib1: "A new value",
            testAttrib2: "TestValue2"
        });
    });

    it("Tests that an object with an overriding dialect is flattened.", () => {
        const obj: Foo = {
            testAttrib1: "TestValue1",
            testAttrib2: "TestValue2",
            locales: {
                "es-MX": {
                    testAttrib1: "A new value"
                }
            }
        };
        expect(localize<Foo>(obj, "es-MX")).to.deep.equal({
            testAttrib1: "A new value",
            testAttrib2: "TestValue2"
        });
    });

    it("Tests that an object with the dialect is ignored when not specified.", () => {
        const obj: Foo = {
            testAttrib1: "TestValue1",
            testAttrib2: "TestValue2",
            locales: {
                "es-MX": {
                    testAttrib1: "A new value"
                }
            }
        };
        expect(localize<Foo>(obj, "es")).to.deep.equal({
            testAttrib1: "TestValue1",
            testAttrib2: "TestValue2"
        });
    });

    it("Tests that an undefined object is properly overridden.", () => {
        const obj: Foo = {
            testAttrib1: "TestValue1",
            testAttrib2: "TestValue2",
            locales: {
                es: {
                    testAttrib1: undefined
                }
            }
        };
        expect(localize<Foo>(obj, "es")).to.deep.equal({
            testAttrib1: undefined,
            testAttrib2: "TestValue2"
        });
    });
});
