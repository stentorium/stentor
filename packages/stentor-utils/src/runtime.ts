/*! Copyright (c) 2022, XAPP AI */

/**
 * Check if you are running on AWS Lambda environment.
 * 
 * @returns true if running on Lambda
 */
export function isLambda(): boolean {
    return !!process.env.LAMBDA_TASK_ROOT;
}