/*! Copyright (c) 2019, XAPPmedia */
import { Actionable } from "../Action";
import { JSONDependable } from "../JSONDependent";
import { RequestDependable, RequestSlotMap, SystemDependable } from "../Request";
import { SlotDependable } from "../Slot";
import { StorageDependable } from "../Storage";

export type PathType = "START";
/**
 * An executable path defines exactly where an incoming request will be routed to.
 */
export interface ExecutablePath extends SharedPath {
    /**
     * Type of path.
     *
     * Setting type to START changes the request so that
     * handler.start() is called.
     *
     * Not setting the type passes the request straight
     * through, requiring the new handler to handle the
     * request as is.
     */
    type?: PathType;
    /**
     * The ID of the handler to forward or redirect the request to
     */
    intentId: string;
    /**
     * Optional, if redirecting or forwarding to a handler that is expecting slots,
     * set these to pre-populate them on the request.
     */
    slots?: RequestSlotMap;
}
/**
 * When compiled, it will move the user back to a previous handler
 * they already visited.
 *
 * It always calls the start() method of the historical handler.
 */
export interface HistoricalPath extends SharedPath {
    /**
     * The number of handlers to go back into the history of.
     *
     * This is typically just one and can be no more than 10.
     */
    historicalIndex: number;
}

/**
 * The previous handler path will look at the previousHandler on the storage
 * for a potential match and leverage it when applicable.
 */
export interface PreviousHandlerPath extends SharedPath {
    /**
     * Set to true to request the previous handler paths.
     */
    previousHandler: boolean;
}

/**
 * Shared parameters on a path.
 */
export interface SharedPath extends Partial<Actionable> {
    // maybe data this is injected to the handler?
    data?: object;
    /**
     * Optional platform filter for the path.
     *
     * If set, the path will only apply to the specified platform.
     */
    platform?: string;
}
/**
 * Compilable paths
 */
export type CompilablePath = HistoricalPath | PreviousHandlerPath;
/**
 * Path used if a particular key-value pair on the
 * user's storage matches.
 */
export type JSONDependentPath = JSONDependable<ExecutablePath | CompilablePath>;
/**
 * Path used if a particular key-value pair on the
 * user's storage matches.
 */
export type StorageDependentPath = StorageDependable<ExecutablePath | CompilablePath>;
/**
 * Path used if a slot on the incoming intent matches
 * the compare value.
 */
export type SlotDependentPath = SlotDependable<ExecutablePath | CompilablePath>;
/**
 * Path that is dependent on a system request.
 */
export type RequestDependentPath = RequestDependable<ExecutablePath | CompilablePath>;
/**
 * Path that is dependent on a system request.
 */
export type SystemDependentPath = SystemDependable<ExecutablePath | CompilablePath>;

/**
 * A path determines where to redirect or forward an incoming request.  They can either
 * be predetermined (ExecutablePath) or determined at runtime (CompilablePath).  Additionally,
 * they can have rules associated with them to only apply them at certain situations.
 */
export type Path =
    | ExecutablePath
    | CompilablePath
    | RequestDependentPath
    | SlotDependentPath
    | StorageDependentPath
    | JSONDependentPath
    | SystemDependentPath;
