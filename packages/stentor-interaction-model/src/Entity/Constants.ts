/*! Copyright (c) 2019, XAPPmedia */

import {
    ENTITY_COLOR,
    ENTITY_DATE,
    ENTITY_DATE_TIME,
    ENTITY_DURATION,
    ENTITY_FOOD,
    ENTITY_LITERAL,
    ENTITY_NUMBER,
    ENTITY_ORDINAL,
    ENTITY_PHONE_NUMBER,
    ENTITY_SEARCH_QUERY,
    ENTITY_TIME
} from "stentor-constants";

// Re-export to prevent the API from breaking

export {
    ENTITY_COLOR,
    ENTITY_DATE_TIME,
    ENTITY_DATE,
    ENTITY_DURATION,
    ENTITY_FOOD,
    ENTITY_LITERAL,
    ENTITY_NUMBER,
    ENTITY_ORDINAL,
    ENTITY_PHONE_NUMBER,
    ENTITY_SEARCH_QUERY,
    ENTITY_TIME,
};

/**
 * Current list of supported built-in entities.
 */
export const BUILT_IN: string[] = [
    ENTITY_COLOR,
    ENTITY_DATE,
    ENTITY_DATE_TIME,
    ENTITY_DURATION,
    ENTITY_NUMBER,
    ENTITY_ORDINAL,
    ENTITY_PHONE_NUMBER,
    ENTITY_SEARCH_QUERY,
    ENTITY_TIME
];

/**
 * Current list of supported extensible built-in entities
 */
export const EXTENSIBLE_BUILT_IN: string[] = [ENTITY_COLOR];
