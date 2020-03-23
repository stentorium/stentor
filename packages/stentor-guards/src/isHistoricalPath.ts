/*! Copyright (c) 2019, XAPPmedia */
import { HistoricalPath, Path } from "stentor-models";

/**
 * Guard to determine if the path is a historical path.
 */
export function isHistoricalPath(path: Path): path is HistoricalPath {
    return !!path && (path as HistoricalPath).historicalIndex !== undefined;
}