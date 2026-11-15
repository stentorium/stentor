/*! Copyright (c) 2026, XAPP AI */
import { expect } from "chai";

// Imported through the package entry point so a type or constant dropped from a barrel file
// fails here instead of silently leaving the published surface.
import {
    AvailabilityClass,
    AvailabilityWindow,
    AvailabilityWindowDefinition,
    CrmServiceAvailabilitySettings,
    DEFAULT_AVAILABILITY_WINDOWS,
    ExternalLead,
    LeadWindow
} from "../../index";

describe("DEFAULT_AVAILABILITY_WINDOWS", () => {
    it("is two 4-hour arrival windows, morning and afternoon", () => {
        expect(DEFAULT_AVAILABILITY_WINDOWS).to.deep.equal([
            { start: "08:00", end: "12:00" },
            { start: "13:00", end: "17:00" }
        ]);
    });

    it("applies to every class", () => {
        DEFAULT_AVAILABILITY_WINDOWS.forEach((window) => {
            expect(window.classIds).to.be.undefined;
        });
    });

    it("cannot be mutated by a consumer", () => {
        expect(Object.isFrozen(DEFAULT_AVAILABILITY_WINDOWS)).to.equal(true);
        DEFAULT_AVAILABILITY_WINDOWS.forEach((window) => {
            expect(Object.isFrozen(window)).to.equal(true);
        });
    });
});

describe("AvailabilityClass", () => {
    it("caps jobs per window as well as per day", () => {
        const plumbing: AvailabilityClass = {
            id: "plumbing-repair",
            name: "Plumbing repair",
            summary: "Leaks, clogs, small repairs",
            appointmentsPerDay: 6,
            appointmentsPerWindow: 3
        };

        expect(plumbing.appointmentsPerWindow).to.equal(3);
        expect(plumbing.appointmentsPerDay).to.equal(6);
    });

    it("leaves the per-window cap optional (unlimited)", () => {
        const electrical: AvailabilityClass = { id: "electrical", name: "Electrical", summary: "Outlets, panels" };

        expect(electrical.appointmentsPerWindow).to.be.undefined;
    });
});

describe("CrmServiceAvailabilitySettings", () => {
    it("carries offered windows, restricted to classes when needed", () => {
        const windows: AvailabilityWindowDefinition[] = [
            { start: "08:00", end: "12:00" },
            { start: "13:00", end: "16:00", classIds: ["plumbing-repair"] }
        ];
        const settings: CrmServiceAvailabilitySettings = { windows, holdRequestedWindows: true };

        expect(settings.windows).to.deep.equal(windows);
        expect(settings.holdRequestedWindows).to.equal(true);
    });

    it("leaves windows and holds optional (default windows, holds off)", () => {
        const settings: CrmServiceAvailabilitySettings = {};

        expect(settings.windows).to.be.undefined;
        expect(settings.holdRequestedWindows).to.be.undefined;
    });
});

describe("AvailabilityWindow", () => {
    it("is an arrival window the business confirms", () => {
        const window: AvailabilityWindow = {
            start: "2026-11-17T08:00:00-05:00",
            end: "2026-11-17T12:00:00-05:00",
            status: "limited",
            basis: "policy",
            confirmation: "business_confirms",
            classId: "plumbing-repair",
            remaining: 1,
            bookingUrl: "https://book.xapp.ai/?window=2026-11-17T08:00:00-05:00/2026-11-17T12:00:00-05:00"
        };

        expect(window.confirmation).to.equal("business_confirms");
        expect(window.remaining).to.equal(1);
    });
});

describe("ExternalLead windows", () => {
    it("carries the requested and the booked window", () => {
        const requested: LeadWindow = { start: "2026-11-17T08:00:00-05:00", end: "2026-11-17T12:00:00-05:00" };
        const booked: LeadWindow = { start: "2026-11-18T13:00:00-05:00", end: "2026-11-18T17:00:00-05:00" };
        const lead: ExternalLead = {
            fields: [],
            availabilityClassId: "plumbing-repair",
            requestedWindow: requested,
            bookedWindow: booked
        };

        expect(lead.requestedWindow).to.deep.equal(requested);
        expect(lead.bookedWindow).to.deep.equal(booked);
    });

    it("leaves both windows optional", () => {
        const lead: ExternalLead = { fields: [] };

        expect(lead.requestedWindow).to.be.undefined;
        expect(lead.bookedWindow).to.be.undefined;
    });
});
