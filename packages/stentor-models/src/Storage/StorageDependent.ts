/*! Copyright (c) 2019, XAPPmedia */
import { Match } from "../Match";

// Better name?  Maybe StorageMatchable?
export interface StorageDependent {
    storageMatch: Match;
}

export type StorageDependable<T> = T & StorageDependent;
