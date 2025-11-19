[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / KeyDescription

# Interface: KeyDescription

Defined in: [packages/stentor-utils/src/key/KeyDescription.ts:5](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/key/KeyDescription.ts#L5)

A description of a key for either Content, Forwards, or Redirects

## Properties

### indescribable?

> `optional` **indescribable**: `boolean`

Defined in: [packages/stentor-utils/src/key/KeyDescription.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/key/KeyDescription.ts#L9)

The key cannot be described with the current methods of description.

***

### catchAll?

> `optional` **catchAll**: `boolean`

Defined in: [packages/stentor-utils/src/key/KeyDescription.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/key/KeyDescription.ts#L13)

If true, the key will match for every string

***

### intentId?

> `optional` **intentId**: `string`

Defined in: [packages/stentor-utils/src/key/KeyDescription.ts:17](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/key/KeyDescription.ts#L17)

If intentId exists, it is the only string that will match the key

***

### includedIntentIds?

> `optional` **includedIntentIds**: `string`[]

Defined in: [packages/stentor-utils/src/key/KeyDescription.ts:22](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/key/KeyDescription.ts#L22)

If it exists, it is an array of possible strings that will match
for the key.

***

### excludedIntentIds?

> `optional` **excludedIntentIds**: `string`[]

Defined in: [packages/stentor-utils/src/key/KeyDescription.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/key/KeyDescription.ts#L29)

If it exists, it is an array of possible strings
that will be omitted in the case of a catch all key.

Note, this must be used in conjunction with catchAll = true.
