/*! Copyright (c) 2019, XAPPmedia */
import * as Chai from "chai";
import * as Sinon from "sinon";
import * as SinonChai from "sinon-chai";

import { Event } from "stentor-models";
import { ConsoleStream } from "../ConsoleStream";

Chai.use(SinonChai);
const expect = Chai.expect;

describe("ConsoleStream", () => {
    const testEvent: Event<any> = {
        type: "REQUEST",
        name: "Test Event",
        payload: {
            message: "An event thrown in a console stream test."
        }
    };

    let consoleLogSpy: Sinon.SinonSpy;

    beforeEach(() => {
        consoleLogSpy = Sinon.spy(console, "log");
    });

    after(() => {
        consoleLogSpy.restore();
    });

    it("Tests that the flush sends all the records.", async () => {
        const stream = new ConsoleStream();
        stream.addEvent(testEvent);
        await stream.flush();
        expect(consoleLogSpy).to.have.been.calledOnce;
    });
});
