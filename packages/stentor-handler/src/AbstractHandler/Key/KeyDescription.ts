/*! Copyright (c) 2019, XAPPmedia */
/**
 * A description of a key for either Content, Forwards, or Redirects
 *
 * @export
 * @interface KeyDescription
 */
export interface KeyDescription {
    /**
     * The key cannot be described with the current methods of description.
     *
     * @type {boolean}
     * @memberof KeyDescription
     */
    indescribable?: boolean;
    /**
     * If true, the key will match for every string
     *
     * @type {boolean}
     * @memberof KeyDescription
     */
    catchAll?: boolean;
    /**
     * If intentId exists, it is the only string that will match the key
     *
     * @type {string}
     * @memberof KeyDescription
     */
    intentId?: string;
    /**
     * If it exists, it is an array of possible strings that will match
     * for the key.
     *
     * @type {string[]}
     * @memberof KeyDescription
     */
    includedIntentIds?: string[];
    /**
     * If it exists, it is an array of possible strings
     * that will be omitted in the case of a catch all key.
     *
     * Note, this must be used in conjunction with catchAll = true.
     *
     * @type {string[]}
     * @memberof KeyDescription
     */
    excludedIntentIds?: string[];
}
