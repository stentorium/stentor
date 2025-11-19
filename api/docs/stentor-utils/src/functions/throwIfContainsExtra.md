[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / throwIfContainsExtra

# Function: throwIfContainsExtra()

> **throwIfContainsExtra**(`obj`, `restrictAttrs`, `undefinedPermitted?`, `onError?`): `void`

Defined in: [packages/stentor-utils/src/object/index.ts:171](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/object/index.ts#L171)

A validation function that can check an object contains properties that should not exist in the object.

## Parameters

### obj

`object`

The object to check.

### restrictAttrs

`string`[]

The attributes to restrict to the object to.  Will not check if empty.

### undefinedPermitted?

`boolean`

Set to true if the object is allowed to be undefined.  Default is false in which case an error will be thrown.

### onError?

[`ValidationErrorHandler`](../type-aliases/ValidationErrorHandler.md) = `defaultValidationErrorHandler`

An optional error handler that allows for custom messages or actions.  The keys passed in will be the keys that were not allowed in the object but were.

## Returns

`void`
