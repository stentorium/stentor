[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / Response

# Type Alias: Response\<T\>

> **Response**\<`T`\> = `JSONDependableResponse`\<`T`\> \| `LastActiveResponse`\<`T`\> \| `RequestDependentResponse`\<`T`\> \| `SchedulableResponse`\<`T`\> \| `SimpleResponse`\<`T`\> \| `SlotDependentResponse`\<`T`\> \| `StorageDependentResponse`\<`T`\> \| `SystemDependentResponse`\<`T`\>

Defined in: packages/stentor-models/lib/Response/Response.d.ts:167

A response is a possible response back to a user; it includes a prompt, reprompt, and visual
assets.

## Type Parameters

### T

`T` = `string` \| [`ResponseOutput`](../interfaces/ResponseOutput.md)
