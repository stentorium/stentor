/*! Copyright (c) 2019, XAPPmedia */
import { Request, RequestDependable } from "stentor-models";
import { compare, random } from "stentor-utils";
import { isRequestDependable } from "./Guards";

/**
 * Based on the provided request, it finds a request dependent match or undefined if no match is found.
 *
 * @template T
 * @param {((T | RequestDependable<T>)[])} potentials
 * @param {Request} request
 * @returns {(RequestDependable<T> | undefined)}
 */
export function findRequestDependentMatch<T extends object>(
    potentials: (T | RequestDependable<T>)[],
    request: Request
): RequestDependable<T> | undefined {
    // Some initial exit conditions
    if (!Array.isArray(potentials) || potentials.length === 0) {
        return undefined;
    }

    if (!request) {
        return undefined;
    }

    const matches: RequestDependable<T>[] = [];

    potentials.forEach(potential => {
        if (!isRequestDependable(potential)) {
            return;
        }

        const test = potential.requestMatch;
        const operation = test.operation;
        const name = test.name;
        let requestValue: string | boolean | number;

        switch (name) {
            default:
                requestValue = (request as any)[name];
        }

        // check if it is an array or not
        if (Array.isArray(test.value)) {
            // it is an array, try each for a match
            test.value.forEach(value => {
                if (compare(requestValue, value, operation)) {
                    matches.push(potential);
                }
            });
        } else {
            if (compare(requestValue, test.value, operation)) {
                matches.push(potential);
            }
        }
    });

    return random(matches);
}
