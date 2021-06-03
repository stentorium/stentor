/*! Copyright (c) 2019, XAPPmedia */
import { isHistoricalPath } from "stentor-guards";
import { getHandlerHistory } from "stentor-history";
import { Context, ExecutablePath, HistoricalPath } from "stentor-models";

/**
 * Compiles a HistoricalPath to a ExecutablePath based on the provided
 * context.
 *
 * @param {HistoricalPath} historicalPath
 * @param {Context} context
 * @returns {(ExecutablePath | undefined)}
 */
export function compileHistoricalPath(historicalPath: HistoricalPath, context: Context): ExecutablePath | undefined {
    if (!historicalPath) {
        return undefined;
    }

    if (!context || !context.storage) {
        return undefined;
    }

    let returnPath: ExecutablePath;

    if (isHistoricalPath(historicalPath)) {
        const handlerHistory = getHandlerHistory(context.storage.history);

        const data = handlerHistory[historicalPath.historicalIndex];
        // it is possible for data to not exist
        // if the history was undefined for the provided index
        if (data) {
            // Copy and clean off the historicalIndex
            const cleanedHistoricalPath: any = { ...historicalPath };
            delete cleanedHistoricalPath.historicalIndex;

            returnPath = {
                ...cleanedHistoricalPath,
                intentId: data.intentId,
                type: "START"
            };
        }
    }

    return returnPath;
}
