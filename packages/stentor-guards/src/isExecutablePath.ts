/*! Copyright (c) 2019, XAPPmedia */
import { ExecutablePath, Path } from "stentor-models";

/**
 * Guard to determine if the path is executable
 */
export function isExecutablePath(path: Path): path is ExecutablePath {
    return !!path && (path as ExecutablePath).intentId !== undefined;
}