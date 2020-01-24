/*! Copyright (c) 2019, XAPPmedia */
import { CompilablePath, ExecutablePath, HistoricalPath, Path, PreviousHandlerPath } from "stentor-models";

/**
 * Guard to determine if the path is a historical path.
 *
 * @export
 * @param {Path} path
 * @returns {path is HistoricalPath}
 */
export function isHistoricalPath(path: Path): path is HistoricalPath {
    return !!path && (<HistoricalPath>path).historicalIndex !== undefined;
}
/**
 * Guard to determine if the path is a previous handler path.
 *
 * @export
 * @param {Path} path
 * @returns {path is PreviousHandlerPath}
 */
export function isPreviousHandlerPath(path: Path): path is PreviousHandlerPath {
    return !!path && (<PreviousHandlerPath>path).previousHandler === true;
}
/**
 * Guard to determine if the path is compilable
 *
 * @export
 * @param {Path} path
 * @returns {path is CompilablePath}
 */
export function isCompilablePath(path: Path): path is CompilablePath {
    return isPreviousHandlerPath(path) || isHistoricalPath(path);
}
/**
 * Guard to determine if the path is executable
 *
 * @export
 * @param {Path} path
 * @returns {path is ExecutablePath}
 */
export function isExecutablePath(path: Path): path is ExecutablePath {
    return !!path && (<ExecutablePath>path).intentId !== undefined;
}
