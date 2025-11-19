[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-address/src](../README.md) / haversineDistanceMiles

# Function: haversineDistanceMiles()

> **haversineDistanceMiles**(`one`, `two`): `number`

Defined in: [packages/stentor-address/src/haversine.ts:31](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-address/src/haversine.ts#L31)

Calculate the Haversine distance between two points on the Earth in miles.

Calls first haversineDistanceKm and uses a conversion rate of 1 km = 0.621371 miles.

## Parameters

### one

The first point with latitude and longitude.

#### lat

`number`

#### lon

`number`

### two

The second point with latitude and longitude.

#### lat

`number`

#### lon

`number`

## Returns

`number`

The distance between the two points in miles.
