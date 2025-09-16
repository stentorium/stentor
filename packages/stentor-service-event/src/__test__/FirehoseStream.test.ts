/*! Copyright (c) 2019, XAPPmedia */
import * as Chai from "chai";
import * as Sinon from "sinon";
import * as SinonChai from "sinon-chai";

import { Event } from "stentor-models";
import { FirehoseStream } from "../FirehoseStream";

Chai.use(SinonChai);
const expect = Chai.expect;

describe("FirehouseStream", () => {
    let putRecordBatchStub: Sinon.SinonStub;
    let sendStub: Sinon.SinonStub;
    let testFirehouse: any;

    const testEvent: Event<any> = {
        type: "REQUEST",
        name: "Test Event",
        appId: "appId",
        platform: "platform",
        channel: "channel",
        payload: {
            message: "An Event thrown in a firehouse stream test."
        }
    };

    before(() => {
        // Create a mock client that works with both v2 and v3 APIs
        testFirehouse = {
            putRecordBatch: Sinon.stub(),
            send: Sinon.stub()
        };
        putRecordBatchStub = testFirehouse.putRecordBatch;
        sendStub = testFirehouse.send;
    });

    beforeEach(() => {
        putRecordBatchStub.resetHistory();
        putRecordBatchStub.resetBehavior();
        sendStub.resetHistory();
        sendStub.resetBehavior();
        
        // Mock v2 API
        putRecordBatchStub.returns({
            promise: () => Promise.resolve()
        });
        
        // Mock v3 API
        sendStub.returns(Promise.resolve());
    });

    it("Tests that the flush sends all the records.", async () => {
        const stream = new FirehoseStream("StreamName", testFirehouse);
        stream.addEvent(testEvent);
        await stream.flush();
        expect(putRecordBatchStub).to.have.been.calledWithMatch({
            DeliveryStreamName: "StreamName",
            Records: [
                {
                    Data: JSON.stringify(testEvent)
                }
            ]
        });
    });

    it("throws an error if the required fields are not provided", async () => {
        const stream = new FirehoseStream("StreamName", testFirehouse);
        const copyEvent = { ...testEvent };
        delete copyEvent.channel;
        stream.addEvent(copyEvent);

        let caughtError: Error;
        try {
            await stream.flush();
        } catch (e) {
            caughtError = e;
        }
        expect(caughtError).to.exist;
    });

    it("Tests that an error is thrown if the records can not be stringified.", async () => {
        const circular: any = { param1: "param" };
        circular.o = circular;
        const circularEvent = {
            ...testEvent,
            payload: circular
        };
        const stream = new FirehoseStream("StreamName", testFirehouse);
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
