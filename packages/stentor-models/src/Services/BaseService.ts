/*! Copyright (c) 2023, XAPP AI */

export interface BaseService {
    /**
     * Service name
     */
    name?: string;
    /**
     * Timeout
     */
    timeout?: number;
    /**
     * How many attempts to make on the API
     */
    retryAttempts?: number;
    /**
     * Log information from the service
     */
    logs?: boolean;
}