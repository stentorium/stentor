/*! Copyright (c) 2019, XAPPmedia */
/**
 * The exact coordinates
 */
export interface LocationGeocode {
  latitude?: number;
  longitude?: number;
}

/**
 * Description of a physical location
 */
export interface Location {
  /**
   * The free-form street address, in the format used by the national postal service of the
   * concerned country.  This field can then be used for geocoding with a third-party API, like
   * the Google Maps Geocoding API, to determine latitude and longitude.
   *
   * For example: Washington, DC or 123 Main St, City, State
   */
  streetAddress?: string;
  /**
   * Geocoded form of the location
   */
  geocode?: LocationGeocode;
}
