/*! Copyright (c) 2025, XAPP AI */
/**
 * Convert duration + format into milliseconds
 */
import { DurationFormat } from "stentor-models";

export const SUPPORTED_DURATION_FORMATS: DurationFormat[] = [
  "milliseconds",
  "seconds",
  "minutes",
  "hours",
  "days",
  "weeks",
  "months",
  "years",
];

function isValidAmount(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value) && value >= 0;
}

/**
 * Converts a duration and format into milliseconds.
 *
 * @param amount - The amount of time
 * @param format - The format of the time (e.g., "minutes", "hours")
 * @returns The duration in milliseconds
 */
export function getDurationMs(amount: number, format: DurationFormat): number {
  if (!isValidAmount(amount)) {
    throw new Error(`Invalid duration amount: ${amount}`);
  }

  switch (format) {
    case "millisecond":
    case "milliseconds":
    case "ms":
      return amount;
    case "second":
    case "seconds":
    case "s":
      return amount * 1_000;
    case "minute":
    case "minutes":
    case "m":
      return amount * 60_000;
    case "hour":
    case "hours":
    case "h":
      return amount * 3_600_000;
    case "day":
    case "days":
    case "d":
      return amount * 86_400_000;
    case "week":
    case "weeks":
    case "w":
      return amount * 604_800_000;
    case "month":
    case "months":
    case "M":
      return amount * 2_592_000_000;
    case "quarter":
    case "quarters":
    case "Q":
      return amount * 7_776_000_000;
    case "year":
    case "years":
    case "y":
      return amount * 31_536_000_000;
    default:
      throw new Error(`Unsupported duration format: ${format}`);
  }
}
