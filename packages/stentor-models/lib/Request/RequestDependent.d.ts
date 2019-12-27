/*! Copyright (c) 2019, XAPPmedia */
import { Match } from "../Match";
export interface RequestDependent {
    /**
     * The match will be compared to keys on the request.
     *
     * If evaluated true, the object is valid.
     *
     * @type {Match}
     * @memberof RequestDependent
     */
    requestMatch: Match;
}
export declare type RequestDependable<T> = T & RequestDependent;
