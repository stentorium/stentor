/*! Copyright (c) 2019, XAPPmedia */

import { safeStringify, safeEventLog } from "./logging";

/**
 * DynamoDB event types
 */
export interface DynamoEvent {
    eventType: "MODIFY" | "INSERT" | "REMOVE";
    eventName: string;
    properties?: {
        type: string;
        newApp?: any;
        oldApp?: any;
        [key: string]: any;
    };
    [key: string]: any;
}

/**
 * Safely logs DynamoDB events, specifically handling large app objects
 * that may contain long URLs or large data structures that could cause
 * log truncation issues.
 * 
 * @param event - DynamoDB event to log
 */
export function logDynamoEvent(event: DynamoEvent): void {
    try {
        // Create a safe copy of the event for logging
        const safeEvent: any = {
            eventType: event.eventType,
            eventName: event.eventName,
            timestamp: new Date().toISOString()
        };

        if (event.properties) {
            safeEvent.properties = {
                type: event.properties.type
            };

            // Handle newApp separately to prevent large object issues
            if (event.properties.newApp) {
                safeEvent.properties.newApp = sanitizeAppObject(event.properties.newApp);
            }

            // Handle oldApp separately to prevent large object issues  
            if (event.properties.oldApp) {
                safeEvent.properties.oldApp = sanitizeAppObject(event.properties.oldApp);
            }

            // Copy other properties safely
            Object.keys(event.properties).forEach(key => {
                if (key !== "newApp" && key !== "oldApp" && key !== "type") {
                    const value = event.properties![key];
                    if (typeof value === "string" && value.length > 500) {
                        safeEvent.properties[key] = value.slice(0, 500) + "...[truncated]";
                    } else {
                        safeEvent.properties[key] = value;
                    }
                }
            });
        }

        // Copy other root properties safely
        Object.keys(event).forEach(key => {
            if (key !== "eventType" && key !== "eventName" && key !== "properties") {
                safeEvent[key] = event[key];
            }
        });

        safeEventLog("DynamoDB Event:", safeEvent, "log");

    } catch (error) {
        // Fallback logging if something goes wrong
        safeEventLog("DynamoDB Event (Error in logging):", {
            eventType: event.eventType || "unknown",
            eventName: event.eventName || "unknown",
            error: error.message,
            timestamp: new Date().toISOString()
        }, "error");
    }
}

/**
 * Sanitizes app objects to prevent logging issues with large data
 * 
 * @param app - App object to sanitize
 * @returns Sanitized app object safe for logging
 */
function sanitizeAppObject(app: any): any {
    if (!app || typeof app !== "object") {
        return app;
    }

    const sanitized: any = {};

    // Always include basic identifying fields
    if (app.appId) sanitized.appId = app.appId;
    if (app.templateType) sanitized.templateType = app.templateType;
    if (app.name) sanitized.name = app.name;

    // Handle arrays safely
    if (app.examplePhrases) {
        if (Array.isArray(app.examplePhrases)) {
            sanitized.examplePhrases = app.examplePhrases.length > 10 
                ? [...app.examplePhrases.slice(0, 10), `...[${app.examplePhrases.length - 10} more]`]
                : app.examplePhrases;
        } else {
            sanitized.examplePhrases = app.examplePhrases;
        }
    }

    if (app.keywords) {
        if (Array.isArray(app.keywords)) {
            sanitized.keywords = app.keywords.length > 20
                ? [...app.keywords.slice(0, 20), `...[${app.keywords.length - 20} more]`]
                : app.keywords;
        } else {
            sanitized.keywords = app.keywords;
        }
    }

    // Handle URL fields that might be very long
    if (app.icon) {
        if (typeof app.icon === "string") {
            sanitized.icon = app.icon.length > 200 
                ? app.icon.slice(0, 200) + "...[URL truncated]"
                : app.icon;
        } else {
            sanitized.icon = app.icon;
        }
    }

    // Include other boolean/simple fields
    const simpleFields = ["stentor:search:needsReIndex"];
    simpleFields.forEach(field => {
        if (field in app) {
            sanitized[field] = app[field];
        }
    });

    // Count total fields for debugging
    const totalFields = Object.keys(app).length;
    const includedFields = Object.keys(sanitized).length;
    
    if (totalFields > includedFields) {
        sanitized._truncationInfo = {
            totalFields,
            includedFields,
            omittedFields: totalFields - includedFields
        };
    }

    return sanitized;
}

/**
 * Creates a Lambda event handler wrapper that safely logs DynamoDB events
 * and handles errors gracefully.
 * 
 * @param handler - Original Lambda handler function
 * @returns Wrapped handler with safe DynamoDB event logging
 */
export function withSafeDynamoEventLogging<T = any>(
    handler: (event: T, context?: any, callback?: any) => Promise<any> | any
): (event: T, context?: any, callback?: any) => Promise<any> {
    return async (event: T, context?: any, callback?: any): Promise<any> => {
        try {
            // Check if this looks like a DynamoDB event
            if (isDynamoEvent(event)) {
                logDynamoEvent(event as any);
            }

            // Call the original handler
            return await handler(event, context, callback);
            
        } catch (error) {
            // Log the error safely
            safeEventLog("Lambda Error:", {
                error: error.message,
                stack: error.stack,
                event: isDynamoEvent(event) ? "DynamoDB Event (details logged separately)" : "Unknown event type"
            }, "error");
            
            // Re-throw the error
            throw error;
        }
    };
}

/**
 * Type guard to check if an event looks like a DynamoDB event
 * 
 * @param event - Event to check
 * @returns True if event appears to be a DynamoDB event
 */
function isDynamoEvent(event: any): boolean {
    return event && 
           typeof event === "object" && 
           (event.eventType || event.eventName) &&
           (event.eventName?.includes("dynamo") || 
            event.eventType === "MODIFY" || 
            event.eventType === "INSERT" || 
            event.eventType === "REMOVE");
}