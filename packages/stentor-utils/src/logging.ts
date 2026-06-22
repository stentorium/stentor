/*! Copyright (c) 2019, XAPPmedia */

/**
 * Maximum size for JSON logging before truncation (100KB)
 */
const MAX_LOG_SIZE = 100 * 1024;

/**
 * Maximum string length for individual field values
 */
const MAX_FIELD_LENGTH = 10 * 1024;

/**
 * Safely stringifies an object for logging, handling large objects and circular references.
 * Prevents memory issues and log truncation by limiting object size.
 * 
 * @param obj - Object to stringify
 * @param maxSize - Maximum size of the resulting JSON string (default: 100KB)
 * @returns Safely stringified JSON
 */
export function safeStringify(obj: any, maxSize: number = MAX_LOG_SIZE): string {
    if (obj === null || obj === undefined) {
        return String(obj);
    }

    // Handle primitives
    if (typeof obj !== "object") {
        const str = String(obj);
        return str.length > maxSize ? str.slice(0, maxSize) + "..." : str;
    }

    const seen = new WeakSet();

    const replacer = (key: string, value: any): any => {
        // Handle circular references
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return "[Circular Reference]";
            }
            seen.add(value);
        }

        // Truncate long strings
        if (typeof value === "string" && value.length > MAX_FIELD_LENGTH) {
            return value.slice(0, MAX_FIELD_LENGTH) + `...[truncated ${value.length - MAX_FIELD_LENGTH} chars]`;
        }

        // Handle large arrays
        if (Array.isArray(value) && value.length > 100) {
            return [...value.slice(0, 100), `...[${value.length - 100} more items]`];
        }

        return value;
    };

    try {
        const jsonString = JSON.stringify(obj, replacer, 2);
        
        // Check if result is too large
        if (jsonString.length > maxSize) {
            // Try a more aggressive truncation
            const simpleReplacer = (key: string, value: any): any => {
                if (typeof value === "string") {
                    return value.length > 100 ? value.slice(0, 100) + "..." : value;
                }
                if (Array.isArray(value)) {
                    return value.length > 10 ? [...value.slice(0, 10), "..."] : value;
                }
                return value;
            };

            const truncatedString = JSON.stringify(obj, simpleReplacer);
            if (truncatedString.length > maxSize) {
                return `${truncatedString.slice(0, maxSize)}...[JSON truncated due to size: ${truncatedString.length} chars]`;
            }
            return truncatedString;
        }

        return jsonString;
    } catch (error) {
        return `[JSON stringify error: ${error.message}] ${obj.toString().slice(0, 1000)}`;
    }
}

/**
 * Safely logs an event object, preventing truncation and memory issues
 * 
 * @param prefix - Log prefix (e.g., "Event:", "Error:", etc.)
 * @param obj - Object to log
 * @param level - Log level ("log", "error", "warn", "debug")
 */
export function safeEventLog(prefix: string, obj: any, level: "log" | "error" | "warn" | "debug" = "log"): void {
    const safeJson = safeStringify(obj);
    const logMessage = `${prefix} ${safeJson}`;
    
    // Use appropriate console method
    const consoleMethod = console[level] || console.log;
    consoleMethod(logMessage);
}

/**
 * Enhanced error logging for Lambda functions that handles large payloads
 * 
 * @param error - Error object or message
 * @param context - Additional context (e.g., event data)
 */
export function logLambdaError(error: Error | string, context?: any): void {
    const errorInfo = {
        error: typeof error === "string" ? error : {
            name: error.name,
            message: error.message,
            stack: error.stack
        },
        timestamp: new Date().toISOString(),
        context: context ? safeStringify(context, 50 * 1024) : undefined // Smaller context limit
    };

    safeEventLog("Lambda Error:", errorInfo, "error");
}