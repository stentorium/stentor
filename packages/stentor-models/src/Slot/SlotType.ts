/*! Copyright (c) 2019, XAPPmedia */
/**
 * Map of slots by types.
 */
export interface SlotTypeMap<T = string | number | object | boolean> {
    [slotTypeName: string]: SlotType<T>;
}

/**
 * The values for the slot type.
 *
 * @deprecated Use Entity instead
 */
export interface SlotType<T = string | number | object | boolean> {
    /**
     * The name of the slot type.
     *
     * This is also the key used in the SlotTypeMap.
     */
    name: string;
    /**
     * Optional ID for the slot type
     */
    id?: string;
    /**
     * The values for the slot type.
     */
    values?: SlotTypeValue<T>[];
    /**
     * Optional ID if the slot type has a representation in Dialogflow.
     */
    dialogflowId?: string;
}

/**
 * A single utterance within the slot type and associated data for when that utterance is spoken.
 */
export interface SlotTypeValue<T = string | number | object | boolean> {
    /**
     * The name of the slot, what is spoken by the user.
     */
    name: string;
    /**
     * List of potential synonyms for the slot.
     */
    synonyms?: string[];
    /**
     * The data associated with the slot value, used when the slot value is selected.
     */
    data?: T;
}
