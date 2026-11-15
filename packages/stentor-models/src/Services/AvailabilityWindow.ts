/*! Copyright (c) 2026, XAPP AI */

/**
 * An arrival window a business offers, as wall-clock times in the business's timezone.
 *
 * Businesses offer wide windows ("8 AM to 12 PM") rather than point slots, so the dispatcher can
 * fit the job in. A point slot is a narrow window.
 */
export interface AvailabilityWindowDefinition {
  /**
   * Start of the window, "HH:mm" 24-hour, business timezone.
   */
  start: string;
  /**
   * End of the window, "HH:mm" 24-hour, business timezone.
   */
  end: string;
  /**
   * Restrict this window to these AvailabilityClass ids. Absent means every class.
   */
  classIds?: string[];
}

/**
 * The windows offered when a business has not set its own: two 4-hour arrival windows.
 */
export const DEFAULT_AVAILABILITY_WINDOWS: readonly Readonly<AvailabilityWindowDefinition>[] = Object.freeze([
  Object.freeze({ start: "08:00", end: "12:00" }),
  Object.freeze({ start: "13:00", end: "17:00" })
]);

/**
 * What backs a window: the business's own offer policy, or a connected calendar.
 */
export type AvailabilityWindowBasis = "policy" | "calendar";

/**
 * "limited" when one booking is left in the window for the class; full windows are not returned.
 */
export type AvailabilityWindowStatus = "open" | "limited";

/**
 * A concrete arrival window on a date, as returned by the Availability API.
 *
 * Every window is a request the business confirms; it is never a guaranteed appointment.
 */
export interface AvailabilityWindow {
  /**
   * ISO 8601 with offset, business timezone.
   */
  start: string;
  /**
   * ISO 8601 with offset, business timezone.
   */
  end: string;
  status: AvailabilityWindowStatus;
  basis: AvailabilityWindowBasis;
  /**
   * The business confirms every booking. Explicit so no consumer presents a window as a guaranteed booking.
   */
  confirmation: "business_confirms";
  /**
   * AvailabilityClass.id the window was computed for.
   */
  classId: string;
  /**
   * Bookings left in the window for the class, when the class is capped.
   */
  remaining?: number;
  /**
   * Booking link that opens the form with this window pre-selected.
   */
  bookingUrl?: string;
}
