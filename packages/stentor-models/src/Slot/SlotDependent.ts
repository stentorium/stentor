/*! Copyright (c) 2019, XAPPmedia */
import { Match } from "../Match";

export interface SlotDependent {
    /**
     * The match that will be compared to the slots
     *
     * If evaluated true, the object is valid.
     *
     * @type {Match}
     * @memberof SlotDependentPath
     */
    slotMatch: Match;
}

export type SlotDependable<T> = T & SlotDependent;
