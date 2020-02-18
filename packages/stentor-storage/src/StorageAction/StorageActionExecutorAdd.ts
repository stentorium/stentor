/*! Copyright (c) 2019, XAPPmedia */
import { KeyValue, KeyValueStore, StorageActionExecutor } from "stentor-models";

/**
 * Add will add the provided value from the provided key.
 */
export const add: StorageActionExecutor = (storage: KeyValueStore, keyValue: KeyValue) => {
    if (!storage || !keyValue) {
        return storage;
    }

    const key = keyValue.key;

    if (!key) {
        return storage;
    }

    let value: number;

    if (typeof keyValue.value === "number") {
        value = keyValue.value;
    } else {
        console.error(`Value of unexpected type ${typeof keyValue.value} for add(), unable to update key ${key}`);
        return storage;
    }

    let currentValue: number;
    const storageValue = storage[key];

    if (typeof storageValue === "undefined") {
        currentValue = 0;
    } else if (typeof storageValue === "number") {
        currentValue = storageValue;
    } else {
        console.error(
            `Value on storage was an unexpected type ${typeof currentValue} for add(), unable to update key ${key}`
        );
        return storage;
    }
    // we should have two numbers now, add them.
    storage[key] = currentValue + value;
    // and return them
    return storage;
};
