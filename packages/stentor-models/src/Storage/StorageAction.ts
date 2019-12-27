/*! Copyright (c) 2019, XAPPmedia */
import { KeyValue } from "./KeyValueStore";
import { StorageActionType } from "./Types";

export type StorageType = "SESSION" | "PERMANENT";

export interface StorageAction extends KeyValue {
    /**
     * The type of action to be performed on the storage.
     *
     * @type {StorageActionType}
     * @memberof StorageAction
     */
    type: StorageActionType;
    /**
     * Which storage to perform the action on.
     *
     * @type {StorageType}
     * @memberof StorageAction
     */
    store: StorageType;
}
