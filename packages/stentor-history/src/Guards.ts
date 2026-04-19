/*! Copyright (c) 2019, XAPPmedia */
import { HistoryData, HandlerHistoryData, PlayableHistoryData } from "stentor-models";

/**
 * Check if the HistoryData is PlayableHistoryData
 */
export function isPlayableHistoryData(data: HistoryData | number | HandlerHistoryData[] | undefined): data is PlayableHistoryData {
    return !!data && typeof data === 'object' && !Array.isArray(data) && (data as PlayableHistoryData).currentTime !== undefined;
}
