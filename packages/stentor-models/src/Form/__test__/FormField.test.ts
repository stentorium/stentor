/*! Copyright (c) 2026, XAPP AI */
import { expect } from "chai";

import {
    FormDateTimeInput,
    FormField,
    ScheduleException,
    SelectableItem,
    SlotCapacityPolicy,
    TimeOffering,
    TimeSlotSchedule,
    TimeSpan
} from "../FormField";
// Imported through the package entry point rather than the module, so a type dropped from a
// barrel file fails here instead of silently leaving the published surface.
import { FormDateTimeInput as ExportedFormDateTimeInput, TimeSlotSchedule as ExportedTimeSlotSchedule } from "../../index";

describe("FormDateTimeInput", () => {
    it("is assignable with only the required fields set", () => {
        const field: FormDateTimeInput = {
            name: "preferred_time",
            type: "DATETIME",
            schedule: {
                timezone: "America/New_York"
            }
        };

        expect(field.schedule.timezone).to.equal("America/New_York");
    });

    it("accepts a fully populated schedule", () => {
        const field: FormDateTimeInput = {
            name: "preferred_time",
            title: "When works for you?",
            type: "DATETIME",
            mandatory: true,
            mandatoryError: "Please pick a date and time",
            dateFieldName: "preferred_date",
            dateTimeFieldName: "datetime",
            schedule: {
                timezone: "America/Chicago",
                slotMinutes: 30,
                durationMinutes: 30,
                days: {
                    monday: [{ start: "09:00", end: "12:00" }, { start: "13:00", end: "17:00" }],
                    tuesday: [{ start: "09:00", end: "17:00" }],
                    saturday: [{ start: "10:00", end: "14:00" }]
                },
                exceptions: [
                    { date: "2026-12-25", spans: [] },
                    { date: "2026-12-24", spans: [{ start: "09:00", end: "12:00" }] }
                ],
                leadTimeMinutes: 120,
                horizonDays: 45,
                capacity: { mode: "NONE" }
            }
        };

        expect(field.schedule.days?.monday).to.have.length(2);
        expect(field.schedule.exceptions?.[0].spans).to.be.empty;
    });

    it("is assignable to FormField", () => {
        const field: FormDateTimeInput = {
            name: "preferred_time",
            type: "DATETIME",
            schedule: { timezone: "America/Denver" }
        };

        const fields: FormField[] = [field];

        expect(fields[0]).to.equal(field);
    });

    it("requires a schedule", () => {
        // A *missing* property is reported on the declaration rather than on any member,
        // so this directive sits here and not inside the literal — unlike the timezone case
        // below, where the error lands on the offending property itself.
        // @ts-expect-error schedule is required on a DATETIME field
        const missingSchedule: FormDateTimeInput = {
            name: "preferred_time",
            type: "DATETIME"
        };

        expect(missingSchedule.name).to.equal("preferred_time");
    });

    it("requires a timezone on the schedule", () => {
        const field: FormDateTimeInput = {
            name: "preferred_time",
            type: "DATETIME",
            // @ts-expect-error timezone is required so slots cannot be generated in the host zone by accident
            schedule: {
                slotMinutes: 30
            }
        };

        expect(field.type).to.equal("DATETIME");
    });

    it("is exported from the package entry point", () => {
        const field: ExportedFormDateTimeInput = {
            name: "preferred_time",
            type: "DATETIME",
            schedule: { timezone: "UTC" }
        };
        const schedule: ExportedTimeSlotSchedule = field.schedule;

        expect(schedule.timezone).to.equal("UTC");
    });
});

describe("TimeOffering", () => {
    it("represents a discrete slot when end is omitted", () => {
        const offering: TimeOffering = { start: "09:30" };

        expect(offering.end).to.be.undefined;
    });

    it("represents a window when end is present", () => {
        const offering: TimeOffering = {
            label: "Morning",
            start: "08:00",
            end: "12:00",
            group: "Anytime"
        };

        expect(offering.end).to.equal("12:00");
    });

    it("requires a start", () => {
        // @ts-expect-error start is required — an offering with no start cannot be rendered or submitted
        const offering: TimeOffering = { label: "Whenever" };

        expect(offering.label).to.equal("Whenever");
    });

    it("converts to a SelectableItem without reshaping the time fields", () => {
        // Guards the widget's conversion path: the picker turns offerings into the same
        // SelectableItem shape the CHIPS field already serializes into
        // preferred_time_start / preferred_time_end.
        const offering: TimeOffering = { label: "9:30 AM", start: "09:30", end: "10:00" };

        const item: SelectableItem = {
            id: "0930",
            label: offering.label ?? offering.start,
            startTime: offering.start,
            endTime: offering.end
        };

        expect(item.startTime).to.equal("09:30");
        expect(item.endTime).to.equal("10:00");
    });
});

describe("TimeSpan", () => {
    it("requires both start and end", () => {
        const span: TimeSpan = { start: "09:00", end: "17:00" };

        expect(span.start).to.equal("09:00");

        // @ts-expect-error end is required — an open-ended span cannot bound slot generation
        const openEnded: TimeSpan = { start: "09:00" };

        expect(openEnded.start).to.equal("09:00");
    });
});

describe("ScheduleException", () => {
    it("treats an empty spans array as closed", () => {
        const closed: ScheduleException = { date: "2026-07-04", spans: [] };

        expect(closed.spans).to.be.empty;
    });

    it("requires spans so a closed day is explicit rather than implied", () => {
        // @ts-expect-error spans is required — omitting it would be ambiguous with "closed"
        const ambiguous: ScheduleException = { date: "2026-07-04" };

        expect(ambiguous.date).to.equal("2026-07-04");
    });
});

describe("SlotCapacityPolicy", () => {
    it("accepts each supported mode", () => {
        const modes: SlotCapacityPolicy[] = [
            { mode: "NONE" },
            { mode: "ON_SUBMIT", perSlot: 2 },
            { mode: "ON_CONFIRM", perSlot: 1, perDay: 8 }
        ];

        expect(modes).to.have.length(3);
    });

    it("rejects an unknown mode", () => {
        const policy: SlotCapacityPolicy = {
            // @ts-expect-error ON_DISPATCH is not a supported capacity mode
            mode: "ON_DISPATCH"
        };

        expect(policy).to.exist;
    });
});

describe("TimeSlotSchedule", () => {
    it("keys days by DayOfWeek", () => {
        const schedule: TimeSlotSchedule = {
            timezone: "America/Los_Angeles",
            days: {
                monday: [{ start: "09:00", end: "17:00" }]
            }
        };

        expect(schedule.days?.monday).to.have.length(1);
    });

    it("rejects a day key that is not a DayOfWeek", () => {
        const schedule: TimeSlotSchedule = {
            timezone: "America/Los_Angeles",
            days: {
                // @ts-expect-error "funday" is not a DayOfWeek
                funday: [{ start: "09:00", end: "17:00" }]
            }
        };

        expect(schedule.timezone).to.equal("America/Los_Angeles");
    });

    it("allows explicit offerings in place of generated slots", () => {
        const schedule: TimeSlotSchedule = {
            timezone: "America/New_York",
            offerings: [
                { label: "Morning", start: "08:00", end: "12:00" },
                { label: "Afternoon", start: "12:00", end: "17:00" },
                { start: "17:30" }
            ]
        };

        expect(schedule.offerings).to.have.length(3);
    });
});
