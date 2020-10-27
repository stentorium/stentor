/*! Copyright (c) 2020, XAPPmedia */
import { RelativeDateTime, RequestSlot, RequestSlotValues } from "stentor-models";

/**
 * Extends a RequestSlot by adding the RelativeDateTime as a possible value.
 */
export interface TestSlot<T = RequestSlotValues | RelativeDateTime> extends Omit<RequestSlot, "value"> {
    value: T;
}

export interface ExpectedResult {
    /**
     * Expected intent ID.
     */
    intentId: string;
    /**
     * Expected slots.
     */
    matchedSlots?: TestSlot[];
}

/**
 * An utterance test consists of the utterance under test and the expected result.
 */
export interface UtteranceTest {
    utterance: string;
    expected?: ExpectedResult;
}