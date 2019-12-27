/*! Copyright (c) 2019, XAPPmedia */
import { Storage } from "../Storage";

export interface UserStorageService {
    /**
     * Get the storage for the provided ID
     *
     * @param {string} id
     * @returns {(Promise<Storage | undefined>)}
     * @memberof UserStorageService
     */
    get(id: string): Promise<Storage | undefined>;
    /**
     * Creates the storage for the provided ID
     *
     * @param {string} id
     * @param {Storage} storage
     * @returns {Promise<Storage>}
     * @memberof UserStorageService
     */
    create(id: string, storage: Storage): Promise<Storage>;
    /**
     * Update the storage for the provided ID with provided storage.
     *
     * @param {string} id
     * @param {Storage} storage
     * @returns {Promise<Storage>}
     * @memberof UserStorageService
     */
    update(id: string, storage: Storage): Promise<Storage>;
}
