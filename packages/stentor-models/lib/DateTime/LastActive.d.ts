/*! Copyright (c) 2019, XAPPmedia */
import { Duration } from "./Duration";
export interface ActiveWithinable {
    activeWithin: Duration;
}
export declare type ActiveWithin<T> = T & ActiveWithinable;
export interface HaveNotSeenWithinable {
    haveNotSeenWithin: Duration;
}
export declare type HaveNotSeenWithin<T> = T & HaveNotSeenWithinable;
export interface FirstTimeable {
    firstTime: boolean;
}
export declare type FirstTime<T> = T & FirstTimeable;
export declare type LastActive<T> = FirstTime<T> | HaveNotSeenWithin<T> | ActiveWithin<T>;
