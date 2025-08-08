/*! Copyright (c) 2025, XAPP AI */
import { isActiveWithin, isFirstTime, isHaveNotSeenWithin } from "stentor-guards";
import { LastActive } from "stentor-models";
import { getDurationMs } from "stentor-utils";

/**
 * Finds the most relevant contextual match.
 *
 * @param responses
 * @param context
 * @returns
 */
export function findLastActiveMatch<T extends object>(
  responses: (T | LastActive<T>)[],
  context: { lastActiveTimestamp?: number }
): LastActive<T> | undefined {
  if (!Array.isArray(responses) || !context) {
    return undefined;
  }

  const now = Date.now();
  const lastActive = context.lastActiveTimestamp;

  let contextualResponse: LastActive<T>;
  let smallestRangeMs: number;

  for (const response of responses) {
    if (isActiveWithin(response)) {
      const { amount, format } = response.activeWithin;
      const durationMs = getDurationMs(amount, format);
      const rangeStart = now - durationMs;

      if (lastActive !== undefined && lastActive >= rangeStart && lastActive <= now) {
        if (contextualResponse === undefined || durationMs < smallestRangeMs) {
          contextualResponse = response;
          smallestRangeMs = durationMs;
        }
      }
    } else if (isHaveNotSeenWithin(response)) {
      const { amount, format } = response.haveNotSeenWithin;
      const durationMs = getDurationMs(amount, format);
      const rangeStart = now - durationMs;

      if (lastActive !== undefined && (lastActive < rangeStart || lastActive > now)) {
        if (contextualResponse === undefined || durationMs < smallestRangeMs) {
          contextualResponse = response;
          smallestRangeMs = durationMs;
        }
      }
    } else if (isFirstTime(response)) {
      // Only qualifications for a FirstTime response
      // is a nonexistent lastActive, meaning we have never
      // seen them before.
      if (!lastActive) {
        contextualResponse = response;
      }
    }
  }

  return contextualResponse;
}
