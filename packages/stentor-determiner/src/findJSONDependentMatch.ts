/*! Copyright (c) 2019, XAPPmedia */
import { ConditionalCheck, Context, JSONDependable, Request } from "stentor-models";
import { compare, random } from "stentor-utils";
import { JSONPath } from "jsonpath-plus";
import { isJSONDependable } from "stentor-guards";

/**
 * Based on the provided request and context, it finds the a JSON dependent match or undefined if not match is found
 *
 * @param {((T | JSONDependable<T>)[])} potentials
 * @param {Request} request
 * @param {Context} context
 * @returns {(JSONDependable<T> | undefined)}
 */
export function findJSONDependentMatch<T extends object>(
    potentials: (T | JSONDependable<T>)[],
    request: Request,
    context: Context
): JSONDependable<T> | undefined {
    if (!Array.isArray(potentials) || potentials.length === 0) {
        return undefined;
    }

    if (!request || !context) {
        return undefined;
    }

    const matches: JSONDependable<T>[] = [];

    potentials.forEach(path => {
        if (!isJSONDependable(path)) {
            return;
        }

        const test = path.JSONPathMatch;
        const operation = test.operation;
        const name = test.name;

        // Determine value from the JSON path
        // simple object to pass in
        // allows us to do $.request & $.context
        const object = { request, context };
        // query the path
        const result = JSONPath({ json: object, path: name.trim() });

        if (result.length > 0) {
            // check if it is an array or not
            if (Array.isArray(test.value)) {
                // it is an array, try each for a match
                test.value.forEach(value => {
                    if (compare(result[0], value, operation)) {
                        matches.push(path);
                    }
                });
            } else {
                if (compare(result[0], test.value, operation)) {
                    matches.push(path);
                }
            }
        }
    });

    if (matches.length > 1) {
        console.info("Found more than one JSON path match.");
    }

    // Not expecting more than one match at the moment but we need to
    // return one before defining better behavior
    return random(matches);
}

/**
 * Returns a JSON conditional check for the provided request and context.
 * 
 * @param request 
 * @param context 
 */
export function JSONConditionalCheck<T extends object>(request: Request, context: Context): ConditionalCheck {
    return {
        test: isJSONDependable,
        check: (jsonDependable: JSONDependable<T>): boolean => {
            return !!findJSONDependentMatch<T>([jsonDependable], request, context);
        },
        functions: []
    }
}