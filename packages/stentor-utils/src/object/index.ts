/*! Copyright (c) 2019, XAPPmedia */
export * from "./findValueForKey";
export * from "./findValuesForKey";
export * from "./percentComplete";

/**
 * A function that's the opposite of "subset" in which it will remove the attributes that are given in the function.
 *
 * The original object is not affected.
 *
 * @param obj Object to remove the items from.
 * @param attrs The attribute keys to remove from the object. It can be strings for generic javascript objects or
 *      numbers for arrays.
 *      It can also be a function that returns a boolean where "true" means to keep and "false" means to remove.
 *      In the case for functions, the first parameters will be the "key" of the object (string for objects and numbers for arrays.).
 *
 */
export function removeItems(obj: any, attrs: (string | number)[] | ValidateKeyCallback): any {
    if (!obj) {
        return obj;
    }

    if (!attrs || attrs.length === 0) {
        return { ...obj };
    }

    const objIsArray: boolean = Array.isArray(obj);
    const returnObj: any = objIsArray ? (obj as Array<any>).slice() : { ...obj };

    const deleteItem = (key: string | number): void => {
        if (objIsArray) {
            (returnObj as Array<any>).splice(key as number, 1);
        } else {
            delete returnObj[key];
        }
    };

    if (typeof attrs === "function") {
        // Reverse order in case it's an array so it shrinks it appropriately.
        Object.keys(obj)
            .reverse()
            .forEach((key: any) => {
                if (!attrs(key, returnObj[key])) {
                    deleteItem(key);
                }
            });
    } else {
        attrs.reverse().forEach((value: string | number) => {
            deleteItem(value);
        });
    }
    return returnObj;
}

/**
 * A function that will return a subset of a given object keeping only the attributes that it contains.
 *
 * The original object is not affected.
 *
 * @param obj Object to create a subset for.
 * @param attrs The attributes to retain in the object.
 */
export function subset(obj: object, attrs: string[]): object {
    if (!obj) {
        return obj;
    }

    if (!attrs || attrs.length === 0) {
        return {};
    }

    const check: any = obj;
    const returnObj: any = {};
    attrs.forEach((value: string) => {
        if (check.hasOwnProperty(value)) {
            returnObj[value] = check[value];
        }
    });

    return returnObj;
}

/**
 * A Utility function to determine if an object has attributes or not.
 *
 *
 * @param obj Object to check
 * @return True if the object exists and has attributes or false otherwise.
 */
export function objHasAttrs(obj: object): boolean {
    const testObj = obj || {};
    return Object.keys(testObj).length > 0 && testObj.constructor === Object;
}

export type ValidationErrorHandler = (keys: string[], error: Error) => void;

function defaultValidationErrorHandler(keys: string[], error: Error): void {
    throw error;
}

/**
 * A validation function that can check if an object contains an attribute that is should not have.
 * @param obj The object to check.
 * @param requiredAttrs The attributes that are not allowed.
 * @param onError An optional error handler that allows for custom messages or actions.  The keys passed in will be the keys that are banned which are contained in the item.
 */
export function throwIfDoesContain(
    obj: object,
    bannedAttrs: string[],
    onError: ValidationErrorHandler = defaultValidationErrorHandler
): void {
    if (!obj || !bannedAttrs || bannedAttrs.length === 0) {
        // It obviously does not contain the items.
        return;
    }

    const sub = subset(obj, bannedAttrs);
    const keys = Object.keys(sub);
    if (keys.length > 0) {
        const error = new Error("Object can not contain keys: '" + keys.join(", ") + "'.");
        onError(keys, error);
    }
}

/**
 * A validation function that can check if an object contains the required attributes and throws an error if they are not part of it.
 * @param obj Object to check
 * @param requiredAttrs The attributes in the object that are required.
 * @param undefinedPermitted True if the object is allowed to be undefined.  Default is false in which case an error will be thrown.
 * @param onError An optional error handler that allows for custom messages or actions.  The keys passed in will be the keys that were required but are not inside the object.
 */
export function throwIfDoesNotContain(
    obj: object,
    requiredAttrs: string[],
    undefinedPermitted?: boolean,
    onError: ValidationErrorHandler = defaultValidationErrorHandler
): void {
    if (!obj) {
        if (undefinedPermitted) {
            return;
        } else {
            throw new Error("Object can not be undefined.");
        }
    }

    if (!requiredAttrs || requiredAttrs.length === 0) {
        // There's nothing required so let it go.
        return;
    }

    const subs = subset(obj, requiredAttrs);
    const keys: string[] = Object.keys(subs);
    if (keys.length !== requiredAttrs.length) {
        const difference = requiredAttrs.filter(
            (key: string): boolean => {
                return keys.indexOf(key) < 0;
            }
        );
        const error = new Error("Object must contain keys: '" + difference.join(", "));
        onError(difference, error);
    }
    // Rejoice!
}

/**
 * A validation function that can check an object contains properties that should not exist in the object.
 * @param obj The object to check.
 * @param restrictAttrs The attributes to restrict to the object to.  Will not check if empty.
 * @param undefinedPermitted Set to true if the object is allowed to be undefined.  Default is false in which case an error will be thrown.
 * @param onError An optional error handler that allows for custom messages or actions.  The keys passed in will be the keys that were not allowed in the object but were.
 */
export function throwIfContainsExtra(
    obj: object,
    restrictAttrs: string[],
    undefinedPermitted?: boolean,
    onError: ValidationErrorHandler = defaultValidationErrorHandler
): void {
    if (!obj) {
        if (undefinedPermitted) {
            return;
        } else {
            throw new Error("Object can not be undefined.");
        }
    }

    if (!restrictAttrs || restrictAttrs.length === 0) {
        return;
    }

    const removed = removeItems(obj, restrictAttrs);
    const keys = Object.keys(removed);
    if (keys.length > 0) {
        const error = new Error("Object does not pass validation. Keys: '" + keys.join(", ") + "' are not permitted.");
        onError(keys, error);
    }
    // Rejoice!
}



export type ValidateKeyCallback = (key: string | number, value: any) => boolean;

/**
 * Creates a copy and removes the empty strings from the object.
 *
 * @export
 * @template T
 * @param {T} obj
 * @returns {T}
 */
export function removeEmptyStrings<T extends object>(obj: T): T {
    if (typeof obj !== "object") {
        return obj;
    }

    // Make a copy that will be mutated.
    // The <any> caste is to make TS happy
    // It says spread operators are only available on
    // object types, which T is since it extends it
    const copy: T = { ...(obj as any) };

    Object.keys(obj).forEach(key => {
        const value = (obj as any)[key];
        if (typeof value === "string" && value === "") {
            // delete the key on the copy, not the original
            delete (copy as any)[key];
        }
    });

    return copy;
}
