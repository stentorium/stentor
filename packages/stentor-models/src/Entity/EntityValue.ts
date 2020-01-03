/*! Copyright (c) 2019, XAPPmedia */
export interface EntityValue {
    /**
     * The name of the entity.
     *
     * For example, for an entity called cities, a value would be "Los Angeles".
     */
    name: string;
    /**
     *  Used by Alexa.  This value is returned as a reference, such as "LAX"
     */
    canonicalId?: string;
    /**
     * List of potential synonyms for the entity.
     *
     * For example, "L.A."" & "City of Angels"
     */
    synonyms?: string[];
}
