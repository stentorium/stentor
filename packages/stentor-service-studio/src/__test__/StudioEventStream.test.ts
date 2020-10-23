/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { StudioEventStream } from "../StudioEventStream";

describe(`${StudioEventStream.name}`, () => {
    describe("#constructor()", () => {
        describe("when passed bad props", () => {
            it("throws an error", () => {
                expect(() => {
                    new StudioEventStream(undefined);
                }).to.throw("Invalid props passed to StudioEventStream.");
                expect(() => {
                    new StudioEventStream({} as any);
                }).to.throw("StudioService is required for the StudioEventStream.");
            });
        });
    });
});
