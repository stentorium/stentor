/*! Copyright (c) 2019, XAPPmedia */
import { History } from "stentor-models";
import { isPlayableHistoryData } from "./Guards";

export const DEFAULT_TIME_TO_TRIM_IN_SECONDS = 3600;
export const DEFAULT_HISTORY_SIZE = 20;
export const DEFAULT_LAST_PLAYED_FORGET_SECONDS = 31536000; // 1 year (seconds in the common year)

const MS_IN_SECONDS = 1000;

export interface TrimOptions {
    tttSeconds?: number;
    historySize?: number;
    lastPlayedForgetSeconds?: number;
}


function _trim(history: History, options?: TrimOptions): History {
    const newHistory = {} as History;

    // Get it out of the way for sorting
    delete history.lastTrimmed;

    // Trim handlers, first sort though
    if (Array.isArray(history.handler)) {
        history.handler.sort((a, b) => {
            return b.timestamp - a.timestamp;
        });
        newHistory.handler = history.handler.splice(options.historySize);
    }

    const now = Date.now();

    // Sort the attributes (tokens) by lastPlayed. Use now() for the sorting if the play time is not available.
    const sortedTokens = Object.keys(history).sort((key0: string, key1: string) => {
        const data0 = history[key0];
        const data1 = history[key1];
        const t0 = isPlayableHistoryData(data0) ? data0.lastPlayed : now;
        const t1 = isPlayableHistoryData(data1) ? data1.lastPlayed : now;

        return t1 - t0;
    });

    // Copy until size is reached or stop at the first old entry
    sortedTokens.some(
        (token: string, index: number): boolean => {
            const data = history[token];

            if (isPlayableHistoryData(data) && data.lastPlayed) {
                const secondsSinceLastPlay = (now - data.lastPlayed) / MS_IN_SECONDS;
                if (secondsSinceLastPlay > options.lastPlayedForgetSeconds) {
                    return true; // we are done since the keys are sorted
                }
            }

            newHistory[token] = history[token];

            return index === options.historySize - 1; // stop at size
        }
    );

    newHistory.lastTrimmed = now;

    return newHistory;
}

/**
 * Trims the history to keep it from overflowing.
 */
export function trimHistory(history: History, trimOptions?: TrimOptions): History {
    if (!history) {
        return history;
    }

    if (!trimOptions) {
        trimOptions = {} as TrimOptions;
    }

    const options = {} as TrimOptions;
    options.tttSeconds = trimOptions.tttSeconds || DEFAULT_TIME_TO_TRIM_IN_SECONDS;
    options.historySize = trimOptions.historySize || DEFAULT_HISTORY_SIZE;
    options.lastPlayedForgetSeconds = trimOptions.lastPlayedForgetSeconds || DEFAULT_LAST_PLAYED_FORGET_SECONDS;

    let timeToTrim = true;
    if (history.lastTrimmed) {
        const secondsSinceLastTrim = (Date.now() - history.lastTrimmed) / MS_IN_SECONDS;
        timeToTrim = secondsSinceLastTrim > options.tttSeconds;
    }

    return timeToTrim ? _trim(history, options) : history;
}

