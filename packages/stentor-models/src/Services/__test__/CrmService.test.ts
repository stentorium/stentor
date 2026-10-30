/*! Copyright (c) 2026, XAPP AI */
import { expect } from "chai";

// Imported through the package entry point rather than the module, so a type dropped from a
// barrel file fails here instead of silently leaving the published surface.
import {
    CrmServiceAvailability,
    CrmServiceAvailabilityContact,
    CrmServiceAvailabilityOptions,
    CrmServiceAvailabilitySettings,
    CrmServiceDateAvailability
} from "../../index";

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

describe("CrmServiceDateAvailability", () => {
    it("carries every window that day, open or full, in time order", () => {
        const day: CrmServiceDateAvailability = {
            date: { date: "2026-10-22" },
            available: true,
            timeSlots: [
                {
                    range: {
                        start: { date: "2026-10-22", time: "08:00:00", tz: "-04:00" },
                        end: { date: "2026-10-22", time: "12:00:00", tz: "-04:00" }
                    },
                    available: false
                },
                {
                    range: {
                        start: { date: "2026-10-22", time: "12:00:00", tz: "-04:00" },
                        end: { date: "2026-10-22", time: "16:00:00", tz: "-04:00" }
                    },
                    available: true
                }
            ]
        };

        expect(day.timeSlots).to.have.length(2);
        expect(day.timeSlots?.map((slot) => slot.available)).to.deep.equal([false, true]);
    });

    it("leaves timeSlots optional for CRMs without live slots", () => {
        const day: CrmServiceDateAvailability = { date: { date: "2026-10-22" }, available: false };

        expect(day.timeSlots).to.be.undefined;
    });
});

describe("CrmServiceAvailability", () => {
    const range = { start: { date: "2026-10-22" }, end: { date: "2026-11-05" } };

    it("can flag that the CRM will not take a scheduled booking", () => {
        const availability: CrmServiceAvailability = { range, unavailabilities: [], schedulingDisabled: true };

        expect(availability.schedulingDisabled).to.be.true;
    });

    it("leaves schedulingDisabled optional", () => {
        const availability: CrmServiceAvailability = { range, unavailabilities: [] };

        expect(availability.schedulingDisabled).to.be.undefined;
    });
});

describe("CrmServiceAvailabilitySettings.timezone", () => {
    it("is optional", () => {
        const settings: CrmServiceAvailabilitySettings = { defaultBusyDays: { blockCurrentDay: true } };

        expect(settings.timezone).to.be.undefined;
    });

    it("carries the business IANA timezone next to the busy-day rules", () => {
        const settings: CrmServiceAvailabilitySettings = {
            timezone: "America/Chicago",
            defaultBusyDays: { afterHoursNextDayBlockedUntil: "12:00" }
        };

        expect(settings.timezone).to.equal("America/Chicago");
    });
});
