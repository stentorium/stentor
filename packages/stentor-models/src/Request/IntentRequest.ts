/*! Copyright (c) 2019, XAPPmedia */
import { DateTime, DateTimeRange } from "../DateTime";
import { Data } from "../Handler";
import { BaseRequest } from "./Request";
import { IntentRequestType } from "./Types";

export type RequestSlotValues = string | number | DateTimeRange | DateTime | (string)[];

export interface KnowledgeAnswer {
    /**
     * Which knowledge base (optional)
     */
    source?: string;
    /**
     * Raw question
     */
    faqQuestion: string;
    /**
     * Raw answer
     */
    answer: string;
    /**
     * Confidence 0-1
     */
    matchConfidence: number;
}

/**
 * Information for a slot coming in on the request.
 */
export interface RequestSlot<T = RequestSlotValues> {
    /**
     * The name of the slot, also used as the key in the RequestSlotMap.
     *
     * For example, "FIRST_TEAM" or "Podcast", this is typically user defined.
     */
    name: string;
    /**
     * The slot normalized value.
     *
     * When leveraging synonyms, this will be the canonical value.  If not then it is
     * the same as the rawValue.
     *
     * For example, "University of Virginia" or "Red Wine".
     */
    value?: T;
    /**
     * The original value provided by the NLU before normalization.
     */
    original?: any;
    /**
     * The raw spoken value.
     *
     * For example, "cavaliers" or "red"
     */
    rawValue?: string;
    /**
     * ID of the slot, if applicable.
     *
     * For example, "UVA"
     */
    id?: string;
    /**
     * If the entity resolution was successful or not.
     *
     * @see https://developer.amazon.com/docs/custom-skills/define-synonyms-and-ids-for-slot-type-values-entity-resolution.html#er-built-in-types
     */
    successfulMatch?: boolean;
}

export interface RequestSlotMap {
    [slotName: string]: RequestSlot;
}

/**
 * Request for a particular intent.
 *
 * For Alexa @see https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/handling-requests-sent-by-alexa#intentrequest
 */
export interface IntentRequest extends BaseRequest {
    type: IntentRequestType;
    intentId: string;
    sessionId: string;
    slots?: RequestSlotMap;
    isBargeIn?: boolean;
    canFulfill?: boolean;
    data?: Data;
    knowledgeAnswer?: KnowledgeAnswer;
}
