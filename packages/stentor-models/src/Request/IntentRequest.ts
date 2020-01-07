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
     * See {@link https://developer.amazon.com/docs/custom-skills/define-synonyms-and-ids-for-slot-type-values-entity-resolution.html#er-built-in-types}
     */
    successfulMatch?: boolean;
}

/**
 * Map of slots where the key is the name of the slot.
 */
export interface RequestSlotMap {
    /**
     * Each key is the slot name and the corresponding value is the slot.
     */
    [slotName: string]: RequestSlot;
}

/**
 * Request for a particular intent.
 *
 * For Alexa see {@link https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/handling-requests-sent-by-alexa#intentrequest}
 */
export interface IntentRequest extends BaseRequest {
    /**
     * The type of an intent request is always "INTENT_REQUEST"
     */
    type: IntentRequestType;
    /**
     * The ID of the matched intent.
     */
    intentId: string;
    /**
     * The ID of the user's current session.
     * 
     * A session is typically defined by the channel is on but it is typically a set
     * of requests and responses that are linked together. 
     */
    sessionId: string;
    /**
     * Slots for the intent.
     */
    slots?: RequestSlotMap;
    /**
     * Confidence level of the intent match.  On a scale from 0-1 where 1 is the highest confidence of a match.
     */
    matchConfidence?: number;
    isBargeIn?: boolean;
    /**
     * A meta, preliminary request that is more for understanding if the assistant can provide an answer or not.
     */
    canFulfill?: boolean;
    /**
     * Optional data that can be added to the request
     */
    data?: Data;
    /**
     * A unique request provided by a question answering system.  
     */
    knowledgeAnswer?: KnowledgeAnswer;
}
