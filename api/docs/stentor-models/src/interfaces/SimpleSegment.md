[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / SimpleSegment

# Interface: SimpleSegment

Defined in: [packages/stentor-models/src/Response/ResponseSegment.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/ResponseSegment.ts#L12)

Simple segment, just the segment that will replace the template.

## Extends

- `Partial`\<[`Conditioned`](Conditioned.md)\>

## Properties

### conditions?

> `optional` **conditions**: `string` \| [`Conditions`](Conditions.md)

Defined in: [packages/stentor-models/src/Conditional.ts:73](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Conditional.ts#L73)

Conditions to be met.

Can either be a Conditions object or a string such as "foo('bar') || false"

#### Inherited from

[`Conditioned`](Conditioned.md).[`conditions`](Conditioned.md#conditions)

***

### segment

> **segment**: `string` \| [`ResponseOutput`](ResponseOutput.md)

Defined in: [packages/stentor-models/src/Response/ResponseSegment.ts:19](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/ResponseSegment.ts#L19)

The segment replaces the template in the templated string.

In the string "${GREETING}, how are you?", the segment will
replace ${GREETING}.
