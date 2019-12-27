/*! Copyright (c) 2019, XAPPmedia */
import { Schedule } from "./Schedule";
/**
 * Used to extend existing interfaces and making them
 * schedulable.
 *
 * @export
 * @interface Scheduled
 */
export interface Scheduled {
    readonly schedule: Schedule;
}
export declare type Schedulable<T> = T & Scheduled;
