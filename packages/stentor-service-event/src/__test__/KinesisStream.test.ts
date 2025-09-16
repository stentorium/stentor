/*! Copyright (c) 2019, XAPPmedia */
import * as Chai from "chai";
import * as Sinon from "sinon";
import * as SinonChai from "sinon-chai";

import { Event } from "stentor-models";
import {
    KinesisStream,
    KinesisStreamProps,
    randomPartitionKeyGenerator,
    staticPartitionGenerator
} from "../KinesisStream";

Chai.use(SinonChai);
const expect = Chai.expect;

describe("KinesisStream", () => {
    let putRecordsStub: Sinon.SinonStub;
    let sendStub: Sinon.SinonStub;
    let testKinesis: any;

    const testEvent: Event<any> = {
        type: "REQUEST",
        name: "Test Event",
        payload: {
            message: "An Event thrown in a firehouse stream test."
        }
    };

    before(() => {
        // Create a mock client that works with both v2 and v3 APIs
        testKinesis = {
            putRecords: Sinon.stub(),
            send: Sinon.stub()
        };
        putRecordsStub = testKinesis.putRecords;
        sendStub = testKinesis.send;

        // Mock the PutRecordsCommand for v3 API
        sendStub.callsFake(() => {
            // The command should have the input property with our parameters
            return Promise.resolve();
        });
    });

    beforeEach(() => {
        putRecordsStub.resetHistory();
        putRecordsStub.resetBehavior();
        sendStub.resetHistory();
        sendStub.resetBehavior();
        
        // Mock v2 API
        putRecordsStub.returns({
            promise: () => Promise.resolve()
        });
        
        // Mock v3 API
        sendStub.returns(Promise.resolve());
    });

    describe("Constructor", () => {
        it("Tests that an error is thrown if the stream name is not provided.", () => {
            let caughtError: Error;
            try {
                new KinesisStream({ streamName: undefined });
            } catch (e) {
                caughtError = e;
            }
            expect(caughtError).to.exist;
            expect(caughtError).to.be.instanceOf(Error);
            expect(caughtError.message).to.equal("Stream name must be provided for Kinesis event streaming.");
        });
    });

    describe("staticPartitionGenerator", () => {
        it("Tests that the string entered is the string returned.", () => {
            const generator = staticPartitionGenerator("Test");
            expect(generator()).to.equal("Test");
        });
    });

    describe("random", () => {
        it("Tests that the string entered is different each time.", () => {
            const generator = randomPartitionKeyGenerator();
            expect(generator()).to.not.equal(generator()); // It's possible that this will fail because it's "random", but that's extremely unlikely.
        });

        it("Tests that the size of the string is taken in to account.", () => {
            const stringSize = 10;
            const generator = randomPartitionKeyGenerator(stringSize);
            expect(generator()).to.have.length(stringSize);
        });
    });

    describe("KinesisStream class", () => {
        it("Tests that the flush sends all the records.", async () => {
            const props: KinesisStreamProps = {
                streamName: "StreamName",
                partitionKey: "TestPartition",
                kinesis: testKinesis
            };
            const stream = new KinesisStream(props);
            stream.addEvent(testEvent);
            await stream.flush();

            // The implementation tries v3 first, then falls back to v2
            // Since v3 SDK is available in devDependencies, it will use the v3 API
            if (sendStub.called) {
                // AWS SDK v3 - check the send method was called with a command
                expect(sendStub).to.have.been.calledOnce;
                const command = sendStub.getCall(0).args[0];
                expect(command.input).to.deep.equal({
                    StreamName: "StreamName",
                    Records: [
                        {
                            Data: JSON.stringify(testEvent),
                            PartitionKey: "TestPartition"
                        }
                    ]
                });
            } else {
                // AWS SDK v2 - check the putRecords method was called
                expect(putRecordsStub).to.have.been.calledWithMatch({
                    StreamName: "StreamName",
                    Records: [
                        {
                            Data: JSON.stringify(testEvent),
                            PartitionKey: "TestPartition"
                        }
                    ]
                });
            }
        });

        it("Tests that the custom generator uses the partition.", async () => {
            const props: KinesisStreamProps = {
                streamName: "StreamName",
                partitionKey: () => "MyOwnPartition",
                kinesis: testKinesis
            };
            const stream = new KinesisStream(props);
            stream.addEvent(testEvent);
            await stream.flush();

            // The implementation tries v3 first, then falls back to v2
            // Since v3 SDK is available in devDependencies, it will use the v3 API
            if (sendStub.called) {
                // AWS SDK v3 - check the send method was called with a command
                expect(sendStub).to.have.been.calledOnce;
                const command = sendStub.getCall(0).args[0];
                expect(command.input).to.deep.equal({
                    StreamName: "StreamName",
                    Records: [
                        {
                            Data: JSON.stringify(testEvent),
                            PartitionKey: "MyOwnPartition"
                        }
                    ]
                });
            } else {
                // AWS SDK v2 - check the putRecords method was called
                expect(putRecordsStub).to.have.been.calledWithMatch({
                    StreamName: "StreamName",
                    Records: [
                        {
                            Data: JSON.stringify(testEvent),
                            PartitionKey: "MyOwnPartition"
                        }
                    ]
                });
            }
        });

        it("Tests that an error is thrown if the records can not be stringified.", async () => {
            const circular: any = { param1: "param" };
            circular.o = circular;
            const circularEvent = {
                ...testEvent,
                payload: circular
            };
            const props: KinesisStreamProps = {
                streamName: "StreamName",
                partitionKey: "TestPartition",
                kinesis: testKinesis
            };
            const stream = new KinesisStream(props);
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
});
