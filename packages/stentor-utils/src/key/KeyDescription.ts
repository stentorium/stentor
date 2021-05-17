/*! Copyright (c) 2019, XAPPmedia */
/**
 * A description of a key for either Content, Forwards, or Redirects
 */
export interface KeyDescription {
    /**
     * The key cannot be described with the current methods of description.
     */
    indescribable?: boolean;
    /**
     * If true, the key will match for every string
     */
    catchAll?: boolean;
    /**
     * If intentId exists, it is the only string that will match the key
     */
    intentId?: string;
    /**
     * If it exists, it is an array of possible strings that will match
     * for the key.
     */
    includedIntentIds?: string[];
    /**
     * If it exists, it is an array of possible strings
     * that will be omitted in the case of a catch all key.
     *
     * Note, this must be used in conjunction with catchAll = true.
     */
    excludedIntentIds?: string[];
}
