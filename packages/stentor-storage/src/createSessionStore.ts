/*! Copyright (c) 2019, XAPPmedia */
import { SessionStore, Storage } from "stentor-models";

/**
 * Returns a session store for the provided storage
 *
 * @param {Storage} storage
 * @returns {SessionStore}
 */
export function createSessionStore(storage: Storage): SessionStore {
    if (storage.sessionStore === undefined) {
        storage.sessionStore = {
            id: "temp",
            data: {},
            transcript: []
        };
    }

    return {
        get: (key: string): any => {
            if (!storage.sessionStore) {
                throw new Error("Session Store is not defined!");
            }

            return storage.sessionStore.data[key];
        },
        set: (key: string, value: any): void => {
            if (!storage.sessionStore) {
                throw new Error("Session Store is not defined!");
            }

            storage.sessionStore.data[key] = value;
        },
        getStore: (): any => {
            if (!storage.sessionStore) {
                throw new Error("Session Store is not defined!");
            }

            return storage.sessionStore.data;
        }
    };
}
