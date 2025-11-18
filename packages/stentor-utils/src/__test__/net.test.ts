/*! Copyright (c) 2021, XAPPmedia */
import { expect } from "chai";

import { linkify, isUrl } from "../net";

describe(`#${linkify.name}()`, () => {
    it("returns the correct result", () => {
        expect(linkify(undefined)).to.equal(undefined);
        expect(linkify("")).to.equal("");
        expect(linkify("foo")).to.equal("foo");
        expect(linkify("www.google.com is a search engine that is comparable to https://askjeeves.com ")).to.equal("[www.google.com](https://www.google.com) is a search engine that is comparable to [https://askjeeves.com](https://askjeeves.com) ");
        expect(linkify("www.google.com is a search engine that is comparable to https://askjeeves.com ", "html")).to.equal("<a target=\"_blank\" href=\"https://www.google.com\">www.google.com</a> is a search engine that is comparable to <a target=\"_blank\" href=\"https://askjeeves.com\">https://askjeeves.com</a> ");
    });
    describe("with existing URLs", () => {
        it("returns the correct result", () => {
            expect(linkify("[Google](https://google.com] is a search engine that is comparable to https://askjeeves.com ")).to.equal("[Google](https://google.com] is a search engine that is comparable to [https://askjeeves.com](https://askjeeves.com) ");
            expect(linkify("Ok, <a href=\"https://google.com\" >Google</a> is a search engine that is comparable to https://askjeeves.com ")).to.equal("Ok, <a href=\"https://google.com\" >Google</a> is a search engine that is comparable to [https://askjeeves.com](https://askjeeves.com) ");
        });
    })
});

describe(`#${isUrl}()`, () => {
    it("returns the correct result", () => {
        expect(isUrl("https://xapp.ai")).to.be.true;
        expect(isUrl("tel:999-999-9999")).to.be.true;
        expect(isUrl(undefined)).to.be.false;
        expect(isUrl("hi how are you")).to.be.false;
    });
})