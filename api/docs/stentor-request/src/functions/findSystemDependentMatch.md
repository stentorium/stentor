[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-request/src](../README.md) / findSystemDependentMatch

# Function: findSystemDependentMatch()

> **findSystemDependentMatch**\<`T`\>(`objects`, `request`): `SystemDependable`\<`T`\>

Defined in: [packages/stentor-request/src/findSystemDependentMatch.ts:21](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/findSystemDependentMatch.ts#L21)

Based on the provided request, it finds the slot dependent object
that is a match.

## Type Parameters

### T

`T` *extends* `object`

## Parameters

### objects

(`T` \| `SystemDependable`\<`T`\>)[]

Objects to check against the request

### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

Request that the objects will be tested against

## Returns

`SystemDependable`\<`T`\>

The matched object or undefined if no match was found.
