[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / FuzzyMatchOptions

# Interface: FuzzyMatchOptions

Defined in: [packages/stentor-utils/src/matcher.ts:92](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/matcher.ts#L92)

## Properties

### keys?

> `optional` **keys**: `string`[]

Defined in: [packages/stentor-utils/src/matcher.ts:96](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/matcher.ts#L96)

If you pass in an array of objects, match within the provided keys.

***

### minMatchCharLength?

> `optional` **minMatchCharLength**: `number`

Defined in: [packages/stentor-utils/src/matcher.ts:102](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/matcher.ts#L102)

Only match to those with length that exceeds this value.

https://fusejs.io/api/options.html#minmatchcharlength

***

### isCaseSensitive?

> `optional` **isCaseSensitive**: `boolean`

Defined in: [packages/stentor-utils/src/matcher.ts:108](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/matcher.ts#L108)

Should comparisons be case sensitive.

https://fusejs.io/api/options.html#iscasesensitive

***

### threshold?

> `optional` **threshold**: `number`

Defined in: [packages/stentor-utils/src/matcher.ts:114](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/matcher.ts#L114)

At which point the results are ignored, a number between 0.0 and 1.0.  0.0 is a perfect match

https://fusejs.io/api/options.html#threshold
