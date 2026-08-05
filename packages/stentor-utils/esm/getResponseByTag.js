import { existsAndNotEmpty } from "./array.js";
/**
 * From the provided array of responses, find the response that matches the provided tag.
 *
 * @param responses
 * @param tag
 * @param surfaceType
 * @param device
 * @returns
 */
export function getResponseByTag(responses, tag, surfaceType, device) {
    function isMatch(name, key) {
        if (typeof name === "string") {
            return key === name;
        }
        else if (existsAndNotEmpty(name)) {
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
    let searchKey;
    let keyContent;
    // With surfaceType and device ex. ContentKey/Chat/Facebook
    searchKey = `${tag}/${surfaceType}/${device}`; // default to widget
    keyContent = responses.find((response) => {
        return isMatch(response.tag, searchKey);
    });
    // Exists?
    if (keyContent) {
        return keyContent;
    }
    // With surface type ex. ContentKey/Chat
    searchKey = `${tag}/${surfaceType}`;
    keyContent = responses.find((response) => {
        return isMatch(response.tag, searchKey);
    });
    // Exists?
    if (keyContent) {
        return keyContent;
    }
    // Key only (exact match)
    keyContent = responses.find((response) => {
        return response.tag === tag;
    });
    return keyContent;
}
//# sourceMappingURL=getResponseByTag.js.map