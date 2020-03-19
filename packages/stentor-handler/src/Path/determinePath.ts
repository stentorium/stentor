/*! Copyright (c) 2019, XAPPmedia */
import { determine } from "stentor-determiner";
import { log } from "stentor-logger";
import { Context, ExecutablePath, Path, Request } from "stentor-models";
import { compileHistoricalPath } from "./compileHistoricalPath";
import { compilePreviousHandlerPath } from "./compilePreviousHandlerPath";
import { isHistoricalPath, isPreviousHandlerPath } from "./Guards";


function compilePaths(paths: Path[], request: Request, context: Context): ExecutablePath[] {
    const compiledPaths: ExecutablePath[] = [];

    // Find historical and previous
    paths.forEach(path => {
        if (isHistoricalPath(path)) {
            const compiledHistoricalPath = compileHistoricalPath(path, context);
            if (compiledHistoricalPath) {
                compiledPaths.push(compiledHistoricalPath);
            }
        } else if (isPreviousHandlerPath(path)) {
            const compiledPreviousHandlerPath = compilePreviousHandlerPath(path, request, context);
            if (compiledPreviousHandlerPath) {
                compiledPaths.push(compiledPreviousHandlerPath);
            }
        } else {
            compiledPaths.push(path);
        }
    });

    return compiledPaths;
}

/**
 * Determine a possible path that is best suited for the request.
 *
 * @public
 */
export function determinePath(definedPaths: Path[], request: Request, context: Context): ExecutablePath {
    // Sanity check
    if (!Array.isArray(definedPaths) || definedPaths.length === 0) {
        return undefined;
    }

    // no platform or matching platform
    const paths: Path[] = definedPaths.filter(p => {
        return !p.platform || p.platform === request.platform;
    });

    // Once more
    if (!Array.isArray(paths) || paths.length === 0) {
        return undefined;
    }

    // Compile the historical and previous handler paths
    const compiledPaths = compilePaths(paths, request, context);
    // Determine the path based on the compiled paths
    const determinedPath = determine(compiledPaths, request, context);

    if (!determinedPath) {
        // We want to keep track of this in case somebody was expecting a
        // response but didn't get one.
        log().info("Could not determine a path.");
    }

    return determinedPath;
}


