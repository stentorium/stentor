/*! Copyright (c) 2019, XAPPmedia */
import { KeyValue, KeyValueStore, StorageActionExecutor } from "stentor-models";

/**
 * Set will set the provided value on the provided key.
 */
export const set: StorageActionExecutor = (storage: KeyValueStore, keyValue: KeyValue) => {
    if (!storage || !keyValue) {
        return storage;
    }

    const key = keyValue.key;
    const value = keyValue.value;

    storage[key] = value;

    return storage;
};
