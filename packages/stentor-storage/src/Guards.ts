/*! Copyright (c) 2019, XAPPmedia */
import { StorageDependable, StorageDependent } from "stentor-models";

export function isStorageDependable<T>(item: object): item is StorageDependable<T> {
    return !!item && (item as StorageDependent).storageMatch !== undefined;
}
