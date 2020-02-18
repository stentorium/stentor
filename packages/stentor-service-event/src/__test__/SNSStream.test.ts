/*! Copyright (c) 2019, XAPPmedia */
import * as Chai from "chai";
import * as Sinon from "sinon";
import * as SinonChai from "sinon-chai";

import { Event } from "stentor-models";
import { SNS } from "aws-sdk";
import { SNSStream } from "../SNSStream";

Chai.use(SinonChai);
const expect = Chai.expect;

describe("SNSStreamStream", () => {
    let publishStub: Sinon.SinonStub;
    let testSNS: SNS;

    const testEvent: Event<any> = {
        type: "REQUEST",
        name: "Test Event",
        payload: {
            message: "An Event thrown in a sns stream test."
        }
    };

    before(() => {
        testSNS = new SNS();
        testSNS.publish = publishStub = Sinon.stub();
    });

    beforeEach(() => {
        publishStub.reset();
        publishStub.returns({
            promise: () => {
                return Promise.resolve();
            }
        });
    });

    it("Tests that the flush sends all the records.", async () => {
        const stream = new SNSStream("TestArn", testSNS);
        stream.addEvent(testEvent);
        await stream.flush();
        expect(publishStub).to.have.been.calledWithMatch({
            TopicArn: "TestArn",
            Message: JSON.stringify([testEvent])
        });
    });

    it("Tests that an error is properly thrown if the events can't be processed.", async () => {
        const circular: any = { param1: "Value1" };
        circular.o = circular;
        const circularEvent = {
            ...testEvent,
            payload: circular
        };
        const stream = new SNSStream("TestArn", testSNS);
        stream.addEvent(circularEvent);

        let caughtError: Error;
        try {
            await stream.flush();
        } catch (e) {
            caughtError = e;
        }
        expect(caughtError).to.exist;
    });
});
