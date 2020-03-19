/*! Copyright (c) 2019, XAPPmedia */
import { TimeContextual } from "stentor-models";
import { isLastActive } from "./isLastActive";
import { isScheduled } from "./isScheduled";
/**
 * Guard to determine if the object is time contextual; Scheduled, ActiveWithin, FirstTime,
 * LastActive, or HaveNotSeenWithin.
 * 
 * @param item 
 */
export function isTimeContextual<T>(item: object): item is TimeContextual<T> {
    return isLastActive(item) || isScheduled(item);
}

