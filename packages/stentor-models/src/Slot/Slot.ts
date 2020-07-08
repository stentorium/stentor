/*! Copyright (c) 2019, XAPPmedia */
/**
 * Slots available to the intent.
 * 
 * @public
 */
export interface Slot {
    /**
     * The name of the slot, corresponds to how it is displayed in the
     * sample utterance.
     *
     * For example: "Play \{Podcast\}" where Podcast is the name.
     */
    name: string;
    /**
     * The type of entity for the slot.
     *
     * This corresponds to an Entity, specifically the entityId key.
     *
     * For legacy applications, SlotType is used.
     */
    type?: string;
    /**
     * NLU specific metadata used when translating to the NLU entity.
     * 
     * Use to override the type for a specific NLU. 
     */
    nlu?: { [nlu: string]: { type: string } };
    /**
     * Is the slot a list of values.
     * 
     * @remarks
     * Supported natively by Dialogflow and shims for Alexa.
     *
     * Can be a boolean or number.  When a number is used, it provides guidance to the Alexa shim on the max amount of expected
     * items in the list.  Minimum value is 2.  Value defaults to 6 when set to true.
     *
     * Only one isList slot is supported per utterance pattern.
     */
    isList?: boolean | number;
}
