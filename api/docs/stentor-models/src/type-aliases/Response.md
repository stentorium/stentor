[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Response

# Type Alias: Response\<T\>

> **Response**\<`T`\> = [`JSONDependableResponse`](JSONDependableResponse.md)\<`T`\> \| [`LastActiveResponse`](LastActiveResponse.md)\<`T`\> \| [`RequestDependentResponse`](RequestDependentResponse.md)\<`T`\> \| [`SchedulableResponse`](SchedulableResponse.md)\<`T`\> \| [`SimpleResponse`](../interfaces/SimpleResponse.md)\<`T`\> \| [`SlotDependentResponse`](SlotDependentResponse.md)\<`T`\> \| [`StorageDependentResponse`](StorageDependentResponse.md)\<`T`\> \| [`SystemDependentResponse`](SystemDependentResponse.md)\<`T`\>

Defined in: [packages/stentor-models/src/Response/Response.ts:193](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Response.ts#L193)

A response is a possible response back to a user; it includes a prompt, reprompt, and visual
assets.

## Type Parameters

### T

`T` = `string` \| [`ResponseOutput`](../interfaces/ResponseOutput.md)
