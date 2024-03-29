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
    /**
     * When set, if the slot is not provided by the user the key will be used to 
     * get the response off of the content for the handler in order to ask the user
     * to provide the slot.  
     */
    slotElicitationContentKey?: string;

    /**
     * Human readable description of what kind of information
     * the slot is expecting.  The text should be very brief.  For example:
     * 
     * "zip"
     * "zip code"
     * "city"
     * "state"
     * "street"
     *
     * @type {string}
     * @memberof Slot
     */
    inputText?: string;
    /**
     * The slot will be obfuscated either fully or partially.  
     * 
     * * Full obfuscation, the slot is replaced with the slot name.  "my name is ${first_name}"
     * * Partial obfuscation will only display a subset of characters, enough to protect the full value but enough for someone that is debugging to recognize the value.
     * 
     * For some NLU, such as Amazon Lex, any setting on this value will be interpretted as obfuscated, for more information see [Amazon Lex Slot Obfuscation](https://docs.aws.amazon.com/lex/latest/dg/how-obfuscate.html)
     */
    obfuscateValue?: "FULL" | "PARTIAL";

}
