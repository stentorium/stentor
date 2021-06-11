/*! Copyright (c) 2020, XAPPmedia */

import { Contexts } from "./Contextual";

/**
 * A conditional check is used to test an object to see if the check applies and also can perform the check.
 * 
 * The functions are used to check the condition with evaluating a string conditional.  
 */
export interface ConditionalCheck<T = any> {
    /**
     * A test for an object, that if returns true, can then be passed
     * to the check function.  
     */
    test: (obj: T | object) => obj is T;
    /**
     * Check that is performed on the object to determine if it passes
     * or fails the criteria.
     * 
     * The first argument is the object while the subsequent parameters
     * are any additional optional information that is required to make
     * the determination.
     */
    check: (obj: T, ...args: any) => boolean;
    /**
     * A set of functions that help determination within a string.
     * 
     * For example, for a time based conditional check, you can provide a function:
     * 
     * shedule(startTime: string, duration: number, timezone: string): boolean
     * 
     * which turns true if the current time is within the provided parameters.
     */
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
     * If only one is provided, it must pass for the conditions to be met. 
     */
    should?: (Contexts | object)[];
}

/**
 * An object can implement Conditioned if it has a set of conditions.
 * 
 * @beta
 */
export interface Conditioned {
    /**
     * Conditions to be met.
     * 
     * Can either be a Conditions object or a string such as "foo('bar') || false"
     */
    conditions: Conditions | string;
}

/**
 * An object that is Conditional implements Conditioned.
 */
export type Conditional<T> = T & Conditioned;