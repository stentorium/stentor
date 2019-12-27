/*! Copyright (c) 2019, XAPPmedia */
/**
 * Logic meant to be run in the LogicEvaluator.
 *
 * @export
 * @interface Logic
 */
export interface Logic {
    /**
     * Version of the LogicEvaluator the compiled code will be
     * executed within.
     *
     * @type {number}
     * @memberof Logic
     */
    version?: number;
    /**
     * The compiled JavaScript
     *
     * @type {string}
     * @memberof Logic
     */
    compiled: string;
    /**
     * Currently not supported but in the future we might want to store
     * the raw TypeScript source which is easier to read and write than
     * the compiled JavaScript.
     *
     * @type {string}
     * @memberof Logic
     */
    // typescript?: string;
}
