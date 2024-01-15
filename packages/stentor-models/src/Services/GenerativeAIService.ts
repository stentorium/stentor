/*! Copyright (c) 2023, XAPP AI */

/**
 * Interface for a service that interacts with a generative AI API.
 */
export interface GenerativeAIService {
    /**
     * Sends a request to the generative AI API and returns the response.
     *
     * @param request - The request object containing the input for the generative AI.
     * @returns A promise resolving to the response from the generative AI.
     */
    sendRequest(request: any): Promise<string>;

    /**
     * Processes the response from the generative AI API.
     *
     * @param response - The raw response string from the generative AI.
     * @returns A processed response, which could be a string or any other format depending on the implementation.
     */
    processResponse(response: string): any;
}
