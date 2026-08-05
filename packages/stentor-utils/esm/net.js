/*! Copyright (c) 2019, XAPPmedia */
import * as http from "node:http";
import * as https from "node:https";
import { HTTP_OK, HTTP_OK_MAX } from "stentor-constants";
import * as fs from "fs";
import { parse } from "url";
const FILE_PROTO_LENGTH = "file:///".length;
function fetchFile(url) {
    const path = url.substr(FILE_PROTO_LENGTH); // chop off protocol part
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data.toString("utf-8"));
        });
    });
}
function fetchNet(url) {
    return new Promise((resolve, reject) => {
        const lib = url.startsWith("https") ? https : http;
        const request = lib.get(url, (response) => {
            if (response.statusCode < HTTP_OK || response.statusCode > HTTP_OK_MAX) {
                reject(new Error("Failed to load file from url: " + url + ", status code: " + response.statusCode));
            }
            const body = [];
            response.on("data", (chunk) => body.push(chunk));
            response.on("end", () => resolve(body.join("")));
        });
        request.on("error", (err) => reject(err));
    });
}
/**
 * Fetch content from url (network or file)
 *
 * @param url
 * @returns {Promise<T>}
 */
export function fetchUrl(url) {
    if (url.toLowerCase().startsWith("http://") || url.toLowerCase().startsWith("https://")) {
        return fetchNet(url);
    }
    if (url.toLowerCase().startsWith("file:///")) {
        return fetchFile(url);
    }
    throw new Error("Protocol not supported: " + url);
}
/**
 * Simple check to see if the string is potentially a URL.
 *
 * Only looks for a prefix of https://, http://, file://, tel:
 *
 * @param {string} s
 * @returns {boolean}
 */
export function isUrl(s) {
    if (typeof s !== "string") {
        return false;
    }
    return (s.toLowerCase().startsWith("http://") ||
        s.toLowerCase().startsWith("https://") ||
        s.toLowerCase().startsWith("file:///") ||
        s.toLowerCase().startsWith("tel:"));
}
export function baseUrl(s) {
    if (isUrl(s)) {
        const url = parse(s, false);
        const a = url.pathname.split("/");
        return url.protocol + "//" + url.host + a.slice(0, a.length - 1).join("/");
    }
    return undefined;
}
/**
 * Searches for URLs in a text and converts them to hyperlinks, either for HTML or markdown (default)
 *
 * Based on {@link https://stackoverflow.com/a/25821576/1349766}
 *
 * @param text
 * @param format
 * @returns
 */
export function linkify(text, format = "markdown") {
    if (!text) {
        return text;
    }
    // This regex URL is not great but it is ok.
    // Negative look behind would make this a little easier but
    // they are not supported on Safari
    const urlRegex = /(\(|=["'])?(((https?:\/\/)|(www\.))[^\s\)"]+)/g;
    return text.replace(urlRegex, (url, b, c, d) => {
        if (url.startsWith("(") || url.startsWith("=")) {
            return url;
        }
        const url2 = (d === 'www.') ? 'https://' + url : url;
        if (format === "html") {
            return `<a target="_blank" href="${url2}">${url}</a>`;
        }
        else {
            return `[${url}](${url2})`;
        }
    });
}
//# sourceMappingURL=net.js.map