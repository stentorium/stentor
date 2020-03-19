/*! Copyright (c) 2019, XAPPmedia */
import {
    ActiveWithin,
    ActiveWithinable,
    FirstTime,
    FirstTimeable,
    HaveNotSeenWithin,
    HaveNotSeenWithinable,
    LastActive,
    Schedulable,
    Scheduled,
    TimeContextual
} from "stentor-models";

export function isLastActive<T>(item: object): item is LastActive<T> {
    return isActiveWithin(item) || isFirstTime(item) || isHaveNotSeenWithin(item);
}

/**
 * Guard to determine if the object is time contextual; Scheduled, ActiveWithin, FirstTime,
 * LastActive, or HaveNotSeenWithin.
 * 
 * @param item 
 */
export function isTimeContextual<T>(item: object): item is TimeContextual<T> {
    return isLastActive(item) || isScheduled(item);
}

