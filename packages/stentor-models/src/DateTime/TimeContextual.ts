/*! Copyright (c) 2019, XAPPmedia */
import { LastActive } from "./LastActive";
import { Scheduled } from "./Schedulable";

export type TimeContextual<T> = Scheduled<T> | LastActive<T>;
