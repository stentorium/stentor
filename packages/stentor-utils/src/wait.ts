/*! Copyright (c) 2022, XAPP AI */

/**
 * Wait for the provided milliseconds
 * 
 * @param milliseconds 
 * @returns 
 */
export function wait(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}