/*! Copyright (c) 2026, XAPP AI */
import { expect } from "chai";
import { LeadFormField } from "stentor-models";

import { LEAD_FIELD_ALIASES, extractZip, findValue, getNames, normalizePhone } from "../lead";

function fields(record: Record<string, string>): LeadFormField[] {
    return Object.keys(record).map((name) => ({ name, value: record[name] }));
}

describe(`#${findValue.name}()`, () => {
    it("returns the value for an exact match", () => {
        expect(findValue(LEAD_FIELD_ALIASES.phone, fields({ phone: "555-123-4567" }))).to.equal("555-123-4567");
    });
    it("matches an alias", () => {
        expect(findValue(LEAD_FIELD_ALIASES.phone, fields({ phone_number: "555-123-4567" }))).to.equal("555-123-4567");
    });
    it("matches case insensitively", () => {
        expect(findValue(LEAD_FIELD_ALIASES.email, fields({ EmailAddress: "a@b.com" }))).to.equal("a@b.com");
    });
    it("trims the value", () => {
        expect(findValue(LEAD_FIELD_ALIASES.company, fields({ company: "  XAPP AI  " }))).to.equal("XAPP AI");
    });
    it("returns undefined when nothing matches", () => {
        expect(findValue(LEAD_FIELD_ALIASES.zip, fields({ phone: "5551234567" }))).to.be.undefined;
    });
    it("returns undefined for a blank value", () => {
        expect(findValue(LEAD_FIELD_ALIASES.message, fields({ message: "   " }))).to.be.undefined;
    });
    it("returns undefined for no fields", () => {
        expect(findValue(LEAD_FIELD_ALIASES.message)).to.be.undefined;
        expect(findValue(LEAD_FIELD_ALIASES.message, [])).to.be.undefined;
        expect(findValue(LEAD_FIELD_ALIASES.message, undefined)).to.be.undefined;
    });
    it("resolves off a plain record", () => {
        expect(findValue(LEAD_FIELD_ALIASES.address, { street_address: " 123 Main St " })).to.equal("123 Main St");
    });
    it("coerces a numeric record value", () => {
        expect(findValue(LEAD_FIELD_ALIASES.zip, { zip: 33607 })).to.equal("33607");
    });
    it("ignores non string, non number record values", () => {
        expect(findValue(LEAD_FIELD_ALIASES.zip, { zip: { value: "33607" } })).to.be.undefined;
        expect(findValue(LEAD_FIELD_ALIASES.zip, { zip: null })).to.be.undefined;
    });
    it("returns the first matching alias in order of the fields", () => {
        expect(findValue(LEAD_FIELD_ALIASES.address, fields({ address2: "Apt 3", address: "123 Main St" }))).to.equal("Apt 3");
    });

    describe("alias resolution", () => {
        const cases: [keyof typeof LEAD_FIELD_ALIASES, string[], string][] = [
            ["phone", ["phone", "phoneNumber", "phone_number"], "555-123-4567"],
            ["email", ["email", "emailAddress", "email_address"], "ada@example.com"],
            ["address", ["address", "address1", "address2", "street_address"], "123 Main St"],
            ["zip", ["zip", "zipCode", "zip_code", "postalCode", "postal_code"], "33607"],
            ["company", ["company", "organization", "companyName", "company_name", "organizationName", "organization_name"], "XAPP AI"],
            ["message", ["message", "note"], "call me"]
        ];
        cases.forEach(([key, names, value]) => {
            names.forEach((name) => {
                it(`resolves ${key} from ${name}`, () => {
                    expect(findValue(LEAD_FIELD_ALIASES[key], fields({ [name]: value }))).to.equal(value);
                    expect(findValue(LEAD_FIELD_ALIASES[key], { [name]: value })).to.equal(value);
                });
            });
        });
    });
});

describe(`#${getNames.name}()`, () => {
    describe("the eight permutations", () => {
        it("1. only a first name", () => {
            expect(getNames(fields({ first_name: "Ada" }))).to.deep.equal({
                firstName: "Ada",
                lastName: undefined,
                fullName: "Ada"
            });
        });
        it("2. only a last name", () => {
            expect(getNames(fields({ last_name: "Lovelace" }))).to.deep.equal({
                firstName: undefined,
                lastName: "Lovelace",
                fullName: "Lovelace"
            });
        });
        it("3a. only a full name with a single token", () => {
            expect(getNames(fields({ full_name: "Ada" }))).to.deep.equal({
                firstName: "Ada",
                lastName: undefined,
                fullName: "Ada"
            });
        });
        it("3b. only a full name that splits", () => {
            expect(getNames(fields({ full_name: "Ada Lovelace" }))).to.deep.equal({
                firstName: "Ada",
                lastName: "Lovelace",
                fullName: "Ada Lovelace"
            });
        });
        it("4. a first and last name", () => {
            expect(getNames(fields({ first_name: "Ada", last_name: "Lovelace" }))).to.deep.equal({
                firstName: "Ada",
                lastName: "Lovelace",
                fullName: "Ada Lovelace"
            });
        });
        it("5. a first name and a full name", () => {
            expect(getNames(fields({ first_name: "Augusta", full_name: "Ada Lovelace" }))).to.deep.equal({
                firstName: "Augusta",
                lastName: "Lovelace",
                fullName: "Augusta Lovelace"
            });
        });
        it("6. a last name and a full name", () => {
            expect(getNames(fields({ last_name: "Byron", full_name: "Ada Lovelace" }))).to.deep.equal({
                firstName: "Ada",
                lastName: "Byron",
                fullName: "Ada Byron"
            });
        });
        it("7. all three names", () => {
            expect(getNames(fields({ first_name: "Augusta", last_name: "Byron", full_name: "Ada Lovelace" }))).to.deep.equal({
                firstName: "Augusta",
                lastName: "Byron",
                fullName: "Augusta Byron"
            });
        });
        it("8. no names at all", () => {
            expect(getNames(fields({ email: "ada@example.com" }))).to.deep.equal({
                firstName: undefined,
                lastName: undefined,
                fullName: undefined
            });
        });
    });

    describe("reconciled behaviour", () => {
        it("prefers the explicit first and last name over the full name split", () => {
            const names = getNames(fields({ first_name: "Ada", last_name: "Lovelace", full_name: "Charles Babbage" }));
            expect(names.firstName).to.equal("Ada");
            expect(names.lastName).to.equal("Lovelace");
        });
        it("returns undefined, not a sentinel, when a name cannot be resolved", () => {
            const names = getNames([]);
            expect(names.firstName).to.be.undefined;
            expect(names.lastName).to.be.undefined;
            expect(names.fullName).to.be.undefined;
        });
        it("preserves the internal whitespace of a split surname", () => {
            expect(getNames(fields({ full_name: "Ada  Q   Lovelace" }))).to.deep.equal({
                firstName: "Ada",
                lastName: "Q   Lovelace",
                fullName: "Ada  Q   Lovelace"
            });
        });
    });

    it("keeps a multi word surname together", () => {
        expect(getNames(fields({ full_name: "Ada King van der Berg" }))).to.deep.equal({
            firstName: "Ada",
            lastName: "King van der Berg",
            fullName: "Ada King van der Berg"
        });
    });
    it("keeps an explicit multi word surname", () => {
        expect(getNames(fields({ first_name: "Ada", last_name: "van der Berg" }))).to.deep.equal({
            firstName: "Ada",
            lastName: "van der Berg",
            fullName: "Ada van der Berg"
        });
    });
    it("resolves aliased and mixed case name fields", () => {
        expect(getNames(fields({ FirstName: " Ada ", lastname: "Lovelace" }))).to.deep.equal({
            firstName: "Ada",
            lastName: "Lovelace",
            fullName: "Ada Lovelace"
        });
    });
    it("resolves off a plain record", () => {
        expect(getNames({ fullName: "Ada Lovelace" })).to.deep.equal({
            firstName: "Ada",
            lastName: "Lovelace",
            fullName: "Ada Lovelace"
        });
    });
    it("ignores blank name fields", () => {
        expect(getNames(fields({ first_name: "  ", full_name: "Ada Lovelace" }))).to.deep.equal({
            firstName: "Ada",
            lastName: "Lovelace",
            fullName: "Ada Lovelace"
        });
    });
    it("handles no fields", () => {
        expect(getNames(undefined)).to.deep.equal({
            firstName: undefined,
            lastName: undefined,
            fullName: undefined
        });
    });
});

describe(`#${extractZip.name}()`, () => {
    it("returns an explicit zip", () => {
        expect(extractZip(fields({ zip: "33607" }))).to.equal("33607");
    });
    it("returns an aliased zip", () => {
        expect(extractZip(fields({ zip_code: "33607" }))).to.equal("33607");
        expect(extractZip({ postalCode: "33607" })).to.equal("33607");
    });
    it("falls back to the zip within the address", () => {
        expect(extractZip(fields({ address: "123 Main St, Tampa FL 33607" }))).to.equal("33607");
    });
    it("returns the five digit portion of a zip plus four in the address", () => {
        expect(extractZip(fields({ address: "123 Main St, Tampa FL 33607-1234" }))).to.equal("33607");
    });
    it("prefers the explicit zip over the address", () => {
        expect(extractZip(fields({ zip: "10001", address: "123 Main St, Tampa FL 33607" }))).to.equal("10001");
    });
    it("returns undefined when there is no zip", () => {
        expect(extractZip(fields({ address: "123 Main St, Tampa FL" }))).to.be.undefined;
        expect(extractZip([])).to.be.undefined;
        expect(extractZip(undefined)).to.be.undefined;
    });
    it("does not pull a street number out of the address", () => {
        expect(extractZip(fields({ address: "1234 Main St" }))).to.be.undefined;
    });
});

describe(`#${normalizePhone.name}()`, () => {
    it("formats a ten digit number", () => {
        expect(normalizePhone("5551234567")).to.equal("555-123-4567");
    });
    it("formats a ten digit number with punctuation", () => {
        expect(normalizePhone("(555) 123-4567")).to.equal("555-123-4567");
    });
    it("passes through anything that is not ten digits", () => {
        expect(normalizePhone("+1 555 123 4567")).to.equal("+1 555 123 4567");
        expect(normalizePhone("555-1234")).to.equal("555-1234");
    });
    it("returns undefined for no phone", () => {
        expect(normalizePhone(undefined)).to.be.undefined;
    });
});
