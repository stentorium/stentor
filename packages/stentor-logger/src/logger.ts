/*! Copyright (c) 2019, XAPPmedia */

import { maskEmails, maskPhoneNumbers } from "stentor-utils";
import chalk = require("chalk");

// Winston types - these will be available if Winston is installed
interface WinstonTransformableInfo {
  level: string;
  message: any;
  [key: string]: any;
}

interface WinstonLogger {
  debug: (message: string, ...meta: any[]) => any;
  info: (message: string, ...meta: any[]) => any;
  warn: (message: string, ...meta: any[]) => any;
  error: (message: string, ...meta: any[]) => any;
}

interface WinstonFormat {
  combine: (...formats: any[]) => any;
  prettyPrint: () => any;
  splat: () => any;
  timestamp: () => any;
  printf: (fn: (info: any) => string) => any;
}

interface WinstonTransports {
  Console: new (options: any) => any;
}

interface WinstonModule {
  createLogger: (options: any) => WinstonLogger;
  format: WinstonFormat;
  transports: WinstonTransports;
}

// Try to import Winston dynamically - it might not be available
let winston: WinstonModule | null = null;
let TransformableInfo: any = null;

try {
  winston = require("winston") as WinstonModule;
  const logform = require("logform");
  TransformableInfo = logform.TransformableInfo;
} catch (e) {
  // Winston is not available, will use fallback logger
  winston = null;
  TransformableInfo = null;
}

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
 * Custom transformer for redacting PII.
 * Works with Winston's TransformableInfo or fallback info objects.
 */
export function redact(info: WinstonTransformableInfo): WinstonTransformableInfo {
  // fast pass through check
  if (process.env.OVAI_LOG_PII === "true") {
    console.warn("OVAI_LOG_PII is now deprecated, please update to use STENTOR_LOG_PII instead.");
    return info;
  }

  if (process.env.STENTOR_LOG_PII === "true") {
    return info;
  }

  // Make a copy so we don't modify the original
  const copy: WinstonTransformableInfo = { ...info };

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
 * Creates a fallback console logger when Winston is not available.
 */
function createFallbackLogger(level: string): Logger {
  const shouldLog = (logLevel: string): boolean => {
    const levels: { [key: string]: number } = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3
    };
    return levels[logLevel] <= levels[level];
  };

  const logMethod = (logLevel: string): LoggerMethod => {
    return (message: string | object, ...meta: any[]) => {
      if (!shouldLog(logLevel)) {
        return fallbackLogger;
      }

      // Apply PII redaction
      let processedMessage = message;
      if (typeof message === 'string' || typeof message === 'object') {
        const info = redact({ level: logLevel, message });
        processedMessage = info.message;
      }

      let lead: string;
      switch (logLevel) {
        case "debug":
          lead = chalk.blue("debug");
          break;
        case "info":
          lead = chalk.green(" info");
          break;
        case "warn":
          lead = chalk.yellow(" warn");
          break;
        case "error":
          lead = chalk.red("error");
          break;
        default:
          lead = "    📣";
      }

      let output: string;
      if (typeof processedMessage === "object") {
        const jsonMessage = isOnAWSLambda() 
          ? JSON.stringify(processedMessage) 
          : JSON.stringify(processedMessage, undefined, 2);
        
        if (isOnAWSLambda()) {
          output = `${lead}|${jsonMessage}`;
        } else {
          const time = new Date().toLocaleTimeString([], {
            minute: "2-digit",
            hour: "2-digit",
            second: "2-digit",
            hour12: false,
          });
          output = `${lead}|${time}|${jsonMessage}`;
        }
      } else {
        if (isOnAWSLambda()) {
          output = `${lead}|${processedMessage}`;
        } else {
          const time = new Date().toLocaleTimeString([], {
            minute: "2-digit",
            hour: "2-digit",
            second: "2-digit",
            hour12: false,
          });
          output = `${lead}|${time}|${processedMessage}`;
        }
      }

      console.log(output);
      return fallbackLogger;
    };
  };

  const fallbackLogger: Logger = {
    debug: logMethod("debug"),
    info: logMethod("info"),
    warn: logMethod("warn"),
    error: logMethod("error")
  };

  return fallbackLogger;
}

/**
 * Creates a Winston logger if available, otherwise falls back to console logger.
 */
function createWinstonLogger(level: string): Logger | null {
  if (!winston) {
    return null;
  }

  const winstonLogger = winston.createLogger({
    format: winston.format.combine(
      winston.format((info: any) => {
        const allowedClass = process.env.STENTOR_LOG_CLASS;
        const infoClass = info.className;

        if (allowedClass && infoClass !== allowedClass) {
          return false; // skip log
        }

        return info;
      })(),
      winston.format(redact)(),
      winston.format.prettyPrint(),
      winston.format.splat(),
      winston.format.timestamp(),
      winston.format.printf((info: any) => {
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
      new winston.transports.Console({
        level,
      }),
    ],
  });

  return winstonLogger as Logger;
}

/**
 * Get an instance of the shared logger.
 * Uses Winston if available, otherwise falls back to console logger.
 *
 * @returns {Logger}
 */
export function log(): Logger {
  if (!LOGGER) {
    const level = process.env.STENTOR_LOG_LEVEL || process.env.OVAI_LOG_LEVEL || "error";
    
    // Try to create Winston logger first
    LOGGER = createWinstonLogger(level);
    
    // If Winston is not available, use fallback logger
    if (!LOGGER) {
      LOGGER = createFallbackLogger(level);
    }
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
export function set(logger: Logger | undefined): void {
  LOGGER = logger!;
}

/**
 * Register a Winston logger instance for use by stentor-logger.
 * This allows implementors to provide their own Winston configuration
 * without stentor-logger having Winston as a required dependency.
 *
 * @param {any} winstonLogger - A Winston logger instance
 */
export function registerWinstonLogger(winstonLogger: any): void {
  // Ensure the passed object has the required methods
  if (!winstonLogger || 
      typeof winstonLogger.debug !== 'function' ||
      typeof winstonLogger.info !== 'function' ||
      typeof winstonLogger.warn !== 'function' ||
      typeof winstonLogger.error !== 'function') {
    throw new Error('Invalid Winston logger: must have debug, info, warn, and error methods');
  }
  
  LOGGER = winstonLogger as Logger;
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
