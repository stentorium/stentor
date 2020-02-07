/*! Copyright (c) 2019, XAPPmedia */
/*
 * Regex for finding slots in sample utterances.
 *
 * This will look for either {-|slot}, ${slot}, or {slot}
 */
export const SLOT_REGEX = /\$?{(?:-\||)(\w*)}/;
/**
 * Regex for finding slots in utterance patterns.
 *
 * This looks for {-|slot}
 */
export const SLOT_UTTERANCE_PATTERNS_REGEX = /{-\|(\w*)}/;
/**
 * Regex for finding slots in the compiled sample utterances.
 *
 * This looks for ${slot}
 */
export const SLOT_SAMPLE_UTTERANCE_REGEX = /\${(\w*)}/;
