/*! Copyright (c) 2019, XAPPmedia */
import { KeyValue, KeyValueStore, StorageActionExecutor } from "stentor-models";

/**
 * Subtract will subtract the provided value from the provided key.
 */
export const subtract: StorageActionExecutor = (storage: KeyValueStore, keyValue: KeyValue) => {
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
        console.error(`Value of unexpected type ${typeof keyValue.value} for subtract(), unable to update key ${key}`);
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
            `Value on storage was an unexpected type ${typeof currentValue} for subtract(), unable to update key ${key}`
        );
        return storage;
    }
    // we should have two numbers now, subtract them.
    storage[key] = currentValue - value;
    // and return them
    return storage;
};
