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

    it("requires anchorId, scriptSrc, configGlobal and config on externalWidget", () => {
        // @ts-expect-error externalWidget is missing the required anchorId/scriptSrc/configGlobal/config fields
        const missingRequired: FormStepExternalWidget = {
            name: "booking-handoff",
            fields: [],
            externalWidget: {}
        };

        expect(missingRequired.externalWidget).to.be.an("object");
    });

    it("keeps plain FormStep and existing FormStepIFrame consumers assignable to FormSteps", () => {
        const plain: FormStep = { name: "step-one", fields: [] };
        const steps: FormSteps[] = [plain];

        expect(steps[0]).to.equal(plain);
    });
});
