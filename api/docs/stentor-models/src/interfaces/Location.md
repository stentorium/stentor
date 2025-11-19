[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Location

# Interface: Location

Defined in: [packages/stentor-models/src/Location/Location.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Location/Location.ts#L13)

Description of a physical location

## Properties

### streetAddress?

> `optional` **streetAddress**: `string`

Defined in: [packages/stentor-models/src/Location/Location.ts:21](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Location/Location.ts#L21)

The free-form street address, in the format used by the national postal service of the
concerned country.  This field can then be used for geocoding with a third-party API, like
the Google Maps Geocoding API, to determine latitude and longitude.

For example: Washington, DC or 123 Main St, City, State

***

### geocode?

> `optional` **geocode**: [`LocationGeocode`](LocationGeocode.md)

Defined in: [packages/stentor-models/src/Location/Location.ts:25](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Location/Location.ts#L25)

Geocoded form of the location
