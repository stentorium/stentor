/*! Copyright (c) 2025, XAPP AI */
/**
 * Type definitions for parse-address 1.1.2
 * Project: https://github.com/hassansin/parse-address
 */

declare module "parse-address" {
  export interface ParsedLocation {
    number?: string;
    prefix?: string;
    street?: string;
    type?: string;
    suffix?: string;
    city?: string;
    state?: string;
    zip?: string;
    sec_unit_type?: string;
    sec_unit_num?: string;
  }

  export function parseLocation(address: string): ParsedLocation | null;
}
