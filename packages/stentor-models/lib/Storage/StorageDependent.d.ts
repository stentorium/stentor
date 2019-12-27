/*! Copyright (c) 2019, XAPPmedia */
import { Match } from "../Match";
export interface StorageDependent {
    storageMatch: Match;
}
export declare type StorageDependable<T> = T & StorageDependent;
