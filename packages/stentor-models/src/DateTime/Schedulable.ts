/*! Copyright (c) 2019, XAPPmedia */
import { Schedule } from "./Schedule";

/**
 * Used to extend existing interfaces and making them
 * schedulable.
 *
 * TODO: Switch the names of these, Schedulable should be Scheduled.
 */
export interface Schedulable {
    readonly schedule: Schedule;
}

/*
 * Type alias to make anything Schedulable.
 */
export type Scheduled<T> = T & Schedulable;
