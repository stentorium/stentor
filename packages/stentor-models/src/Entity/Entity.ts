/*! Copyright (c) 2019, XAPPmedia */
import { EntityValue } from "./EntityValue";

export interface Entity {
    /**
     * The ID for the application the entity belongs to.
     *
     * This is immutable.
     */
    appId?: string;
    /**
     *  The ID (name) of the entity.
     *
     *  This is meant for machines but is somewhat human readable
     *
     *  This is immutable.
     */
    entityId: string;
    /**
     * NLU specific metadata used when translating to the NLU entity.
     * 
     * Use it to override the entity type for a specific NLU
     */
    nlu?: { [nlu: string]: { type: string } };
    /**
     * Optional display name, used to help better communicate the entity.
     */
    displayName?: string;
    /**
     * Optional ID if the slot type has a representation in Dialogflow.
     * 
     * @deprecated This field is being phased out.  It will be removed in the next major release
     */
    dialogflowId?: string;
    /**
     * Values for the entity.
     */
    values: EntityValue[];
    /**
     * The type of entity.
     *
     * If not set, the default is 'VALUE_SYNONYMS' which uses a set of values
     * and corresponding synonyms for the value.
     *
     * REGEX is when the values are expecting to be a regular expression.  This is not
     * supported by all NLU.
     *
     * @alpha Still under development. It may change.
     */
    type?: "REGEX" | "VALUE_SYNONYMS";
}
