/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import * as sinon from "sinon";

import { ContextBuilder } from "stentor-context";
import {
  Context,
  LastActiveResponse,
  Request,
  Response,
  SchedulableResponse,
  SimpleResponse,
  SlotDependentResponse,
  StorageDependentResponse,
} from "stentor-models";
import { IntentRequestBuilder } from "stentor-request";

import { determineResponse } from "../determineResponse";

const simpleResponse0: SimpleResponse = {
  name: "action",
  outputSpeech: "default",
};

const simpleResponse1: SimpleResponse = {
  name: "simpleResponse1",
  outputSpeech: "simpleResponse1",
};

const action0: SchedulableResponse = {
  name: "action0",
  outputSpeech: "output0",
  schedule: {
    start: {
      time: "5:00 Z",
      format: "H:mm Z",
      dayOfWeek: "12345",
    },
    duration: {
      amount: 6,
      format: "hours",
    },
  },
};
const action1: SchedulableResponse = {
  name: "action1",
  outputSpeech: "output1",
  schedule: {
    start: {
      time: "11:00 Z",
      format: "H:mm Z",
      dayOfWeek: "12345",
    },
    duration: {
      amount: 4,
      format: "hours",
    },
  },
};
const action2: SchedulableResponse = {
  name: "action2",
  outputSpeech: "output2",
  schedule: {
    start: {
      time: "15:00 Z",
      format: "H:mm Z",
      dayOfWeek: "12345",
    },
    duration: {
      amount: 5,
      format: "hours",
    },
  },
};
const action3: SchedulableResponse = {
  name: "action3",
  outputSpeech: "output3",
  schedule: {
    start: {
      time: "20:00 Z",
      format: "H:mm Z",
      dayOfWeek: "12345",
    },
    duration: {
      amount: 4,
      format: "hours",
    },
  },
};
const action4: SchedulableResponse = {
  name: "action4",
  outputSpeech: "output4",
  schedule: {
    start: {
      time: "0:00 Z",
      format: "H:mm Z",
      dayOfWeek: "12345",
    },
    duration: {
      amount: 5,
      format: "hours",
    },
  },
};

const contextualResponse0: LastActiveResponse = {
  name: "contextualResponse0",
  outputSpeech: "contextualResponse0",
  activeWithin: {
    amount: 5,
    format: "months",
  },
};

const contextualResponse1: LastActiveResponse = {
  name: "contextualResponse1",
  outputSpeech: "contextualResponse1",
  activeWithin: {
    amount: 5,
    format: "hours",
  },
};

// Tests
const slotDependentResponse0: SlotDependentResponse = {
  name: "slotDependentResponse0",
  outputSpeech: "slot0",
  slotMatch: {
    name: "SLOT",
    value: "value",
  },
};

const slotDependentResponse1: SlotDependentResponse = {
  name: "slotDependentResponse1",
  outputSpeech: "slot0",
  slotMatch: {
    name: "NAME",
    value: "undefined",
  },
};

const slotDependentResponse2: SlotDependentResponse = {
  name: "slotDependentResponse1",
  outputSpeech: "slot0",
  slotMatch: {
    name: "SLOT",
    value: ["undefined", "value", "anotherValue"],
  },
};

// Can be used for a no match test
const slotDependentResponse3: SlotDependentResponse = {
  name: "slotDependentResponse1",
  outputSpeech: "slot0",
  slotMatch: {
    name: "SLOT",
    value: ["undefined", "anotherValue"],
  },
};

const storageDependentResponse0: StorageDependentResponse = {
  name: "slotDependentResponse1",
  outputSpeech: "slot0",
  storageMatch: {
    name: "score",
    value: 0,
    operation: "==",
  },
};

describe("#determineResponse()", () => {
  let responses: Response[];
  let request: Request;
  let context: Context;

  it("returns undefined when passed undefined", () => {
    expect(determineResponse(undefined, undefined, undefined)).to.be.undefined;
  });
  it("returns undefined when passed an empty array", () => {
    expect(determineResponse([], undefined, undefined)).to.be.undefined;
  });
  describe("for SchedulableResponses", () => {
    beforeEach(() => {
      responses = [simpleResponse0, action0, action1, action2, action3, action4];
      request = new IntentRequestBuilder().withIntentId("intentId").build();
      context = new ContextBuilder().build();
    });
    describe("with a current time within a slot", () => {
      const date = new Date("2017-03-03T18:40:00-05:00");
      let clock: sinon.SinonFakeTimers;

      beforeEach(() => {
        clock = sinon.useFakeTimers(date.getTime());
      });
      afterEach(() => {
        clock.restore();
      });
      it("returns the correct output speech", () => {
        expect(determineResponse(responses, request, context).outputSpeech).to.equal("output3");
      });
    });
    describe("with a current time outside a slot by day of week", () => {
      const date = new Date("2017-03-18T19:40:00-05:00");
      let clock: sinon.SinonFakeTimers;

      beforeEach(() => {
        clock = sinon.useFakeTimers(date.getTime());
      });
      afterEach(() => {
        clock.restore();
      });
      it("returns the correct output speech", () => {
        expect(determineResponse(responses, request, context)).to.equal(simpleResponse0);
      });
    });
    describe("with a specific day of the month", () => {
      let defaultAction: SimpleResponse;
      let dayOfMonthAction: SchedulableResponse;
      let responses: Response[];

      beforeEach(() => {
        defaultAction = {
          name: "default",
          outputSpeech: "default",
        };
        dayOfMonthAction = {
          name: "day",
          outputSpeech: "day",
          schedule: {
            start: {
              time: "0:00 -0500 3",
              format: "H:mm Z D",
            },
            duration: {
              amount: 24,
              format: "hours",
            },
          },
        };

        responses = [defaultAction, dayOfMonthAction];
      });

      describe("with current time on that day", () => {
        const date = new Date("2017-03-03T19:40:00-05:00");
        let clock: sinon.SinonFakeTimers;

        beforeEach(() => {
          clock = sinon.useFakeTimers(date.getTime());
        });
        afterEach(() => {
          clock.restore();
        });
        it("picks the correct action", () => {
          expect(determineResponse(responses, request, context).outputSpeech).to.equal("day");
        });
      });

      describe("with current time not on that day", () => {
        const date = new Date("2017-03-18T19:40:00-05:00");
        let clock: sinon.SinonFakeTimers;

        beforeEach(() => {
          clock = sinon.useFakeTimers(date.getTime());
        });
        afterEach(() => {
          clock.restore();
        });
        it("picks the default", () => {
          expect(determineResponse(responses, request, context).outputSpeech).to.equal("default");
        });
      });
    });
  });
  describe("for ContextualResponses", () => {
    beforeEach(() => {
      responses = [contextualResponse1, contextualResponse0, simpleResponse0];
      request = new IntentRequestBuilder().withIntentId("intentId").build();
    });
    describe("when passed a SimpleResponse and ContextualResponse", () => {
      it("returns the valid contextual response", () => {
        const FOUR = 4;
        const MS_IN_MONTH = 30 * 24 * 60 * 60 * 1000;
        const MS_IN_YEAR = 365 * 24 * 60 * 60 * 1000;

        const now = Date.now();
        const createdTimestamp = now - FOUR * MS_IN_YEAR;
        const lastActiveTimestamp = now - FOUR * MS_IN_MONTH;

        context = new ContextBuilder().withStorage({ createdTimestamp, lastActiveTimestamp }).build();

        expect(determineResponse(responses, request, context)).to.equal(contextualResponse0);
      });
    });
  });
  describe("for SlotDependentResponse", () => {
    beforeEach(() => {
      request = new IntentRequestBuilder()
        .withIntentId("intentId")
        .withSlots({
          ["SLOT"]: {
            name: "SLOT",
            value: "value",
          },
        })
        .build();
      context = new ContextBuilder().build();
    });
    describe("when a slot matches", () => {
      it("returns the correct response", () => {
        expect(determineResponse([simpleResponse0, slotDependentResponse0], request, context)).to.equal(
          slotDependentResponse0
        );
        expect(determineResponse([simpleResponse0, slotDependentResponse1], request, context)).to.equal(
          slotDependentResponse1
        );
        expect(determineResponse([simpleResponse0, slotDependentResponse2], request, context)).to.equal(
          slotDependentResponse2
        );
      });
    });
    describe("when a slot doesn't match", () => {
      it("returns the correct response", () => {
        expect(determineResponse([simpleResponse0, slotDependentResponse3], request, context)).to.equal(
          simpleResponse0
        );
      });
    });
  });
  describe("for StorageDependentResponse", () => {
    describe("when storage matches", () => {
      beforeEach(() => {
        request = new IntentRequestBuilder().withIntentId("intentId").build();
        context = new ContextBuilder()
          .withStorage({
            createdTimestamp: 1234,
            score: 0,
          })
          .build();
      });
      it("it returns the correct response", () => {
        expect(determineResponse([simpleResponse0, storageDependentResponse0], request, context)).to.equal(
          storageDependentResponse0
        );
      });
    });
    describe("without a match", () => {
      beforeEach(() => {
        request = new IntentRequestBuilder().withIntentId("intentId").build();
        context = new ContextBuilder()
          .withStorage({
            createdTimestamp: 1234,
            score: 1,
          })
          .build();
      });
      it("it returns the correct response", () => {
        expect(determineResponse([simpleResponse0, storageDependentResponse0], request, context)).to.equal(
          simpleResponse0
        );
      });
    });
  });
  describe("for SimpleResponses", () => {
    describe("with one item", () => {
      it("returns the item", () => {
        expect(determineResponse([simpleResponse0], request, context)).to.equal(simpleResponse0);
      });
    });
    describe("with more than one item", () => {
      it("returns one of the item", () => {
        const responses = [simpleResponse0, simpleResponse1];
        const response = determineResponse(responses, request, context);
        expect(responses).to.contain(response);
      });
    });
  });
});
