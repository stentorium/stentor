/*! Copyright (c) 2019, XAPPmedia */
import { DateTime, DateTimeRange } from "../DateTime";
import { Data } from "../Handler";
import { BaseRequest } from "./Request";
import { IntentRequestType } from "./Types";
export declare type RequestSlotValues = string | number | DateTimeRange | DateTime | (string)[];
/**
 * Information for a slot coming in on the request.
 *
 *
 * @export
 * @interface RequestSlot
 * @template T
 */
export interface RequestSlot<T = RequestSlotValues> {
    /**
     * The name of the slot, also used as the key in the RequestSlotMap.
     *
     * For example, "FIRST_TEAM" or "Podcast", this is typically user defined.
     *
     * @type {string}
     * @memberof RequestSlot
     */
    name: string;
    /**
     * The slot normalized value.
     *
     * When leveraging synonyms, this will be the canonical value.  If not then it is
     * the same as the rawValue.
     *
     * For example, "University of Virginia" or "Red Wine".
     * @type {T}
     * @memberof RequestSlot
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
     *
     * @type {string}
     * @memberof RequestSlot
     */
    rawValue?: string;
    /**
     * ID of the slot, if applicable.
     *
     * For example, "UVA"
     *
     * @type {string}
     * @memberof RequestSlot
     */
    id?: string;
    /**
     * If the entity resolution was successful or not.
     *
     * @see https://developer.amazon.com/docs/custom-skills/define-synonyms-and-ids-for-slot-type-values-entity-resolution.html#er-built-in-types
     *
     * @type {boolean}
     * @memberof RequestSlot
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
 *
 * @export
 * @interface IntentRequest
 * @extends {BaseRequest}
 */
export interface IntentRequest extends BaseRequest {
    type: IntentRequestType;
    intentId: string;
    sessionId: string;
    slots?: RequestSlotMap;
    isBargeIn?: boolean;
    canFulfill?: boolean;
    data?: Data;
}
