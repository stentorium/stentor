[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Contextual

# Interface: Contextual

Defined in: [packages/stentor-models/src/Contextual.ts:27](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Contextual.ts#L27)

Currently not in use, for discussion.

The idea is this would allow us to add an array of contexts and we can `or` or `and` the contexts.
`or` would require one of them to match and `and` would require all to match.

TODO: Remove if never used

## Properties

### context?

> `optional` **context**: `object`

Defined in: [packages/stentor-models/src/Contextual.ts:28](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Contextual.ts#L28)

#### and?

> `optional` **and**: [`Contexts`](../type-aliases/Contexts.md)[]
