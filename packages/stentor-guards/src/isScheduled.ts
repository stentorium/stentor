
/*! Copyright (c) 2019, XAPPmedia */
import {
    Schedulable,
    Scheduled
} from "stentor-models";

/**
 * Determines if the item has a schedule.
 */
export function isScheduled<T>(item: object): item is Scheduled<T> {
    return !!item && (item as Schedulable).schedule !== undefined;
}
