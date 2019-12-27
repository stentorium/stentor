/*! Copyright (c) 2019, XAPPmedia */
import { KeyValue, KeyValueStore } from "./KeyValueStore";
export declare type StorageActionAdd = "ADD";
export declare type StorageActionAppend = "APPEND";
export declare type StorageActionDelete = "DELETE";
export declare type StorageActionSet = "SET";
export declare type StorageActionSubtract = "SUBTRACT";
export declare type StorageActionType = StorageActionAdd | StorageActionAppend | StorageActionDelete | StorageActionSet | StorageActionSubtract;
export declare type StorageActionExecutor<S extends KeyValueStore = KeyValueStore> = (storage: S, keyValue: KeyValue) => S;
