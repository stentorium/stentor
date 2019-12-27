/*! Copyright (c) 2019, XAPPmedia */
import { LastActive } from "./LastActive";
import { Schedulable } from "./Schedulable";
export declare type TimeContextual<T> = Schedulable<T> | LastActive<T>;
