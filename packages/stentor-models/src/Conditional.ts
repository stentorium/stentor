/*! Copyright (c) 2020, XAPPmedia */

import { Contexts } from "./Contextual";

/**
 * A conditional check is used to test an object to see if the check applies and also can perform the check.
 * 
 * The functions are used to check the condition with evaluating a string conditional.  
 */
export interface ConditionalCheck<T = any> {
    test: (obj: T | object) => boolean;
    check: (obj: T | object) => boolean;
    functions: ((...args: any) => boolean)[];
}

/**
 * Definition of conditions.
 * 
 * @beta
 * @remarks
 * A couple of notes on the behavior:
 *   * If passed musts and shoulds, they are ANDed (or &&) together.  All musts must pass and at least one should needs to pass.
 *   * If only one shoulds is provided, it must return true for the conditions to be met.
 *   * If multiple shoulds are passed 
 */
export interface Conditions {
    /**
     * All objects within must return true in order for the conditions to be met.
     * 
     * It might be helpful to think of these as ANDs (or &&)
     */
    must?: (Contexts | object)[];
    /**
     * Only one of the objects within the array must pass for the conditions to be met. 
     * 
     * If only one is provided, it must pass for the condtions to be met. 
     */
    should?: (Contexts | object)[];
}

/**
 * An object can implement Conditional if it has a set of conditions.
 * 
 * @beta
 */
export interface Conditional {
    /**
     * Conditions to be met.
     * 
     * Can either be a Conditions object or a string such as "foo('bar') || false"
     */
    conditions: Conditions | string;
}