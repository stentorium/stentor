/*! Copyright (c) 2020, XAPPmedia */
import { ConditionalCheck, Request, SystemDependable } from "stentor-models";
import { isSystemDependable } from "./Guards";
import { findSystemDependentMatch } from "./findSystemDependentMatch";

/**
 * Returns true if the user has linked an account, false if they have not.
 * 
 * @param request - Request to check
 */
export function hasLinkedAccount(request: Request): boolean {
    return !!findSystemDependentMatch([{
        systemCondition: "ACCOUNT_LINKED"
    }], request);
}

/**
 * Returns a system conditional check 
 * 
 * @param request - Request to perform the checks on
 */
export function SystemConditionalCheck<T extends object>(request: Request): ConditionalCheck {
    return {
        test: isSystemDependable,
        check: (obj: SystemDependable<T>): boolean => {
            return !!findSystemDependentMatch([obj], request);
        },
        functions: [hasLinkedAccount.bind(null, request)]
    }
}