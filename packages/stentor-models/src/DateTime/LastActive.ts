/*! Copyright (c) 2019, XAPPmedia */
import { Duration } from "./Duration";

export interface ActiveWithinable {
    activeWithin: Duration;
}
export type ActiveWithin<T> = T & ActiveWithinable;

export interface HaveNotSeenWithinable {
    haveNotSeenWithin: Duration;
}
export type HaveNotSeenWithin<T> = T & HaveNotSeenWithinable;

export interface FirstTimeable {
    firstTime: boolean;
}
export type FirstTime<T> = T & FirstTimeable;
/*
 * Set of interfaces that can use a last active timestamp to
 * figure out which is the most relevant.
 */
export type LastActive<T> = FirstTime<T> | HaveNotSeenWithin<T> | ActiveWithin<T>;
