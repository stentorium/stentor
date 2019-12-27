/*! Copyright (c) 2019, XAPPmedia */
export declare type MatchOperation = "==" | "===" | ">" | ">=" | "<" | "=<" | "!=" | "!==" | "includes" | "!includes";
/**
 * Match is an interface that describes
 * how to compare two different values.
 *
 * For example:
 *
 * value of name is 1
 * operation is >=
 * value 4
 *
 * 1 >= 4 is false
 *
 * @export
 * @interface Match
 */
export interface Match {
    /**
     * The name of the key on the object that the value is going to
     * be compared against.
     *
     * @type {string}
     * @memberof Match
     */
    key: string;
    /**
     * The test value that is compared.
     *
     * @type {(string | number)}
     * @memberof Match
     */
    value: boolean | string | number | (boolean | string | number)[];
    /**
     * The comparison operator.
     *
     * If not provided, it defaults to "==="
     *
     * @type {MatchOperation}
     * @memberof Match
     */
    operation?: MatchOperation;
}
