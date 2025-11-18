/*! Copyright (c) 2022, XAPPmedia */
import { Response, SimpleResponse } from "stentor-models";
import { existsAndNotEmpty } from "./array";

/**
 * From the provided array of responses, find the response that matches the provided tag.
 * 
 * @param responses 
 * @param tag 
 * @param surfaceType 
 * @param device 
 * @returns 
 */
export function getResponseByTag(responses: Response[], tag: string, surfaceType?: string, device?: string): Response {
    function isMatch(name: string | string[], key: string): boolean {
        if (typeof name === "string") {
            return key === name;
        } else if (existsAndNotEmpty(name)) {
            return name.includes(key);
        }
        return false;
    }

    if (!tag) {
        return undefined;
    }

    if (!existsAndNotEmpty(responses)) {
        return undefined;
    }

    let searchKey: string;
    let keyContent;

    // With surfaceType and device ex. ContentKey/Chat/Facebook
    searchKey = `${tag}/${surfaceType}/${device}`; // default to widget
    keyContent = responses.find((response: SimpleResponse) => {
        return isMatch(response.tag, searchKey);
    });

    // Exists?
    if (keyContent) {
        return keyContent;
    }

    // With surface type ex. ContentKey/Chat
    searchKey = `${tag}/${surfaceType}`;
    keyContent = responses.find((response: SimpleResponse) => {
        return isMatch(response.tag, searchKey);
    });

    // Exists?
    if (keyContent) {
        return keyContent;
    }

    // Key only (exact match)
    keyContent = responses.find((response: SimpleResponse) => {
        return response.tag === tag;
    });

    return keyContent;
}
