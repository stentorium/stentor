/*! Copyright (c) 2019, XAPPmedia */

import { maskEmails, maskPhoneNumbers } from "stentor-utils";
import chalk = require("chalk");
import { TransformableInfo } from "logform";
import { createLogger, format, transports } from "winston";

export interface LoggerMethod {
    (message: string, ...meta: any[]): Logger;
    (infoObject: object): Logger;
}

export interface Logger {
    debug: LoggerMethod;
    info: LoggerMethod;
    warn: LoggerMethod;
    error: LoggerMethod;
}

// Shared Global instance.
let LOGGER: Logger;

/**
 * Custom Winston transformer for redacting PII.
 */
export function redact(info: TransformableInfo): TransformableInfo {
    // fast pass through check
    if (process.env.OVAI_LOG_PII === "true") {
        console.warn('OVAI_LOG_PII is now deprecated, please update to use STENTOR_LOG_PII instead.')
        return info;
    }

    if (process.env.STENTOR_LOG_PII === "true") {
        return info;
    }
    let message = info.message;
    if (typeof message === "string") {
        let partial = process.env.OVAI_LOG_PII_MASK_PARTIAL === "true";
        if (partial) {
            console.warn(`OVAI_LOG_PII_MASK_PARTIAL is now deprecated, please update to use STENTOR_LOG_PII_MASK_PARTIAL instead.`)
        }
        // Override the deprecated one if the real one exists.
        if (process.env.STENTOR_LOG_PII_MASK_PARTIAL) {
            partial = process.env.STENTOR_LOG_PII_MASK_PARTIAL === "true";
        }
        message = maskEmails(message, partial);
        message = maskPhoneNumbers(message, partial);
    } else if (typeof message === "object") {
        let asString = JSON.stringify(info.message);
        asString = maskEmails(asString);
        asString = maskPhoneNumbers(asString);
        try {
            message = JSON.parse(asString);
        } catch (e) {
            // Failed to redact successfully.
            message = info.message;
            // Setup an error message;
            const error = `PII redaction failed, entire log redacted.`;
            if (process.env.STENTOR_LOG_PII_ERRORS === "true") {
                (message as any).___error___ = `PII redaction failed: ${asString}`;
            } else if (process.env.OVAI_LOG_PII_ERRORS === "true") {
                console.warn(`OVAI_LOG_PII_ERRORS is now deprecated, please update to STENTOR_LOG_PII_ERRORS.`);
                (message as any).___error___ = `PII redaction failed: ${asString}`;
            } else {
                message = error;
            }
        }
    }
    info.message = message;
    return info;
}

/**
 * Get an instance of the shared logger.
 *
 * @export
 * @returns {Logger}
 */
export function log(): Logger {
    if (!LOGGER) {
        const level = process.env.STENTOR_LOG_LEVEL || process.env.OVAI_LOG_LEVEL || "error";

        LOGGER = createLogger({
            format: format.combine(
                format(redact)(),
                format.prettyPrint(),
                format.splat(),
                format.timestamp(),
                format.printf(info => {
                    if (info.message && info.message.constructor === Object) {
                        info.message = JSON.stringify(info.message, undefined, 2);
                    }

                    let lead: string;
                    switch (info.level) {
                        case "debug":
                            lead = chalk.blue("debug");
                            break;
                        case "info":
                            lead = chalk.green("info");
                            break;
                        case "warn":
                            lead = chalk.yellow("warn");
                            break;
                        case "error":
                            lead = chalk.red("error");
                            break;
                        default:
                            lead = "📣";
                    }

                    return `${lead}:${info.message}`;
                })
            ),
            transports: [
                new transports.Console({
                    level
                })
            ]
        });
    }
    return LOGGER;
}

/**
 * Set a new logger.
 *
 * If you pass in undefined, it will create a new default
 * logger the next time log() is called.
 *
 * @export
 * @param {Logger} logger
 */
export function set(logger: Logger): void {
    LOGGER = logger;
}
