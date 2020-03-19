

/**
 * Type guard to determine if the Response is a SchedulableResponse
 *
 * @export
 * @param {Response} response
 * @returns {response is SchedulableResponse}
 */
export function isSchedulableResponse(response: Response): response is SchedulableResponse {
    return !!response && isScheduled(response);
}
