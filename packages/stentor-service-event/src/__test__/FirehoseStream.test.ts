/*! Copyright (c) 2019, XAPPmedia */
import * as Chai from "chai";
import * as Sinon from "sinon";
import * as SinonChai from "sinon-chai";

import { Event } from "stentor-models";
import { Firehose } from "aws-sdk";
import { FirehoseStream } from "../FirehoseStream";

Chai.use(SinonChai);
const expect = Chai.expect;

describe("FirehouseStream", () => {
    let putRecordBatchStub: Sinon.SinonStub;
    let testFirehouse: Firehose;

    const testEvent: Event<any> = {
        type: "REQUEST",
        name: "Test Event",
        payload: {
            message: "An Event thrown in a firehouse stream test."
        }
    };

    before(() => {
        testFirehouse = new Firehose();
        testFirehouse.putRecordBatch = putRecordBatchStub = Sinon.stub();
    });

    beforeEach(() => {
        putRecordBatchStub.reset();
        putRecordBatchStub.returns({
            promise: () => {
                return Promise.resolve();
            }
        });
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
