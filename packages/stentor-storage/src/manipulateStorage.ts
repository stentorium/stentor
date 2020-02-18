/*! Copyright (c) 2019, XAPPmedia */
import { Storage, StorageAction } from "stentor-models";
import { StorageActionExecutorFactory } from "./StorageAction";

/**
 * Performs the provided action on the provided storage.
 */
export function performAction(storage: Storage, action: StorageAction): Storage {
    // No storage or storage, bail
    if (!storage || !action) {
        return storage;
    }

    const executor = new StorageActionExecutorFactory().executorForAction(action);

    const storeType = action.store;
    switch (storeType) {
        case "SESSION":
            executor(storage.sessionStore.data, action);
            break;
        case "PERMANENT":
            executor(storage, action);
            break;
        default:
            throw new Error(`Unsupported storage type ${storeType}`);
    }

    return storage;
}

/**
 * Manipulates the provided storage with the provided actions
 */
export function manipulateStorage(storage: Storage, actions: StorageAction[]): Storage {
    // no storage, bail
    if (!storage) {
        return storage;
    }
    // not an array, bail
    if (!Array.isArray(actions)) {
        return storage;
    }
    // no actions, bail
    if (actions.length < 1) {
        return storage;
    }

    // make a copy
    let newStorage = { ...storage };
    // iterate and perform each action
    actions.forEach(action => {
        newStorage = performAction(storage, action);
    });

    return newStorage;
}


