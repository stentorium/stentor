/*! Copyright (c) 2019, XAPPmedia */
/**
 * These were all pulled from a sample query to the API (https://goo.gl/jdD9gp)
 */

/**
 * description of a single component of an address (City, County, State/Province, Country, etc.)
 */
export interface GoogleMapsAddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}

/**
 * A single point on a Google Map
 */
export interface GoogleMapsLocation {
    lat: number;
    lng: number;
}

/**
 * Represents the bounding area around a given location
 */
export interface GoogleMapsLocationBox {
    northeast: GoogleMapsLocation;
    southwest: GoogleMapsLocation;
}

/**
 * Single entry of the results array
 */
export interface GoogleMapsResult {
    address_components: GoogleMapsAddressComponent[];
    formatted_address: string;
    geometry: {
        bounds: GoogleMapsLocationBox;
        location: GoogleMapsLocation;
        location_type: string;
        viewport: GoogleMapsLocationBox;
    };
    place_id: string;
    types: string[];
}

/**
 * Represents a single response from the geocode api in JSON format
 * e.g. https://maps.googleapis.com/maps/api/geocode/json?&address=Portland
 */
export interface GoogleMapsGeocodeResponse {
    results: GoogleMapsResult[];
    status: string;
}
