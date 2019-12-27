/*! Copyright (c) 2019, XAPPmedia */
/**
 * Lets make it simple and versatile
 */
export interface SessionStoreData {
    id: string;
    data: {
        [key: string]: any;
    };
}
export interface SessionStore {
    /**
     * Get a session value
     *
     * @param {string} key
     * @returns {any}
     */
    get(key: string): any;
    /**
     * Set a value with a key
     * @param {string} key
     * @param value
     */
    set(key: string, value: any): void;
    /**
     * This will return the whole store
     *
     * @returns {any}
     */
    getStore(): any;
}
