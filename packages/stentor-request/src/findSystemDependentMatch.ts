/*! Copyright (c) 2019, XAPPmedia */

import {
    NOTIFICATION_PERMISSION_REQUEST_TYPE,
    OPTION_SELECT_REQUEST_TYPE,
    PERMISSION_REQUEST_TYPE,
    SURFACE_CHANGE_REQUEST_TYPE
} from "stentor-constants";
import { isSystemDependable } from "stentor-guards";
import { Request, SystemConditionType, SystemDependable } from "stentor-models";

/**
 * Based on the provided request, it finds the slot dependent object
 * that is a match.
 *
 * @public
 * @param objects - Objects to check against the request
 * @param request - Request that the objects will be tested against
 * @returns The matched object or undefined if no match was found.
 */
export function findSystemDependentMatch<T extends object>(
    objects: (T | SystemDependable<T>)[],
    request: Request
): SystemDependable<T> | undefined {
    if (!Array.isArray(objects) || objects.length === 0) {
        return undefined;
    }

    if (!request) {
        return undefined;
    }

    // The first should win - not a random
    const path = objects[0];

    if (!isSystemDependable(path)) {
        return;
    }

    let condition = path.systemCondition as string;
    condition = condition.replace(/\s/g, "");

    let negate = false;
    if (condition.startsWith("!")) {
        negate = true;
        condition = condition.substr(1);
    }

    let match = false;

    switch (condition as SystemConditionType) {
        case "ACCOUNT_LINKED":
            match = !!request.accessToken;
            break;
        case "HEALTH_CHECK":
            match = request.isHealthCheck || false;
            break;
        case "BARGE_IN":
            match = request.isBargeIn || false;
            break;
        case "OPTION_SELECT":
            match = request.type === OPTION_SELECT_REQUEST_TYPE;
            break;
        case "SURFACE_CHANGED":
            match = request.type === SURFACE_CHANGE_REQUEST_TYPE && (request.granted || false);
            break;
        case "PERMISSION_GRANTED":
            match = request.type === PERMISSION_REQUEST_TYPE && (request.granted || false);
            break;
        case "NOTIFICATION_PERMISSION_GRANTED":
            match = request.type === NOTIFICATION_PERMISSION_REQUEST_TYPE && (request.granted || false);
            break;
        default:
            throw new Error(`Unknown system condition in forward: ${condition}`);
    }

    if (negate) {
        match = !match;
    }

    return match ? path : undefined;
}
