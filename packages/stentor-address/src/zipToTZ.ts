/*! Copyright (c) 2025, XAPP AI */
import { zipToTimezone } from "./zipToTZData"; // adjust path as needed

/**
 * Converts a ZIP code that is in the 5-digit format to a timezone string, such as "America/New_York".
 *
 * @param zip
 * @throws Error if the ZIP code is not in the correct format or if the timezone is not found.
 * @returns
 */
export function zipToTz(zip: string): string {
  const cleanZip = zip.replace(/\s/g, "");

  if (!/^\d{5}$/.test(cleanZip)) {
    console.warn(`Invalid ZIP code format: ${zip}`);
  }

  return zipToTimezone[cleanZip];
}
