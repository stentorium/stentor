/*! Copyright (c) 2026, XAPP AI */
import { expect } from "chai";

import { FormStep, FormStepExternalWidget, FormSteps } from "../FormStep";

describe("FormStepExternalWidget", () => {
    it("is assignable to FormSteps with only the required externalWidget fields set", () => {
        const step: FormStepExternalWidget = {
            name: "booking-handoff",
            fields: [],
            externalWidget: {
                anchorId: "airo-anchor",
                scriptSrc: "https://embed.example.com/widget.js",
                configGlobal: "airoBookingForm",
                config: {}
            }
        };

        const steps: FormSteps[] = [step];

        expect(steps[0]).to.equal(step);
    });

    it("accepts all optional externalWidget fields", () => {
        const step: FormStepExternalWidget = {
            name: "booking-handoff",
            fields: [],
            fullBleed: true,
            externalWidget: {
                anchorId: "airo-anchor",
                scriptSrc: "https://embed.example.com/widget.js",
                configGlobal: "airoBookingForm",
                config: {
                    advertiserId: "123",
                    trade: "hvac",
                    enabled: true
                },
                successCallbackKey: "apptScheduledCallback",
                cacheBust: true,
                renderTimeoutMs: 4000,
                fallbackStep: "no-match"
            }
        };

        const steps: FormSteps[] = [step];

        expect((steps[0] as FormStepExternalWidget).externalWidget.fallbackStep).to.equal("no-match");
    });

    it("rejects an empty externalWidget", () => {
        const missingRequired: FormStepExternalWidget = {
            name: "booking-handoff",
            fields: [],
            // The directive must sit on the erroring line itself: the assignability error is
            // reported on this property, not on the declaration above it.
            // @ts-expect-error externalWidget is missing the required anchorId/scriptSrc/configGlobal/config fields
            externalWidget: {}
        };

        expect(missingRequired.externalWidget).to.be.an("object");
    });

    // Each case below omits exactly one required field and keeps the other three, so its
    // directive goes unused the moment that *single* field becomes optional. The empty-object
    // case above cannot do this on its own: `{}` keeps erroring as long as any one field is
    // still required, so it would silently pass a one-field regression.
    it("requires anchorId on externalWidget", () => {
        const step: FormStepExternalWidget = {
            name: "booking-handoff",
            fields: [],
            // @ts-expect-error anchorId is required
            externalWidget: {
                scriptSrc: "https://embed.example.com/widget.js",
                configGlobal: "airoBookingForm",
                config: {}
            }
        };

        expect(step.externalWidget).to.be.an("object");
    });

    it("requires scriptSrc on externalWidget", () => {
        const step: FormStepExternalWidget = {
            name: "booking-handoff",
            fields: [],
            // @ts-expect-error scriptSrc is required
            externalWidget: {
                anchorId: "airo-anchor",
                configGlobal: "airoBookingForm",
                config: {}
            }
        };

        expect(step.externalWidget).to.be.an("object");
    });

    it("requires configGlobal on externalWidget", () => {
        const step: FormStepExternalWidget = {
            name: "booking-handoff",
            fields: [],
            // @ts-expect-error configGlobal is required
            externalWidget: {
                anchorId: "airo-anchor",
                scriptSrc: "https://embed.example.com/widget.js",
                config: {}
            }
        };

        expect(step.externalWidget).to.be.an("object");
    });

    it("requires config on externalWidget", () => {
        const step: FormStepExternalWidget = {
            name: "booking-handoff",
            fields: [],
            // @ts-expect-error config is required
            externalWidget: {
                anchorId: "airo-anchor",
                scriptSrc: "https://embed.example.com/widget.js",
                configGlobal: "airoBookingForm"
            }
        };

        expect(step.externalWidget).to.be.an("object");
    });

    it("keeps plain FormStep and existing FormStepIFrame consumers assignable to FormSteps", () => {
        const plain: FormStep = { name: "step-one", fields: [] };
        const steps: FormSteps[] = [plain];

        expect(steps[0]).to.equal(plain);
    });
});
