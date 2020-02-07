/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { Locale, Localizable } from "stentor-models";
import { getLanguageTagsFromLocalizable } from "../getLanguageTagsFromLocalizable";

type LocaleSpecificBaz = Partial<Pick<Baz, "tag">>;

interface Baz extends Localizable<LocaleSpecificBaz> {
    foo: number;
    tag: string;
    locales?: Partial<Record<Locale, LocaleSpecificBaz>>;
}

const TEST_BAZ: Baz = {
    foo: 1,
    tag: "en",
    locales: {
        ["en-US"]: {
            tag: "en-US"
        },
        ["es-ES"]: {
            tag: "es-ES"
        }
    }
};

const TEST_BAZ_WITH_DEFAULT: Baz = {
    foo: 1,
    tag: "es",
    defaultLocale: "es",
    locales: {
        ["en-US"]: {
            tag: "en-US"
        },
        ["es-ES"]: {
            tag: "es-ES"
        }
    }
};

const TEST_BAZ_WITH_DEFAULT_NO_LOCALES: Baz = {
    foo: 2,
    tag: "en",
    defaultLocale: "en-US"
};

describe("#getLanguageTagsFromLocalizable()", () => {
    describe("when passed undefined", () => {
        it("returns an empty array", () => {
            expect(getLanguageTagsFromLocalizable(undefined, [])).to.deep.equal([]);
        });
    });
    describe("when passed an object without defaultLocale", () => {
        it("defaults to en", () => {
            expect(getLanguageTagsFromLocalizable<Baz>(TEST_BAZ, ["en-AU", "en-US", "es-419"])).to.deep.equal([
                "en-AU",
                "en-US"
            ]);
        });
        describe("but with a supported language code on the locale object", () => {
            it("returns an array with the english tags & the spanish one", () => {
                expect(
                    getLanguageTagsFromLocalizable<Baz>(TEST_BAZ, ["en-AU", "en-US", "es-419", "es-ES"])
                ).to.deep.equal(["en-AU", "en-US", "es-ES"]);
            });
        });
    });
    describe("when passed an object with a defaultLocale", () => {
        it("returns the default locale", () => {
            expect(
                getLanguageTagsFromLocalizable<Baz>(TEST_BAZ_WITH_DEFAULT_NO_LOCALES, ["en-AU", "en-US", "es-419"])
            ).to.deep.equal(["en-US"]);
        });
        describe("and locales", () => {
            it("returns the default supported spanish and english from the locale", () => {
                expect(
                    getLanguageTagsFromLocalizable<Baz>(TEST_BAZ_WITH_DEFAULT, ["en-AU", "en-US", "es-419"])
                ).to.deep.equal(["es-419", "en-US"]);
            });
        });
    });
});
