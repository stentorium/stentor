/*! Copyright (c) 2019, XAPPmedia */
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
    describe("#get()", () => {
        let service: OVAIService;
        beforeEach(() => {
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
        describe("when handler exists", () => {
            beforeEach(() => {
                fetchMock.get(
                    "https://api.xapp.media/cms/handler/TestIntent",
                    {
                        handler: {
                            intentId: "TestIntent",
                            name: "Test Handler",
                            type: "ConversationHandler"
                        }
                    },
                    {
                        name: "GET_HANDLER",
                        method: "GET",
                        overwriteRoutes: true
                    }
                );
            });
            it("returns the handler", async () => {
                const handler = await service.get("TestIntent");
                expect(handler).to.exist;
                expect(handler.intentId).to.equal("TestIntent");
            });
        });
        describe("when handler does not exist (404)", () => {
            beforeEach(() => {
                fetchMock.get(
                    "https://api.xapp.media/cms/handler/NonExistentIntent",
                    {
                        status: 404,
                        body: {
                            errorType: "HandledError",
                            httpStatus: 404,
                            message: "Handler not found."
                        }
                    },
                    {
                        name: "GET_HANDLER_404",
                        method: "GET",
                        overwriteRoutes: true
                    }
                );
            });
            it("throws an error with intentId", async () => {
                try {
                    await service.get("NonExistentIntent");
                    expect.fail("Should have thrown an error");
                } catch (error) {
                    expect(error.message).to.include("NonExistentIntent");
                    expect(error.message).to.include("not found");
                    expect(error.message).to.include("Please verify the intentId exists");
                }
            });
        });
        describe("when unauthorized (401)", () => {
            beforeEach(() => {
                fetchMock.get(
                    "https://api.xapp.media/cms/handler/TestIntent",
                    {
                        status: 401,
                        body: {
                            message: "Unauthorized"
                        }
                    },
                    {
                        name: "GET_HANDLER_401",
                        method: "GET",
                        overwriteRoutes: true
                    }
                );
            });
            it("throws an unauthorized error", async () => {
                try {
                    await service.get("TestIntent");
                    expect.fail("Should have thrown an error");
                } catch (error) {
                    expect(error.message).to.include("Token provided to OVAIService is unauthorized");
                }
            });
        });
        describe("when server error (500)", () => {
            beforeEach(() => {
                fetchMock.get(
                    "https://api.xapp.media/cms/handler/TestIntent",
                    {
                        status: 500,
                        body: {
                            message: "Internal Server Error"
                        }
                    },
                    {
                        name: "GET_HANDLER_500",
                        method: "GET",
                        overwriteRoutes: true
                    }
                );
            });
            it("throws an error with status code", async () => {
                try {
                    await service.get("TestIntent");
                    expect.fail("Should have thrown an error");
                } catch (error) {
                    expect(error.message).to.include("OVAIService.get()");
                    expect(error.message).to.include("500");
                    expect(error.message).to.include("TestIntent");
                }
            });
        });
        describe("when passed intentId as object", () => {
            beforeEach(() => {
                fetchMock.get(
                    "https://api.xapp.media/cms/handler/ObjectIntent",
                    {
                        handler: {
                            intentId: "ObjectIntent",
                            name: "Object Test Handler",
                            type: "ConversationHandler"
                        }
                    },
                    {
                        name: "GET_HANDLER_OBJECT",
                        method: "GET",
                        overwriteRoutes: true
                    }
                );
            });
            it("extracts the intentId and returns the handler", async () => {
                const handler = await service.get({ intentId: "ObjectIntent" });
                expect(handler).to.exist;
                expect(handler.intentId).to.equal("ObjectIntent");
            });
        });
    });
});
