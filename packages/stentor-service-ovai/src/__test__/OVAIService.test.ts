/*! Copyright (c) 2019, XAPPmedia */
// tslint:disable:no-magic-numbers
import { expect } from "chai";

import { OVAIService } from "../OVAIService";

import { FetchMockStatic } from "fetch-mock";
const fetchMock = require("fetch-mock/es5/server") as FetchMockStatic;

describe("OVAIService", () => {
    describe("#constructor()", () => {
        describe("with environment variables", () => {
            beforeEach(() => {
                process.env.OVAI_TOKEN = "token";
                process.env.OVAI_APP_ID = "appId";
            });
            afterEach(() => {
                delete process.env.OVAI_TOKEN;
                delete process.env.OVAI_APP_ID;
            });
            describe("and no props", () => {
                it("doesn't throw an error", () => {
                    expect(() => {
                        new OVAIService();
                    }).to.not.throw;
                });
            });
        });
        describe("without environment variables", () => {
            describe("and no props", () => {
                it("throws an error", () => {
                    expect(() => {
                        new OVAIService();
                    }).to.throw("A token must be provided");
                    expect(() => {
                        new OVAIService({ token: "token" });
                    }).to.throw("An appId must be provided");
                });
            });
            describe("and props", () => {
                it("doesn't throw an error", () => {
                    expect(() => {
                        new OVAIService({ token: "token", appId: "appId" });
                    }).to.not.throw();
                });
            });
        });
    });
    describe("#putEvents()", () => {
        describe("when passed events without appId", () => {
            let service: OVAIService;
            beforeEach(() => {
                fetchMock.put(
                    "https://api.xapp.media/cms/app/events",
                    {},
                    {
                        name: "EVENTS",
                        method: "PUT",
                        overwriteRoutes: true,
                        response: {}
                    }
                );
                service = new OVAIService({
                    appId: "appId",
                    token: "token"
                });
            });
            afterEach(() => {
                fetchMock.reset();
            });
            after(() => {
                fetchMock.restore();
            });
            it("adds the appId", async () => {
                await service.putEvents([{ name: "Error", type: "ERROR", payload: { message: "message" } }]);
                expect(fetchMock.called()).to.be.true;
                expect(fetchMock.calls()[0][1].body).to.deep.equal(
                    '{"events":[{"name":"Error","type":"ERROR","payload":{"message":"message"},"appId":"appId"}]}'
                );
            });
        });
    });
});
