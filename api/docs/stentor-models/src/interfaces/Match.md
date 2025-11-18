[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Match

# Interface: Match

Defined in: [packages/stentor-models/src/Match.ts:16](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Match.ts#L16)

Match is an interface that describes
how to compare two different values.

For example:

value of name is 1
operation is >=
value 4

1 >= 4 is false

## Properties

### name

> **name**: `string`

Defined in: [packages/stentor-models/src/Match.ts:23](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Match.ts#L23)

The name of the key on the object that the value is going to
be compared against.

TODO: Could we call this key instead?

***

### value

> **value**: `string` \| `number` \| `boolean` \| (`string` \| `number` \| `boolean`)[]

Defined in: [packages/stentor-models/src/Match.ts:27](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Match.ts#L27)

The test value that is compared.

***

### operation?

> `optional` **operation**: [`MatchOperation`](../type-aliases/MatchOperation.md)

Defined in: [packages/stentor-models/src/Match.ts:33](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Match.ts#L33)

The comparison operator.

If not provided, it defaults to "==="
