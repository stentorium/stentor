/*! Copyright (c) 2019, XAPPmedia */
import { Match } from "./Match";

/**
 * Path based on evaluating a JSON path to determine the value
 * that will be matched.
 *
 * For example:
 * name: $.request.slots.slot2.value will evaluate the slot with name slot2
 * name: $.context.storage.key1 will evaluate key1 on the user's storage
 */
export interface JSONDependent {
    /**
     * Match data for the JSON path.
     *
     * 'name' on Match is the JSON path
     */
    JSONPathMatch: Match;
}

export type JSONDependable<T> = T & JSONDependent;
