/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { main } from "../main";
import { passThroughChannel } from "./Mocks";

chai.use(sinonChai);
const expect = chai.expect;

describe("main()", () => {
    let callbackSpy: sinon.SinonSpy;
    beforeEach(() => {
        callbackSpy = sinon.spy();
    });
    describe("when passed undefined request", () => {
        it("throws an error", async () => {
            const error = await main(undefined, undefined, callbackSpy, [passThroughChannel()], undefined).catch(
                error => error
            );
            expect(error).to.exist;
            expect(error).to.be.instanceOf(TypeError);
            expect((error as TypeError).message).to.equal(
                "Request passed to main() was either undefined or not an object."
            );
        });
    });
    describe("when passed undefined context", () => {
        it("throws an error", async () => {
            const error = await main({}, undefined, callbackSpy, [passThroughChannel()], undefined).catch(error => error);
            expect(error).to.exist;
            expect(error).to.be.instanceOf(TypeError);
            expect((error as TypeError).message).to.equal(
                "Context passed to main() was either undefined or not an object."
            );
        });
    });
    describe("when passed undefined callback", () => {
        it("throws an error", async () => {
            const error = await main({}, {} as any, undefined, [passThroughChannel()], undefined).catch(error => error);
            expect(error).to.exist;
            expect(error).to.be.instanceOf(TypeError);
            expect((error as TypeError).message).to.equal(
                "Callback passed to main() was either undefined or not a function."
            );
        });
    });
    describe("when passed empty channels array", () => {
        it("throws an error", async () => {
            const error = await main({}, {} as any, callbackSpy, [], undefined).catch(error => error);
            expect(error).to.exist;
            expect(error).to.be.instanceOf(TypeError);
            expect((error as TypeError).message).to.equal("Channels passed to main() was either undefined or empty.");
        });
    });
});
