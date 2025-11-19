[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / AddressAutocompleteParameters

# Interface: AddressAutocompleteParameters

Defined in: [packages/stentor-models/src/Form/FormField.ts:5](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L5)

## Properties

### components?

> `optional` **components**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:11](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L11)

This will look like components=country:us or components=country:us|country:ca

#### See

https://developers.google.com/maps/documentation/places/web-service/autocomplete#components

***

### language?

> `optional` **language**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:15](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L15)

The text string on which to search. The Places service will return candidate matches based on this string and order results based on their perceived relevance.

***

### location?

> `optional` **location**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:21](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L21)

A text that is the lat & long of the location to use as the center of the search.

For example, location=37.76999,-122.44696

***

### locationbias?

> `optional` **locationbias**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:22](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L22)

***

### locationrestriction?

> `optional` **locationrestriction**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:23](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L23)

***

### radius?

> `optional` **radius**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L29)

When using location with a specific lat & long, this must be provided.

This is in meters

***

### key?

> `optional` **key**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:33](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L33)

The API key, only required when using the official Google Maps API.
