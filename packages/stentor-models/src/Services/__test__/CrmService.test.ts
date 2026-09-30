/*! Copyright (c) 2026, XAPP AI */
import { expect } from "chai";

// Imported through the package entry point rather than the module, so a type dropped from a
// barrel file fails here instead of silently leaving the published surface.
import { CrmServiceAvailabilityContact, CrmServiceAvailabilityOptions } from "../../index";

describe("CrmServiceAvailabilityOptions", () => {
    it("carries the visitor contact collected so far", () => {
        const contact: CrmServiceAvailabilityContact = {
            name: "Jane Doe",
            phone: "+15555550100",
            email: "jane@example.com",
            address: "123 Main St, Tampa, FL",
            zip: "33602"
        };
        const options: CrmServiceAvailabilityOptions = {
            jobType: { id: "hvac-repair" },
            contact
        };

        expect(options.contact).to.deep.equal(contact);
    });

    it("accepts a partial contact", () => {
        const options: CrmServiceAvailabilityOptions = { contact: { zip: "33602" } };

        expect(options.contact?.zip).to.equal("33602");
        expect(options.contact?.phone).to.be.undefined;
    });

    it("leaves contact optional", () => {
        const options: CrmServiceAvailabilityOptions = { jobType: { id: "hvac-repair" } };

        expect(options.contact).to.be.undefined;
    });
});
