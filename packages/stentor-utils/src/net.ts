/*! Copyright (c) 2019, XAPPmedia */
import { HTTP_OK, HTTP_OK_MAX } from "stentor-constants";
import * as fs from "fs";
import { parse, Url } from "url";

const FILE_PROTO_LENGTH = "file:///".length;

/**
 * Fetch content from url (network or file)
 *
 * @param url
 * @returns {Promise<T>}
 */
export function fetchUrl(url: string): Promise<string> {
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
 * Only looks for a prefix of https://, http:// & file://
 *
 * @export
 * @param {string} s
 * @returns {boolean}
 */
export function isUrl(s: string): boolean {
    return (
        s.toLowerCase().startsWith("http://") ||
        s.toLowerCase().startsWith("https://") ||
        s.toLowerCase().startsWith("file:///")
    );
}

export function baseUrl(s: string): string {
    if (isUrl(s)) {
        const url: Url = parse(s, false);
        const a = url.pathname.split("/");

        return url.protocol + "//" + url.host + a.slice(0, a.length - 1).join("/");
    }

    return undefined;
}

function fetchFile(url: string): Promise<string> {
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

function fetchNet(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const lib = url.startsWith("https") ? require("https") : require("http");

        const request = lib.get(url, (response: any) => {
            if (response.statusCode < HTTP_OK || response.statusCode > HTTP_OK_MAX) {
                reject(new Error("Failed to load file from url: " + url + ", status code: " + response.statusCode));
            }

            const body: any[] = [];
            response.on("data", (chunk: any) => body.push(chunk));
            response.on("end", () => resolve(body.join("")));
        });

        request.on("error", (err: Error) => reject(err));
    });
}
