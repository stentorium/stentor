[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / ResponseSegmentsMap

# Interface: ResponseSegmentsMap

Defined in: [packages/stentor-models/src/Response/ResponseSegment.ts:64](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/ResponseSegment.ts#L64)

Map of response segments where the key is name within the template.

For example a string with ${ GREETING }, GREETING is the key for the
array of segments.

## Indexable

\[`key`: `string`\]: [`ResponseSegment`](../type-aliases/ResponseSegment.md)[]
