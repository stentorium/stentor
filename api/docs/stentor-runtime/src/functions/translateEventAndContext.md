[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-runtime/src](../README.md) / translateEventAndContext

# Function: translateEventAndContext()

> **translateEventAndContext**(`event`, `context`): `object`

Defined in: [packages/stentor-runtime/src/translateEventAndContext.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-runtime/src/translateEventAndContext.ts#L9)

Pick out the data we need to run stentor depending on the environment we run in.
Currently we support AWS default lambda proxy, virtual bst and bst proxy (local debugging).

## Parameters

### event

`any`

### context

`any`

## Returns

`object`

### event

> **event**: `object`

### context

> **context**: [`RuntimeContext`](../../../stentor/src/interfaces/RuntimeContext.md)
