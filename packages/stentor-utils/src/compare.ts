/*! Copyright (c) 2019, XAPPmedia */
import { MatchOperation } from "stentor-models";

export type Comparable = boolean | string | number | undefined;

/**
 * Compare the first value to the second using the provided operator.
 *
 * If no operator is provided it defaults to "==="
 *
 * @param {(string | number)} value1
 * @param {(string | number)} value2
 * @param {SlotMatchOperation} [operator="==="]
 * @returns {boolean}
 */
export function compare(value1: Comparable, value2: Comparable, operator: MatchOperation = "==="): boolean {
    let match = false;

    // See if value is undefined
    if (value1 === "undefined") {
        value1 = undefined;
    }

    if (value2 === "undefined") {
        value2 = undefined;
    }

    switch (operator) {
        case "==":
            /* tslint:disable:triple-equals */
            match = value1 == value2;
            /* tslint:enable:triple-equals */
            break;
        case "===":
            match = value1 === value2;
            break;
        case "!=":
            /* tslint:disable:triple-equals */
            match = value1 != value2;
            /* tslint:enable:triple-equals */
            break;
        case "!==":
            match = value1 !== value2;
            break;
        case "<":
            match = value1 < value2;
            break;
        case "=<":
            match = value1 <= value2;
            break;
        case ">":
            match = value1 > value2;
            break;
        case ">=":
            match = value1 >= value2;
            break;
        case "includes":
            match = value1.toString().includes(value2.toString());
            break;
        case "!includes":
            match = !value1.toString().includes(value2.toString());
            break;
        default:
            console.error(`Unrecognizable operation ${operator}`);
    }

    return match;
}

/**
 * Is the value comparable with the compare function.
 *
 * @param {*} potential
 * @returns {potential is Comparable}
 */
export function isComparable(potential: any): potential is Comparable {
    if (typeof potential === "string") {
        return true;
    }

    if (typeof potential === "boolean") {
        return true;
    }

    if (typeof potential === "number") {
        return true;
    }

    if (typeof potential === "undefined") {
        return true;
    }

    return false;
}
