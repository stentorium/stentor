/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { OVAIEventStream } from "../OVAIEventStream";

describe("OVAIEventStream", () => {
    describe("#constructor()", () => {
        describe("when passed bad props", () => {
            it("throws an error", () => {
                expect(() => {
                    new OVAIEventStream(undefined);
                }).to.throw("Invalid props passed to OVAIEventStream.");
                expect(() => {
                    new OVAIEventStream({} as any);
                }).to.throw("OVAIService is required for the OVAIEventStream.");
            });
        });
    });
});
