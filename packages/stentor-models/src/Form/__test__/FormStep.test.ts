/*! Copyright (c) 2026, XAPP AI */
import { expect } from "chai";

import { FormStep, FormStepExternalWidget, FormStepIFrame, FormSteps } from "../FormStep";
// Imported through the package entry point rather than the module, so a step dropped from a
// barrel file fails here instead of silently leaving the published surface.
import { FormStep as ExportedFormStep } from "../../index";

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

    // Every member of FormSteps extends FormStep, so for assignment purposes the union is
    // equivalent to FormStep alone -- a subtype is assignable to the union via the base member
    // whether or not it is named in it. Verified by mutation: removing FormStepIFrame *or*
    // FormStepExternalWidget from the union produces no error here, while removing FormStep
    // does. So this guards the base member only; asserting the two subtypes separately would
    // read as coverage while being incapable of failing, and the union's real payload is
    // narrowing, which needs a type guard this package does not ship.
    it("keeps FormStep itself a member of FormSteps, which subtypes rely on for assignability", () => {
        const plain: FormStep = { name: "step-one", fields: [] };
        const iframe: FormStepIFrame = {
            name: "step-two",
            fields: [],
            iframe: { src: "https://embed.example.com/form" }
        };
        const steps: FormSteps[] = [plain, iframe];

        expect(steps[0]).to.equal(plain);
        expect(steps[1]).to.equal(iframe);
    });
});

describe("FormStep", () => {
    describe("subtitle", () => {
        it("accepts a supporting line alongside the title", () => {
            const step: FormStep = {
                name: "intro",
                title: "Get your free estimate",
                subtitle: "Tell us about the job and we'll match you with a pro.",
                fields: []
            };

            expect(step.subtitle).to.equal("Tell us about the job and we'll match you with a pro.");
        });

        it("is optional, so steps authored before it still type-check", () => {
            const step: FormStep = {
                name: "intro",
                title: "Get your free estimate",
                fields: []
            };

            expect(step.subtitle).to.be.undefined;
        });

        it("is a string", () => {
            const step: FormStep = {
                name: "intro",
                // As above, the directive sits on the erroring line: the mismatch is reported
                // on the property, not on the declaration.
                // @ts-expect-error subtitle is a string, not a number
                subtitle: 1,
                fields: []
            };

            expect(step.subtitle).to.equal(1);
        });

        it("is inherited by the FormStep subtypes", () => {
            const iframe: FormStepIFrame = {
                name: "schedule",
                subtitle: "All times are local to you.",
                fields: [],
                iframe: { src: "https://embed.example.com/schedule" }
            };
            const externalWidget: FormStepExternalWidget = {
                name: "booking-handoff",
                subtitle: "One last step.",
                fields: [],
                externalWidget: {
                    anchorId: "airo-anchor",
                    scriptSrc: "https://embed.example.com/widget.js",
                    configGlobal: "airoBookingForm",
                    config: {}
                }
            };
            const steps: FormSteps[] = [iframe, externalWidget];

            expect(steps.map((step) => step.subtitle)).to.deep.equal([
                "All times are local to you.",
                "One last step."
            ]);
        });

        it("is reachable from the package entry point", () => {
            const step: ExportedFormStep = {
                name: "intro",
                subtitle: "A supporting line.",
                fields: []
            };

            expect(step.subtitle).to.equal("A supporting line.");
        });
    });
});
