[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / throwIfDoesNotContain

# Function: throwIfDoesNotContain()

> **throwIfDoesNotContain**(`obj`, `requiredAttrs`, `undefinedPermitted?`, `onError?`): `void`

Defined in: [packages/stentor-utils/src/object/index.ts:131](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/object/index.ts#L131)

A validation function that can check if an object contains the required attributes and throws an error if they are not part of it.

## Parameters

### obj

`object`

Object to check

### requiredAttrs

`string`[]

The attributes in the object that are required.

### undefinedPermitted?

`boolean`

True if the object is allowed to be undefined.  Default is false in which case an error will be thrown.

### onError?

[`ValidationErrorHandler`](../type-aliases/ValidationErrorHandler.md) = `defaultValidationErrorHandler`

An optional error handler that allows for custom messages or actions.  The keys passed in will be the keys that were required but are not inside the object.

## Returns

`void`
