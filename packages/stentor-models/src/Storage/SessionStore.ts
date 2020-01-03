/*! Copyright (c) 2019, XAPPmedia */
/**
 * Lets make it simple and versatile
 */
export interface SessionStoreData {
    id: string;
    data: { [key: string]: any };
}

export interface SessionStore {
    /**
     * Get a session value
     *
     * @param key - Key for value to be retrieved
     * @returns Value for the supplied key
     */
    get(key: string): any;
    /**
     * Set a value with a key
     * 
     * @param key - Key for value to be set
     * @param value - Value to be set on the store
     */
    set(key: string, value: any): void;
    /**
     * This will return the whole store
     *
     * @returns The session storage 
     */
    getStore(): any;
}
