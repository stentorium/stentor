/*! Copyright (c) 2019, XAPPmedia */
import { Duration } from "./Duration";

/**
 * A date to expire by.
 *
 * @export
 * @interface ExpirationDate
 */
export interface ExpirationDate {
    date?: number;
}

/**
 * A duration to expire in.
 *
 * @export
 * @interface ExpirationDuration
 */
export interface ExpirationDuration {
    duration?: Duration;
}

export type Expiration = ExpirationDate | ExpirationDuration;
