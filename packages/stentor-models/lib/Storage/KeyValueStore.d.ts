/*! Copyright (c) 2019, XAPPmedia */
export declare type ValueTypes = object | string | number | boolean;
export interface KeyValue {
    /**
     * Key on the storage that the action will be
     * taken on.
     *
     * @type {string}
     * @memberof KeyValue
     */
    key: string;
    /**
     * The value to be set or appended.
     *
     * Not always required when deleting a key.
     *
     * @type {object | string | number | boolean}
     * @memberof KeyValue
     */
    value?: ValueTypes;
}
export interface KeyValueStore {
    [keys: string]: boolean | number | string | object;
}
