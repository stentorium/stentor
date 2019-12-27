/*! Copyright (c) 2019, XAPPmedia */
/**
 * Slots available to the intent.
 *
 * @export
 * @interface Slot
 */
export interface Slot {
    /**
     * The name of the slot, corresponds to how it is displayed in the
     * sample utterance.
     *
     * For example: "Play ${podcast}" where podcast is the name.
     *
     * @type {string}
     * @memberOf Slot
     */
    name: string;
    /**
     * The type of entity for the slot.
     *
     * This corresponds to an Entity, specifically the entityId key.
     *
     * @type {string}
     * @memberOf Slot
     */
    type: string;
    /**
     * Is the slot a list of values.
     * Supported natively by Dialogflow and shims for Alexa.
     *
     * Can be a boolean or number.  When a number is used, it provides guidance to the Alexa shim on the max amount of expected
     * items in the list.  Minimum value is 2.  Value defaults to 6 when set to true.
     *
     * NOTE: Only one isList slot is supported per utterance pattern.
     *
     * @type {boolean}
     * @memberof Slot
     */
    isList?: boolean | number;
}
