/*! Copyright (c) 2020, XAPPmedia */
import { SESSION_STORAGE_NEW_USER } from "stentor-constants";
import { ConditionalCheck, Context, Request, SystemDependable } from "stentor-models";
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
 * Returns true if the user is new.
 * 
 * This will be true for the duration of the user's first session, not just
 * the first interaction.
 * 
 * It looks for the session storage key SESSION_STORAGE_NEW_USER = "new_user" to exist and be true.
 * 
 * @param context 
 */
export function isNewUser(context: Context): boolean {
    // Look for the NEW_USER field in the session storage.
    return !!context.session.get(SESSION_STORAGE_NEW_USER);
}

/**
 * Checks if the request is for the provided platform.  
 * 
 * @param request 
 * @param platform 
 */
export function isPlatform(request: Request, platform: string): boolean {
    if (!platform) {
        return false;
    }

    return request.platform.toLowerCase() === platform.toLowerCase();
}

/**
 * Checks the storage if the value at the provided key is equal to the provided value.
 * 
 * @param context 
 * @param key 
 * @param value 
 */
export function storageEquals(context: Context, key: string, value: string | number | boolean): boolean {
    return context.storage[key] === value;
}

/**
 * Checks the session storage if the value at the provided key is equal to the provided value.
 * 
 * @param context 
 * @param key 
 * @param value 
 */
export function sessionStorageEqual(context: Context, key: string, value: string | number | boolean): boolean {
    return context.session.get(key) === value;
}

/**
 * Returns a system conditional check 
 * 
 * @param request - Request to perform the checks on
 */
export function SystemConditionalCheck<T extends object>(request: Request, context: Context): ConditionalCheck {
    return {
        test: isSystemDependable,
        check: (obj: SystemDependable<T>): boolean => {
            return !!findSystemDependentMatch([obj], request);
        },
        functions: [
            hasLinkedAccount.bind(null, request),
            isNewUser.bind(null, context),
            isPlatform.bind(null, request),
            storageEquals.bind(null, context),
            sessionStorageEqual.bind(null, context)
        ]
    }
}