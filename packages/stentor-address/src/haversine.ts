/*! Copyright (c) 2025, XAPP AI */

/**
 * Calculate the Haversine distance between two points on the Earth.
 * @param one The first point with latitude and longitude.
 * @param two The second point with latitude and longitude.
 * @returns The distance between the two points in kilometers.
 */
export function haversineDistanceKm(one: { lat: number; lon: number }, two: { lat: number; lon: number }): number {
  const { lat: lat1, lon: lon1 } = one;
  const { lat: lat2, lon: lon2 } = two;

  const R = 6371; // Radius of Earth in km
  const toRad = (x: number): number => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Calculate the Haversine distance between two points on the Earth in miles.
 *
 * Calls first haversineDistanceKm and uses a conversion rate of 1 km = 0.621371 miles.
 *
 * @param one The first point with latitude and longitude.
 * @param two The second point with latitude and longitude.
 * @returns The distance between the two points in miles.
 */
export function haversineDistanceMiles(one: { lat: number; lon: number }, two: { lat: number; lon: number }): number {
  const km = haversineDistanceKm(one, two);
  return km * 0.621371; // convert km to miles
}
