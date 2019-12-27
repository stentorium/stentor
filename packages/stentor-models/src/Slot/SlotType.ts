/*! Copyright (c) 2019, XAPPmedia */
/**
 * Map of slots by types.
 *
 * @export
 * @interface SlotTypeMap
 * @template T
 */
export interface SlotTypeMap<T = string | number | object | boolean> {
    [slotTypeName: string]: SlotType<T>;
}

/**
 * The values for the slot type.
 *
 * @deprecated Use Entity instead
 * @export
 * @interface SlotType
 * @template T
 */
export interface SlotType<T = string | number | object | boolean> {
    /**
     * The name of the slot type.
     *
     * This is also the key used in the SlotTypeMap.
     *
     * @type {string}
     * @memberOf SlotType
     */
    name: string;
    /**
     * Optional ID for the slot type
     *
     * @type {string}
     * @memberOf SlotType
     */
    id?: string;
    /**
     * The values for the slot type.
     *
     * @type {SlotValue[]}
     * @memberOf SlotType
     */
    values?: SlotTypeValue<T>[];
    /**
     * Optional ID if the slot type has a representation in Dialogflow.
     *
     * @type {string}
     * @memberof SlotType
     */
    dialogflowId?: string;
}

/**
 * A single utterance within the slot type and associated data for when that utterance is spoken.
 *
 * @export
 * @interface SlotTypeValue
 * @template T
 */
export interface SlotTypeValue<T = string | number | object | boolean> {
    /**
     * The name of the slot, what is spoken by the user.
     *
     * @type {string}
     * @memberOf SlotTypeValue
     */
    name: string;
    /**
     * List of potential synonyms for the slot.
     *
     * @type {string[]}
     * @memberof SlotTypeValue
     */
    synonyms?: string[];
    /**
     * The data associated with the slot value, used when the slot value is selected.
     *
     * @type {(string | number | object)}
     * @memberOf SlotTypeValue
     */
    data?: T;
}
