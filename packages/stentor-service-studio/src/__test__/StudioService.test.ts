/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { StudioService } from "../StudioService";

import { FetchMockStatic } from "fetch-mock";
const fetchMock = require("fetch-mock/es5/server") as FetchMockStatic;

describe(`${StudioService.name}`, () => {
    describe("#constructor()", () => {
        describe("with environment variables", () => {
            beforeEach(() => {
                process.env.STUDIO_TOKEN = "token";
                process.env.STUDIO_APP_ID = "appId";
            });
            afterEach(() => {
                delete process.env.STUDIO_TOKEN;
                delete process.env.STUDIO_APP_ID;
            });
            describe("and no props", () => {
                it("doesn't throw an error", () => {
                    expect(() => {
                        new StudioService();
                    }).to.not.throw();
                });
            });
        });
        describe("without environment variables", () => {
            describe("and no props", () => {
                it("throws an error", () => {
                    expect(() => {
                        new StudioService();
                    }).to.throw("A token must be provided");
                    expect(() => {
                        new StudioService({ token: "token" });
                    }).to.throw("An appId must be provided");
                });
            });
            describe("and props", () => {
                it("doesn't throw an error", () => {
                    expect(() => {
                        new StudioService({ token: "token", appId: "appId" });
                    }).to.not.throw();
                });
            });
        });
    });
    describe("#putEvents()", () => {
        describe("when passed events without appId", () => {
            let service: StudioService;
            beforeEach(() => {
                fetchMock.put(
                    "https://api.xapp.ai/cms/app/events",
                    {},
                    {
                        name: "EVENTS",
                        method: "PUT",
                        overwriteRoutes: true,
                        response: {}
                    }
                );
                service = new StudioService({
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
                await service.putEvents([{ name: "Error", type: "ERROR", platform: "platform", channel: "channel", payload: { message: "message" } }]);
                expect(fetchMock.called()).to.be.true;
                expect(fetchMock.calls()[0][1].body).to.deep.equal(
                    '{"events":[{"name":"Error","type":"ERROR","platform":"platform","channel":"channel","payload":{"message":"message"},"appId":"appId"}]}'
                );
            });
            describe("when passed invalid event", () => {
                it("throws an error", async () => {
                    let error: Error;
                    try {
                        await service.putEvents([{ name: "Error", type: "ERROR", platform: "platform", payload: { message: "message" } }]);
                    } catch (e) {
                        error = e;
                    }
                    expect(error).to.exist;
                    expect(error.message).to.contain("channel");
                });
            });
        });
    });
});
