/*! Copyright (c) 2019, XAPPmedia */
import { CompilablePath, Path } from "stentor-models";
import { isPreviousHandlerPath } from "./isPreviousHandlerPath";
import { isHistoricalPath } from "./isHistoricalPath";

/**
 * Guard to determine if the path is compilable
 */
export function isCompilablePath(path: Path): path is CompilablePath {
    return isPreviousHandlerPath(path) || isHistoricalPath(path);
}