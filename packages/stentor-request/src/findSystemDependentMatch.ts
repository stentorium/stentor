/*! Copyright (c) 2019, XAPPmedia */
import { Request, SystemConditionType, SystemDependable } from "stentor-models";
import {
    NOTIFICATION_PERMISSION_REQUEST_TYPE,
    OPTION_SELECT_REQUEST_TYPE,
    PERMISSION_REQUEST_TYPE,
    SURFACE_CHANGE_REQUEST_TYPE }
from "./Constants";
import { isSystemDependable } from "./Guards";

/**
 * Based on the request, it finds the slot dependent path
 * that is a match.
 *
 * @export
 * @param {SlotDependentPath[]} paths
 * @param {Request} request
 * @returns {(SlotDependentPath | undefined)}
 */
// tslint:disable-next-line:cyclomatic-complexity
export function findSystemDependentMatch<T extends object>(
    potentials: (T | SystemDependable<T>)[],
    request: Request
): SystemDependable<T> | undefined {
    if (!Array.isArray(potentials) || potentials.length === 0) {
        return undefined;
    }

    if (!request) {
        return undefined;
    }

    // The first should win - not a random
    const path = potentials[0];

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
