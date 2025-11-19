[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-response/src](../README.md) / executeTemplate

# Function: executeTemplate()

> **executeTemplate**\<`T`\>(`templatedResponse`): `Promise`\<[`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md)\>

Defined in: [packages/stentor-response/src/TemplatedResponseOutput.ts:38](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-response/src/TemplatedResponseOutput.ts#L38)

Convert the template to an actual response.

Throws an error if it can't find a match in the provided data so wrap this in
a try { } catch { } and plan on having a fallback response.

This function leverages _.template, see https://lodash.com/docs/#template

## Type Parameters

### T

`T` *extends* `object`

## Parameters

### templatedResponse

[`TemplatedResponseOutput`](../interfaces/TemplatedResponseOutput.md)\<`T`\>

## Returns

`Promise`\<[`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md)\>
