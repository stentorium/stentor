[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / NLUService

# Interface: NLUService

Defined in: [packages/stentor-models/src/NLU/NLUService.ts:70](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/NLU/NLUService.ts#L70)

Service which can turn raw text into an intent and slots (optional).

## Methods

### query()

> **query**(`q`, `props?`): `Promise`\<[`NLUQueryResponse`](../type-aliases/NLUQueryResponse.md)\>

Defined in: [packages/stentor-models/src/NLU/NLUService.ts:77](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/NLU/NLUService.ts#L77)

Query the NLU with the user's natural language input.  A resolved intent will be returned from the NLU

#### Parameters

##### q

`string`

Natural language query from the user

##### props?

[`NLURequestProps`](NLURequestProps.md)

#### Returns

`Promise`\<[`NLUQueryResponse`](../type-aliases/NLUQueryResponse.md)\>

***

### setContext()?

> `optional` **setContext**(`props`): `Promise`\<`void`\>

Defined in: [packages/stentor-models/src/NLU/NLUService.ts:85](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/NLU/NLUService.ts#L85)

Used to set context that will be used for the next query of the NLU.

This is used to set active contexts for example, which help prefer certain intents on the next query call.

#### Parameters

##### props

[`NLURequestProps`](NLURequestProps.md)

#### Returns

`Promise`\<`void`\>
