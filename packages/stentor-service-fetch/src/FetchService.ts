/*! Copyright (c) 2019, XAPPmedia */
import "isomorphic-fetch";
import "abort-controller/polyfill"

import { AbstractService } from "./AbstractService";

export interface WithTimeout {
    /**
     * Timeout in milliseconds
     */
    timeout?: number;
}

export class TimeoutError extends Error {

    public constructor(message: string) {
        super(message);
        this.name = "TimeoutError";
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Abstract service for services that primarily rely on the fetch API.
 *
 * It includes built-in timeout feature to better keep track of external APIs.
 *
 * @export
 * @abstract
 * @class FetchService
 * @extends {AbstractService}
 */
export abstract class FetchService extends AbstractService {
    /**
     * Wrapper around fetch to add some basic diagnostics
     *
     * Will throw a TimeoutError if the timeout is reached.
     */
    protected fetch(url: string, options?: RequestInit & WithTimeout): Promise<Response> {
        let start: number;
        try {
            // performance doesn't exist until node 16
            start = performance.now()
        } catch { /* Empty as we don't care if it fails, it is just for diagnostics */ }

        const controller = new AbortController()

        if (options) {
            if (!options.signal) {
                options.signal = controller.signal;
            }
        } else {
            options = {
                signal: controller.signal
            }
        }

        const timeoutInMS: number = options?.timeout || this.timeout;

        const timeout = setTimeout(() => {
            controller.abort()
        }, timeoutInMS);

        return fetch(url, options).then(response => {
            try {
                const end = performance.now();
                if (this.logs) {
                    console.info(`Resource took ${url} ${end - start} ms to receive`);
                }
            } catch { /* We don't care if it fails, it is only for diagnostics */ }

            return response;
        }).catch((error: Error) => {

            if (error.name === "AbortError") {
                throw new TimeoutError(`Timeout of ${this.timeout} ms reached.`);
            }

            throw error;
        }).finally(() => {
            clearTimeout(timeout)
        });
    }
}
