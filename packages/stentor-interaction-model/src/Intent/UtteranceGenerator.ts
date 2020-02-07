/*! Copyright (c) 2019, XAPPmedia */
const uniq = require("lodash/uniq");
import { getAttribute } from "@xapp/stentor-locales";
import { Intent, Locale } from "stentor-models";
import {
    existsAndNotEmpty,
    StringExpander,
    StringVariableStyle as UtteranceGeneratorSlotPattern
} from "stentor-utils";
import { ENTITY_SEARCH_QUERY } from "../Entity";
import { SLOT_REGEX } from "../Slot";

export { UtteranceGeneratorSlotPattern };

export interface UtteranceGeneratorProps {
    /**
     * Select the slot pattern to generate the utterances from.
     */
    slotPattern?: UtteranceGeneratorSlotPattern;
    /**
     * When provided, it will ignore (not generate) invalid utterances for the provided.
     *
     * For example, on Alexa we will ignore utterances that contain a SearchQuery slot and any other slots.
     */
    ignoreInvalidUtterancesForPlatform?: "alexa" | "dialogflow";
}

export class UtteranceGenerator {
    private slotPattern: UtteranceGeneratorSlotPattern = UtteranceGeneratorSlotPattern.ESTemplateLiteral;
    private ignoreInvalidUtterancesForPlatform?: "alexa" | "dialogflow";

    constructor(props?: UtteranceGeneratorProps) {
        if (props) {
            this.ignoreInvalidUtterancesForPlatform = props.ignoreInvalidUtterancesForPlatform;
            this.slotPattern = props.slotPattern !== undefined ? props.slotPattern : this.slotPattern;
        }
    }

    forIntent(intent: Intent, locale?: Locale): string[] {
        if (!intent) {
            return [];
        }
        const utterancePatterns = getAttribute<Intent, string[]>("utterancePatterns", locale, intent);
        const substitutions = getAttribute<Intent, { [sub: string]: string }>("substitutions", locale, intent);

        let utterances = this.forPatterns(utterancePatterns, substitutions);

        if (this.ignoreInvalidUtterancesForPlatform === "alexa" && existsAndNotEmpty(intent.slots)) {
            // First see if we have the SearchQuery, if we do then we remove the
            // utterances that have more than one just that one slot since Alexa does not allow
            // this.
            const searchQuerySlot = intent.slots.find(slot => {
                return slot.type === ENTITY_SEARCH_QUERY;
            });

            if (searchQuerySlot) {
                // Ok, game time.  Go back through and remove the ones that have the search query with an additional slot
                const cleanedUtterances: string[] = [];
                utterances.forEach(utterance => {
                    // On alexa we are looking for slots that look like {}
                    if (utterance.search(`{${searchQuerySlot.name}}`) !== -1) {
                        // only add it if it is the only slot
                        const matches = utterance.match(new RegExp(SLOT_REGEX, "g"));
                        if (matches.length === 1) {
                            // Also need to make sure it has a carrier phrase
                            if (utterance.trim().replace(matches[0], "") !== "") {
                                cleanedUtterances.push(utterance);
                            }
                        }
                    } else {
                        cleanedUtterances.push(utterance);
                    }
                });
                utterances = cleanedUtterances.slice();
            }
        }

        return utterances;
    }

    forPatterns(utterancePatterns: string[], substitutions?: { [sub: string]: string }): string[] {
        utterancePatterns = Array.isArray(utterancePatterns) ? utterancePatterns : [];

        if (typeof substitutions === "object" && Object.keys(substitutions).length > 0) {
            // Iterate and replace
            const subs = Object.keys(substitutions);
            const regexString =
                "\\${(" +
                subs.reduce((prv, value, index) => {
                    return index === 0 ? value : `${prv}|${value}`;
                }, "") +
                ")}";
            utterancePatterns = utterancePatterns.map(value => {
                const regex = new RegExp(regexString);
                let results = regex.exec(value);
                while (results) {
                    value = value.replace(results[0], substitutions[results[1]]);
                    results = regex.exec(value);
                }

                return value;
            });
        }

        const sampleUtterances: string[] = utterancePatterns.reduce((current: string[], pattern: string): string[] => {
            const utterances = new StringExpander({
                variableStyle: this.slotPattern,
                reduceToOneSpace: true,
                trim: true
            }).expand(pattern);
            return current.concat(utterances);
        }, []);

        // and finally deduplicate and return
        return uniq(sampleUtterances);
    }
}
