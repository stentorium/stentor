/*! Copyright (c) 2019, XAPPmedia */
import { HandlerHistoryData, History } from "stentor-models";

/**
 * Take in the history, filters out all other history types and then returns
 * sorted in reverse chronological order (latest is index 0).
 *
 * @param {History} history
 * @returns {HandlerHistoryData[]}
 */
export function getHandlerHistory(history: History): HandlerHistoryData[] {
    if (!history) {
        return [];
    }

    if (!Array.isArray(history.handler)) {
        return [];
    }

    // Copy original because array.sort mutates the original for some reason...
    const copy = history.handler.slice();

    // Order by last played.
    return copy.sort((a, b) => {
        return b.timestamp - a.timestamp;
    });
}
