/*! Copyright (c) 2020, XAPPmedia */
import { log } from "stentor-logger";
import { ConditionalCheck, TimeContextual, DurationFormat, Schedulable } from "stentor-models";
import { isTimeContextual } from "stentor-guards";
import { getDurationMs } from "stentor-utils";

import { findTimeContextualMatch } from "./findTimeContextualMatch";
import { findSchedulableMatch } from "./findSchedulableMatch";
import { normalizeLegacyFormat } from "./normalizeLegacyFormat";

/**
 * Depending on the provided last active timestamp and current time, has the user
 * been active within the specified duration.
 *
 * @param context - Contains the last active timestamp
 * @param amount - Duration amount
 * @param format - Format of the duration amount
 */
export function activeWithin(
  context: { lastActiveTimestamp: number | undefined },
  amount: number,
  format: DurationFormat
): boolean {
  const now = Date.now();
  const lastActive = context.lastActiveTimestamp;

  if (typeof amount !== "number" || isNaN(amount) || amount < 0 || typeof format !== "string") {
    log().warn(`Invalid activeWithin params: amount=${amount}, format=${format}`);
    return false;
  }

  let durationMs: number;

  try {
    durationMs = getDurationMs(amount, format);
  } catch (err) {
    log().warn(`activeWithin failed to get durationMs for ${amount} ${format}`, err);
    return false;
  }

  const rangeStart = now - durationMs;

  if (lastActive !== undefined && lastActive >= rangeStart && lastActive <= now) {
    log().debug(`User was active within ${amount} ${format}`);
    return true;
  }

  log().debug(`User was NOT active within ${amount} ${format}`);
  return false;
}

/**
 * Is the current time within the provided schedule.
 *
 * @param start - Start date string
 * @param startFormat - Format of the start date string
 * @param duration - Duration amount
 * @param durationFormat - Format of the duration
 * @param timeZone - Optional time zone
 */
export function fitsSchedule(
  start: string,
  startFormat: string,
  duration: number,
  durationFormat: DurationFormat,
  timeZone?: string
): boolean {
  // Convert legacy Moment.js format to Luxon format
  const normalizedFormat = normalizeLegacyFormat(startFormat);
  
  const schedule: Schedulable = {
    schedule: {
      start: {
        time: start,
        format: normalizedFormat,
        timeZone,
      },
      duration: {
        amount: duration,
        format: durationFormat,
      },
    },
  };

  const fitSchedule = !!findSchedulableMatch([schedule]);

  if (!fitSchedule) {
    log().debug(
      `Schedule starting ${start}, with format ${startFormat} (normalized: ${normalizedFormat}), and running for ${duration} ${durationFormat} did NOT fit. Current date ${new Date().toISOString()}`
    );
  } else {
    log().debug(
      `Schedule starting ${start}, with format ${startFormat} (normalized: ${normalizedFormat}), and running for ${duration} ${durationFormat} fits.`
    );
  }

  return fitSchedule;
}

/**
 * Generate a time-based conditional check for the given context.
 *
 * @param context - Object containing lastActiveTimestamp
 */
export function TimeConditionalCheck<T extends object>(context: { lastActiveTimestamp: number | undefined }): ConditionalCheck {
  return {
    test: isTimeContextual,
    check: (obj: TimeContextual<T>): boolean => {
      return !!findTimeContextualMatch([obj], context);
    },
    functions: [
      (function(): (amount: number, format: DurationFormat) => boolean {
        const fn = (amount: number, format: DurationFormat): boolean => {
          return activeWithin(context, amount, format);
        };
        // Explicitly set the function name to ensure it's preserved
        Object.defineProperty(fn, 'name', { value: 'activeWithin' });
        return fn;
      })(),
      fitsSchedule
    ],
  };
}
