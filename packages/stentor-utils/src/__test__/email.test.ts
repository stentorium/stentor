/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { maskEmails } from "../email";

describe("#maskEmails()", () => {
    describe("for a string without emails", () => {
        it("passes them through", () => {
            expect(maskEmails("foo bar")).to.equal("foo bar");
        });
    });
    describe("for a string with one email", () => {
        it("masks the email", () => {
            const sentence = "Email sent to bazinga@bigbang.com bam!";
            const partialClean = "Email sent to b*****a@bigbang.com bam!";
            const fullClean = "Email sent to *******@*******.*** bam!";
            expect(maskEmails(sentence, true)).to.equal(partialClean);
            expect(maskEmails(sentence)).to.equal(fullClean);
        });
    });
    describe("for a string with two emails", () => {
        it("masks it", () => {
            const sentence = "Emails sent to foo.bar@gmail.com and bazinga@bigbang.com bam!";
            const partialClean = "Emails sent to f*****r@gmail.com and b*****a@bigbang.com bam!";
            const fullClean = "Emails sent to ***.***@*****.*** and *******@*******.*** bam!";
            expect(maskEmails(sentence, true)).to.equal(partialClean);
            expect(maskEmails(sentence)).to.equal(fullClean);
        });
    });
});
