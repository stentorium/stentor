[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-request/src](../README.md) / findRequestDependentMatch

# Function: findRequestDependentMatch()

> **findRequestDependentMatch**\<`T`\>(`potentials`, `request`): `RequestDependable`\<`T`\>

Defined in: [packages/stentor-request/src/findRequestDependentMatch.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-request/src/findRequestDependentMatch.ts#L13)

Based on the provided request, it finds a request dependent match or undefined if no match is found.

## Type Parameters

### T

`T` *extends* `object`

## Parameters

### potentials

(`T` \| `RequestDependable`\<`T`\>)[]

### request

[`Request`](../../../stentor/src/type-aliases/Request.md)

## Returns

`RequestDependable`\<`T`\>
