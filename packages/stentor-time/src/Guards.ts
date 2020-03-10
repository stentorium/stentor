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

/**
 * Determines if the item has a schedule.
 */
export function isScheduled<T>(item: object): item is Scheduled<T> {
    return !!item && (item as Schedulable).schedule !== undefined;
}

export function isActiveWithin<T>(item: object): item is ActiveWithin<T> {
    return !!item && (item as ActiveWithinable).activeWithin !== undefined;
}

export function isFirstTime<T>(item: object): item is FirstTime<T> {
    return !!item && (item as FirstTimeable).firstTime !== undefined;
}

export function isHaveNotSeenWithin<T>(item: object): item is HaveNotSeenWithin<T> {
    return !!item && (item as HaveNotSeenWithinable).haveNotSeenWithin !== undefined;
}

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

