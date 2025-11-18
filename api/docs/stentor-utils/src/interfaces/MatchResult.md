[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / MatchResult

# Interface: MatchResult\<T\>

Defined in: [packages/stentor-utils/src/matcher.ts:202](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/matcher.ts#L202)

Results returned by the fuzzy string matcher.

## Extends

- `FuseResult`\<`SlotTypeValue`\<`T`\>\>

## Type Parameters

### T

`T`

## Properties

### item

> **item**: `SlotTypeValue`

Defined in: node\_modules/fuse.js/dist/fuse.d.ts:297

#### Inherited from

`Fuse.FuseResult.item`

***

### refIndex

> **refIndex**: `number`

Defined in: node\_modules/fuse.js/dist/fuse.d.ts:298

#### Inherited from

`Fuse.FuseResult.refIndex`

***

### score?

> `optional` **score**: `number`

Defined in: node\_modules/fuse.js/dist/fuse.d.ts:299

#### Inherited from

`Fuse.FuseResult.score`

***

### matches?

> `optional` **matches**: readonly `FuseResultMatch`[]

Defined in: node\_modules/fuse.js/dist/fuse.d.ts:300

#### Inherited from

`Fuse.FuseResult.matches`
