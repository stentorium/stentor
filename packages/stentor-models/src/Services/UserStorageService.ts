/*! Copyright (c) 2019, XAPPmedia */
import { Storage } from "../Storage";

export interface UserStorageService {
    /**
     * Get the storage for the provided ID
     *
     * @param id
     * @returns
     */
    get(id: string): Promise<Storage | undefined>;
    /**
     * Creates the storage for the provided ID
     *
     * @param id
     * @param storage
     * @returns
     */
    create(id: string, storage: Storage): Promise<Storage>;
    /**
     * Update the storage for the provided ID with provided storage.
     *
     * @param id
     * @param storage
     * @returns
     */
    update(id: string, storage: Storage): Promise<Storage>;
}
