/*! Copyright (c) 2019, XAPPmedia */
import { Duration } from "./Duration";

export interface ScheduleStart {
    readonly time: string;
    readonly format?: string;
    readonly dayOfWeek?: string;
    readonly timeZone?: string;
}

export interface Schedule {
    readonly start: ScheduleStart;
    readonly duration: Duration;
}
