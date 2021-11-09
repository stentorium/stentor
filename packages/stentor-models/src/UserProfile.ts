/*! Copyright (c) 2019, XAPPmedia */
export interface UserProfile {
    /**
     * The first name, or given name, of the user.
     */
    name?: string;
    /**
     * The email of the user.
     */
    email?: string;
    /**
     * User granted permission to update
     * Note: This isn't a piece of data we want to know, but Google uses the permissioning mechanism to grant it.
     */
    notificationGranted?: boolean;

    // NONE OF THEM PROVIDES it YET
    phone?: string;
    // NOT USED YET
    preciseLocation?: {
        coordinates?: {
            latitude: number;
            longitude: number;
        }
    };
    // NOT USED YET
    coarseLocation?: string;
}
