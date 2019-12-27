/*! Copyright (c) 2019, XAPPmedia */
import { LastActive, Schedulable } from "../DateTime";
import { RequestDependable } from "../Request";
import { SlotDependable } from "../Slot";
import { StorageDependable } from "../Storage";
import { ResponseOutput } from "./ResponseOutput";
/**
 * Simple segment, just the segment that will replace the template.
 *
 * @export
 * @interface SimpleSegment
 */
export interface SimpleSegment {
    /**
     * The segment replaces the template in the templated string.
     *
     * In the string "${GREETING}, how are you?", the segment will
     * replace ${GREETING}.
     *
     * @type {string | ResponseOutput}
     * @memberof SimpleSegment
     */
    segment: string | ResponseOutput;
}
/**
 * A segment that can be scheduled.
 */
export declare type ScheduledSegment = Schedulable<SimpleSegment>;
/**
 * A segment that is contextual, it knows about your past interactions.
 */
export declare type LastActiveSegment = LastActive<SimpleSegment>;
/**
 * A segment that is dependent on a slot value in the current request.
 */
export declare type SlotDependentSegment = SlotDependable<SimpleSegment>;
/**
 * A segment that is dependent on a value on user storage.
 */
export declare type StorageDependentSegment = StorageDependable<SimpleSegment>;
/**
 * A segment that is dependent on a value on the request.
 */
export declare type RequestDependentSegment = RequestDependable<SimpleSegment>;
export declare type ResponseSegment = SimpleSegment | ScheduledSegment | LastActiveSegment | SlotDependentSegment | RequestDependentSegment | StorageDependentSegment;
/**
 * Map of response segments where the key is name within the template.
 *
 * For example a string with ${ GREETING }, GREETING is the key for the
 * array of segments.
 *
 * @export
 * @interface ResponseSegmentsMap
 */
export interface ResponseSegmentsMap {
    [key: string]: ResponseSegment[];
}
