/*! Copyright (c) 2019, XAPPmedia */
import { KeyValue, KeyValueStore } from "./KeyValueStore";

export type StorageActionAdd = "ADD";
export type StorageActionAppend = "APPEND";
export type StorageActionDelete = "DELETE";
export type StorageActionSet = "SET";
export type StorageActionSubtract = "SUBTRACT";
/*
 * Type of storage actions.
 */
export type StorageActionType =
    | StorageActionAdd
    | StorageActionAppend
    | StorageActionDelete
    | StorageActionSet
    | StorageActionSubtract;

export type StorageActionExecutor<S extends KeyValueStore = KeyValueStore> = (storage: S, keyValue: KeyValue) => S;
