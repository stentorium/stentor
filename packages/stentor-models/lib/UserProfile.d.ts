/*! Copyright (c) 2019, XAPPmedia */
export interface UserProfile {
    /**
     * The first name, or given name, of the user.
     *
     * @type {string}
     * @memberof UserProfile
     */
    name?: string;
    /**
     * The email of the user.
     *
     * @type {string}
     * @memberof UserProfile
     */
    email?: string;
    /**
     * User granted permission to update
     * Note: This isn't a piece of data we want to know, but Google uses the permissioning mechanism to grant it.
     *
     * @type {string}
     * @memberof UserProfile
     */
    notificationGranted?: boolean;
    phone?: string;
    preciseLocation?: string;
    coarseLocation?: string;
}
