/*! Copyright (c) 2019, XAPPmedia */
import { LastActive, Schedulable } from "./DateTime";
import { JSONDependent } from "./JSONDependent";
import { RequestDependent, SystemDependent } from "./Request";
import { SlotDependent } from "./Slot";
import { StorageDependent } from "./Storage";

export type Contexts =
    | JSONDependent
    | LastActive<object>
    | RequestDependent
    | Schedulable
    | SlotDependent
    | StorageDependent
    | SystemDependent;

/**
 * Currently not in use, for discussion.
 *
 * The idea is this would allow us to add an array of contexts and we can `or` or `and` the contexts.
 * `or` would require one of them to match and `and` would require all to match.
 *
 * TODO: Remove if never used
 */
export interface Contextual {
    context?: {
        and?: Contexts[];
        // For future considerations...
        // or?: [];
        // not?: [];
    };
}
