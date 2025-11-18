[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / NLURequestProps

# Interface: NLURequestProps

Defined in: [packages/stentor-models/src/NLU/NLUService.ts:23](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/NLU/NLUService.ts#L23)

## Properties

### locale?

> `optional` **locale**: `string`

Defined in: [packages/stentor-models/src/NLU/NLUService.ts:27](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/NLU/NLUService.ts#L27)

Optional locale to request, defaults to "en"

***

### userId?

> `optional` **userId**: `string`

Defined in: [packages/stentor-models/src/NLU/NLUService.ts:31](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/NLU/NLUService.ts#L31)

Optional userId to pass with the request

***

### sessionId?

> `optional` **sessionId**: `string`

Defined in: [packages/stentor-models/src/NLU/NLUService.ts:35](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/NLU/NLUService.ts#L35)

Optional sessionId to pass with the request

***

### channel?

> `optional` **channel**: `string`

Defined in: [packages/stentor-models/src/NLU/NLUService.ts:39](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/NLU/NLUService.ts#L39)

Optional channel information

***

### platform?

> `optional` **platform**: `string`

Defined in: [packages/stentor-models/src/NLU/NLUService.ts:43](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/NLU/NLUService.ts#L43)

Optional platform information.

***

### activeContext?

> `optional` **activeContext**: [`ActiveContext`](ActiveContext.md)[]

Defined in: [packages/stentor-models/src/NLU/NLUService.ts:48](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/NLU/NLUService.ts#L48)

Optional active context to pass with the request, used to weight 
certain intents.

***

### requestAttributes?

> `optional` **requestAttributes**: `Record`\<`string`, `string`\>

Defined in: [packages/stentor-models/src/NLU/NLUService.ts:52](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/NLU/NLUService.ts#L52)

Optional request attributes.

***

### transcript?

> `optional` **transcript**: [`Message`](Message.md)[]

Defined in: [packages/stentor-models/src/NLU/NLUService.ts:56](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/NLU/NLUService.ts#L56)

Current session transcript

***

### session?

> `optional` **session**: [`SessionStore`](SessionStore.md)

Defined in: [packages/stentor-models/src/NLU/NLUService.ts:60](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/NLU/NLUService.ts#L60)

Optional session store

***

### filters?

> `optional` **filters**: `object`

Defined in: [packages/stentor-models/src/NLU/NLUService.ts:64](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/NLU/NLUService.ts#L64)

Optional filters for knowledge base service calls

#### Index Signature

\[`key`: `string`\]: `string`
