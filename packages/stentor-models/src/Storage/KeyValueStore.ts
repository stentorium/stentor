/*! Copyright (c) 2019, XAPPmedia */
export type ValueTypes = object | string | number | boolean;

export interface KeyValue {
    /**
     * Key on the storage that the action will be
     * taken on.
     */
    key: string;
    /**
     * The value to be set or appended.
     *
     * Not always required when deleting a key.
     */
    value?: ValueTypes;
}

export interface KeyValueStore {
    // Extensible, anything can be added to it.
    [keys: string]: boolean | number | string | object | any;
}
