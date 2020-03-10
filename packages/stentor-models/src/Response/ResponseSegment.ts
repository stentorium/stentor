/*! Copyright (c) 2019, XAPPmedia */
import { Conditioned } from "../Conditional";
import { LastActive, Scheduled } from "../DateTime";
import { RequestDependable } from "../Request";
import { SlotDependable } from "../Slot";
import { StorageDependable } from "../Storage";
import { ResponseOutput } from "./ResponseOutput";

/**
 * Simple segment, just the segment that will replace the template.
 */
export interface SimpleSegment extends Partial<Conditioned> {
    /**
     * The segment replaces the template in the templated string.
     *
     * In the string "$\{GREETING\}, how are you?", the segment will
     * replace $\{GREETING\}.
     */
    segment: string | ResponseOutput;
}

/**
 * A segment that can be scheduled.
 */
export type ScheduledSegment = Scheduled<SimpleSegment>;
/**
 * A segment that is contextual, it knows about your past interactions.
 */
export type LastActiveSegment = LastActive<SimpleSegment>;
/**
 * A segment that is dependent on a slot value in the current request.
 */
export type SlotDependentSegment = SlotDependable<SimpleSegment>;
/**
 * A segment that is dependent on a value on user storage.
 */
export type StorageDependentSegment = StorageDependable<SimpleSegment>;
/**
 * A segment that is dependent on a value on the request.
 */
export type RequestDependentSegment = RequestDependable<SimpleSegment>;
/*
 * A response segment is used to build a templated response.
 *
 * They can be used to add variance to a response, such as a greeting, but also
 * keeping other parts of the response the same.
 *
 * The segment can scheduled, time contextual, or storage contextual.
 *
 */
export type ResponseSegment =
    | SimpleSegment
    | ScheduledSegment
    | LastActiveSegment
    | SlotDependentSegment
    | RequestDependentSegment
    | StorageDependentSegment;
/**
 * Map of response segments where the key is name within the template.
 *
 * For example a string with $\{ GREETING \}, GREETING is the key for the
 * array of segments.
 */
export interface ResponseSegmentsMap {
    [key: string]: ResponseSegment[];
}
