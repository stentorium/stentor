/*! Copyright (c) 2019, XAPPmedia */
export const CATCH_ALL_REGEX = /^.*$/;

export const DETECTION_CATCH_ALL = /^\^?\.\*\$?$/;
export const DETECTION_CATCH_ALL_WITH_EXCLUSION_REGEX = /^\^?\(\?\!\(((?:\^?[\w\d]*\$?\|?)*)\)\)\.\*\$?$/;
export const DETECTION_INCLUDE_ONLY_REGEX = /^((?:[\^?[\w\d]*\$?\|?)*)$/;
export const DETECTION_ID_ONLY_REGEX = /^[\w\d]*$/;
