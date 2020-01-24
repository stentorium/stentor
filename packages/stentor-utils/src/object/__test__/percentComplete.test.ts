/*! Copyright (c) 2019, XAPPmedia */
/* tslint:disable:no-magic-numbers */
import { expect } from "chai";
import { percentComplete } from "../percentComplete";

const REQUIRED = ["liveStreamUrl", "name", "invocationName", "summary", "icon"];

describe("#percentComplete()", () => {
    let template: object;
    describe("with one provided", () => {
        it("returns close to .16", () => {
            template = {
                templateType: "RADIO_TEMPLATE",
                organizationId: "organizationId",
                liveStreamUrl: "https://some.url"
            };
            expect(percentComplete(template, REQUIRED)).to.be.closeTo(0.2, 0.01);
        });
    });
    describe("with empty strings", () => {
        let template: object;
        it("returns 0.0", () => {
            template = {
                templateType: "RADIO_TEMPLATE",
                organizationId: "",
                liveStreamUrl: "",
                name: "",
                icon: ""
            };
            expect(percentComplete(template, REQUIRED)).to.be.equal(0);
        });
    });
    describe("with all provided", () => {
        it("returns 1.0", () => {
            template = {
                templateType: "RADIO_TEMPLATE",
                organizationId: "organizationId",
                liveStreamUrl: "https://some.url",
                name: "name",
                invocationName: "invocation",
                summary: "summary",
                icon: "https://some.url/organization/app/file.png"
            };
            expect(percentComplete(template, REQUIRED)).to.be.closeTo(1.0, 0.01);
        });
    });
    describe("With remaining if asked.", () => {
        it("returns the remaining.", () => {
            template = {
                templateType: "RADIO_TEMPLATE",
                organizationId: "organizationId",
                liveStreamUrl: "https://some.url"
            };
            const complete = percentComplete(template, REQUIRED, true);
            expect(complete.percentComplete).to.be.closeTo(0.2, 0.01);
            expect(complete.remaining).to.have.members(["name", "invocationName", "summary", "icon"]);
        });
    });
});
