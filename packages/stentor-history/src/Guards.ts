/*! Copyright (c) 2019, XAPPmedia */
import { HistoryData, PlayableHistoryData } from "stentor-models";

/**
 * Check if the HistoryData is PlayableHistoryData
 */
export function isPlayableHistoryData(data: HistoryData): data is PlayableHistoryData {
    return !!data && (data as PlayableHistoryData).currentTime !== undefined;
}
