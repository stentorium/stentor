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
    case "milliseconds":
      return amount;
    case "seconds":
      return amount * 1_000;
    case "minutes":
      return amount * 60_000;
    case "hours":
      return amount * 3_600_000;
    case "days":
      return amount * 86_400_000;
    case "weeks":
      return amount * 604_800_000;
    case "months":
      return amount * 2_592_000_000;
    case "years":
      return amount * 31_536_000_000;
    default:
      throw new Error(`Unsupported duration format: ${format}`);
  }
}
