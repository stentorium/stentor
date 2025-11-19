[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / removeItems

# Function: removeItems()

> **removeItems**(`obj`, `attrs`): `any`

Defined in: [packages/stentor-utils/src/object/index.ts:18](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/object/index.ts#L18)

A function that's the opposite of "subset" in which it will remove the attributes that are given in the function.

The original object is not affected.

## Parameters

### obj

`any`

Object to remove the items from.

### attrs

The attribute keys to remove from the object. It can be strings for generic javascript objects or
     numbers for arrays.
     It can also be a function that returns a boolean where "true" means to keep and "false" means to remove.
     In the case for functions, the first parameters will be the "key" of the object (string for objects and numbers for arrays.).

(`string` \| `number`)[] | [`ValidateKeyCallback`](../type-aliases/ValidateKeyCallback.md)

## Returns

`any`
