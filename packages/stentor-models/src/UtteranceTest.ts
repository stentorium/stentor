/*! Copyright (c) 2020, XAPPmedia */
import { RelativeDateTime } from "./DateTime"
import { RequestSlot, RequestSlotValues } from "./Request";
import { ActiveContext } from "./Response";

/**
 * Extends a RequestSlot by adding the RelativeDateTime as a possible value.
 */
export interface TestSlot<T = RequestSlotValues | RelativeDateTime> extends Omit<RequestSlot, "value"> {
    value: T;
}

/**
 * An expected result from the NLU to determine if the test passed or failed.
 */
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
    /**
     * The utterance to be tested
     */
    utterance: string;
    /**
     * Optional active context required for the utterance to trigger the expected inent.
     */
    activeContext?: ActiveContext[];
    /**
     * The expected result once the utterance is passed in the NLU
     */
    expected?: ExpectedResult;
}