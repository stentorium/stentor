/*! Copyright (c) 2019, XAPPmedia */
export type MatchOperation = "==" | "===" | ">" | ">=" | "<" | "=<" | "!=" | "!==" | "includes" | "!includes";

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
 */
export interface Match {
    /**
     * The name of the key on the object that the value is going to
     * be compared against.
     *
     * TODO: Could we call this key instead?
     */
    name: string;
    /**
     * The test value that is compared.
     */
    value: boolean | string | number | (boolean | string | number)[];
    /**
     * The comparison operator.
     *
     * If not provided, it defaults to "==="
     */
    operation?: MatchOperation;
}
