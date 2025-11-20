/*! Copyright (c) 2019, XAPPmedia */

/**
 * Safely closes an Elasticsearch client with proper error handling
 * 
 * This utility provides a defensive approach to closing ES clients
 * to prevent "Cannot read properties of undefined (reading 'close')" errors.
 */

export interface ElasticsearchClient {
    close?: () => Promise<void> | void;
}

/**
 * Safely closes an Elasticsearch client connection with proper null/undefined checks
 * 
 * @param client - The Elasticsearch client instance that may be undefined
 * @param logger - Optional logger for error reporting
 * @returns Promise that resolves when client is closed or immediately if client is invalid
 */
export async function safeCloseESClient(
    client: ElasticsearchClient | undefined | null,
    logger?: { error: (message: string, error?: Error) => void }
): Promise<void> {
    try {
        // Check if client exists and has a close method
        if (!client || typeof client.close !== 'function') {
            return;
        }

        // Attempt to close the client
        const closeResult = client.close();
        
        // Handle both sync and async close methods
        if (closeResult && typeof closeResult.then === 'function') {
            await closeResult;
        }
    } catch (error) {
        const errorMessage = `Error closing ES client: ${error instanceof Error ? error.message : String(error)}`;
        
        if (logger) {
            logger.error(errorMessage, error instanceof Error ? error : new Error(String(error)));
        } else {
            // Fallback to console.error if no logger provided
            console.error(errorMessage, error);
        }
        
        // Don't re-throw the error to prevent crashing the application
        // The client may already be closed or in an invalid state
    }
}

/**
 * Creates a wrapper around ES client initialization to ensure safe cleanup
 * 
 * @param createClient - Function that creates the ES client
 * @param logger - Optional logger for error reporting
 * @returns Object with client and safe close method
 */
export function createSafeESClient<T extends ElasticsearchClient>(
    createClient: () => T,
    logger?: { error: (message: string, error?: Error) => void }
): {
    client: T;
    safeClose: () => Promise<void>;
} {
    const client = createClient();
    
    return {
        client,
        safeClose: () => safeCloseESClient(client, logger)
    };
}

/**
 * ES client connection guard to check if client is properly initialized
 */
export function isValidESClient(client: any): client is ElasticsearchClient {
    return client && typeof client === 'object' && typeof client.close === 'function';
}