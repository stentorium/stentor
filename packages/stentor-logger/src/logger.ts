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
    console.warn("OVAI_LOG_PII is now deprecated, please update to use STENTOR_LOG_PII instead.");
    return info;
  }

  if (process.env.STENTOR_LOG_PII === "true") {
    return info;
  }

  // Make a copy so we don't modify the original
  const copy: TransformableInfo = { ...info };

  let partial = process.env.OVAI_LOG_PII_MASK_PARTIAL === "true";
  if (partial) {
    console.warn(
      `OVAI_LOG_PII_MASK_PARTIAL is now deprecated, please update to use STENTOR_LOG_PII_MASK_PARTIAL instead.`
    );
  }
  // Override the deprecated one if the real one exists.
  if (process.env.STENTOR_LOG_PII_MASK_PARTIAL) {
    partial = process.env.STENTOR_LOG_PII_MASK_PARTIAL === "true";
  }

  let message: unknown = copy.message;

  if (typeof message === "string") {
    const emailsMasked: string = maskEmails(message, partial);
    message = maskPhoneNumbers(emailsMasked, partial);
  } else if (typeof message === "object") {
    let asString = JSON.stringify(message);
    const emailsMasked = maskEmails(asString, partial);
    asString = maskPhoneNumbers(emailsMasked, partial);
    try {
      message = JSON.parse(asString);
    } catch (e) {
      // Failed to redact successfully.
      message = copy.message;
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
  copy.message = message;
  return copy;
}

function isOnAWSLambda(): boolean {
  return !!process.env.AWS_LAMBDA_FUNCTION_NAME;
}

/**
 * Get an instance of the shared logger.
 *
 * @returns {Logger}
 */
export function log(): Logger {
  if (!LOGGER) {
    const level = process.env.STENTOR_LOG_LEVEL || process.env.OVAI_LOG_LEVEL || "error";

    LOGGER = createLogger({
      format: format.combine(
        format((info: TransformableInfo) => {
          const allowedClass = process.env.STENTOR_LOG_CLASS;
          const infoClass = info.className;

          if (allowedClass && infoClass !== allowedClass) {
            return false; // skip log
          }

          return info;
        })(),
        format(redact)(),
        format.prettyPrint(),
        format.splat(),
        format.timestamp(),
        format.printf((info) => {
          if (info.message && info.message.constructor === Object) {
            // for AWS, if you pretty print then it takes up new lines in CloudWatch, which pollutes
            // your log messages so we check to see if we are in a lambda runtime
            if (isOnAWSLambda()) {
              info.message = JSON.stringify(info.message);
            } else {
              info.message = JSON.stringify(info.message, undefined, 2);
            }
          }

          let lead: string;
          switch (info.level) {
            case "debug":
              lead = chalk.blue("debug");
              break;
            case "info":
              // space here is to help with readability
              lead = chalk.green(" info");
              break;
            case "warn":
              // space here is to help with readability
              lead = chalk.yellow(" warn");
              break;
            case "error":
              lead = chalk.red("error");
              break;
            default:
              lead = "    📣";
          }

          if (isOnAWSLambda()) {
            // CloudWatch automatically includes the timestamp, it isn't needed
            return `${lead}|${info.message}`;
          } else if (typeof info.timestamp === "string") {
            // outside, just print the time mm
            const time = new Date(info.timestamp).toLocaleTimeString([], {
              minute: "2-digit",
              hour: "2-digit",
              second: "2-digit",
              hour12: false,
            });

            return `${lead}|${time}|${info.message}`;
          }
        })
      ),
      transports: [
        new transports.Console({
          level,
        }),
      ],
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
 * @param {Logger} logger
 */
export function set(logger: Logger): void {
  LOGGER = logger;
}

/**
 * Create a class logger that will add the className to the log message.
 *
 * @param {string} className
 * @returns {Logger}
 */
export function classLogger(className: string): Logger {
  const base = log();

  const wrap = (level: keyof Logger): LoggerMethod => {
    return (message: any, ...meta: any[]) => {
      if (typeof message === "object") {
        return base[level]({ ...message, className });
      }
      return base[level](message, ...meta.map((m) => ({ ...m, className })));
    };
  };

  return {
    debug: wrap("debug"),
    info: wrap("info"),
    warn: wrap("warn"),
    error: wrap("error"),
  };
}
