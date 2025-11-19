[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / throwIfDoesContain

# Function: throwIfDoesContain()

> **throwIfDoesContain**(`obj`, `bannedAttrs`, `onError`): `void`

Defined in: [packages/stentor-utils/src/object/index.ts:106](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/object/index.ts#L106)

A validation function that can check if an object contains an attribute that is should not have.

## Parameters

### obj

`object`

The object to check.

### bannedAttrs

`string`[]

### onError

[`ValidationErrorHandler`](../type-aliases/ValidationErrorHandler.md) = `defaultValidationErrorHandler`

An optional error handler that allows for custom messages or actions.  The keys passed in will be the keys that are banned which are contained in the item.

## Returns

`void`
