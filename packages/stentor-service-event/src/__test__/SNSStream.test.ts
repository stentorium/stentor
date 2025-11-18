/*! Copyright (c) 2019, XAPPmedia */
import * as Chai from "chai";
import * as Sinon from "sinon";
import * as SinonChai from "sinon-chai";

import { Event } from "stentor-models";
import { SNSStream } from "../SNSStream";

Chai.use(SinonChai);
const expect = Chai.expect;

describe("SNSStreamStream", () => {
  let publishStub: Sinon.SinonStub;
  let sendStub: Sinon.SinonStub;
  let testSNS: any;

  const testEvent: Event<any> = {
    type: "REQUEST",
    name: "Test Event",
    payload: {
      message: "An Event thrown in a sns stream test.",
    },
  };

  before(() => {
    // Create a mock client that works with both v2 and v3 APIs
    testSNS = {
      publish: Sinon.stub(),
      send: Sinon.stub(),
    };
    publishStub = testSNS.publish;
    sendStub = testSNS.send;

    // Mock the PublishCommand for v3 API
    sendStub.callsFake(() => {
      // The command should have the input property with our parameters
      return Promise.resolve();
    });
  });

  beforeEach(() => {
    publishStub.resetHistory();
    publishStub.resetBehavior();
    sendStub.resetHistory();
    sendStub.resetBehavior();

    // Mock v2 API
    publishStub.returns({
      promise: () => Promise.resolve(),
    });

    // Mock v3 API
    sendStub.returns(Promise.resolve());
  });

  it("Tests that the flush sends all the records.", async () => {
    const stream = new SNSStream("TestArn", testSNS);
    stream.addEvent(testEvent);
    await stream.flush();

    // The implementation tries v3 first, then falls back to v2
    // Since v3 SDK is available in devDependencies, it will use the v3 API
    if (sendStub.called) {
      // AWS SDK v3 - check the send method was called with a command
      expect(sendStub).to.have.been.calledOnce;
      const command = sendStub.getCall(0).args[0];
      expect(command.input).to.deep.equal({
        TopicArn: "TestArn",
        Message: JSON.stringify([testEvent]),
      });
    } else {
      // AWS SDK v2 - check the publish method was called
      expect(publishStub).to.have.been.calledWithMatch({
        TopicArn: "TestArn",
        Message: JSON.stringify([testEvent]),
      });
    }
  });

  it("Tests that an error is properly thrown if the events can't be processed.", async () => {
    const circular: any = { param1: "Value1" };
    circular.o = circular;
    const circularEvent = {
      ...testEvent,
      payload: circular,
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
