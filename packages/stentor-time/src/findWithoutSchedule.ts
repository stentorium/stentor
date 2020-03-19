/*! Copyright (c) 2019, XAPPmedia */
import { Scheduled } from "stentor-models";
import { random } from "stentor-utils";
import { isScheduled } from "stentor-guards";

/**
 * Within a list of objects, some potentially Scheduled, return a random object
 * that does not have a schedule.
 *
 * @export
 * @template T
 * @param {((T | Scheduled<T>)[] | undefined)} items
 * @returns {(T | undefined)}
 */
export function findWithoutSchedule<T extends object>(items: (T | Scheduled<T>)[] | undefined): T | undefined {
    if (!Array.isArray(items)) {
        return undefined;
    }

    const noSchedule: T[] = [];

    items.forEach(item => {
        if (!isScheduled(item)) {
            noSchedule.push(item);
        }
    });

    return random(noSchedule);
}
