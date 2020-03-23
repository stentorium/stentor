/*! Copyright (c) 2019, XAPPmedia */
import { Path, PreviousHandlerPath } from "stentor-models";

/**
 * Guard to determine if the path is a previous handler path.
 */
export function isPreviousHandlerPath(path: Path): path is PreviousHandlerPath {
    return !!path && (path as PreviousHandlerPath).previousHandler === true;
}