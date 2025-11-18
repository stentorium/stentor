[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-service-studio/src](../README.md) / StudioService

# Class: StudioService

Defined in: [packages/stentor-service-studio/src/StudioService.ts:46](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-studio/src/StudioService.ts#L46)

## Implements

- `HandlerService`
- `KnowledgeBaseService`

## Constructors

### Constructor

> **new StudioService**(`props?`): `StudioService`

Defined in: [packages/stentor-service-studio/src/StudioService.ts:53](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-studio/src/StudioService.ts#L53)

#### Parameters

##### props?

[`StudioServiceProps`](../interfaces/StudioServiceProps.md)

#### Returns

`StudioService`

## Methods

### getAll()

> **getAll**(): `Promise`\<[`Handler`](../../../stentor/src/interfaces/Handler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>[]\>

Defined in: [packages/stentor-service-studio/src/StudioService.ts:92](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-studio/src/StudioService.ts#L92)

#### Returns

`Promise`\<[`Handler`](../../../stentor/src/interfaces/Handler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>[]\>

***

### get()

> **get**(`id`): `Promise`\<`undefined`\> \| `Promise`\<[`Handler`](../../../stentor/src/interfaces/Handler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>\>

Defined in: [packages/stentor-service-studio/src/StudioService.ts:117](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-studio/src/StudioService.ts#L117)

Get the handler by ID.

#### Parameters

##### id

`string` | \{ `intentId`: `string`; \}

#### Returns

`Promise`\<`undefined`\> \| `Promise`\<[`Handler`](../../../stentor/src/interfaces/Handler.md)\<[`Content`](../../../stentor/src/interfaces/Content.md), [`Data`](../../../stentor/src/interfaces/Data.md), [`Forward`](../../../stentor/src/interfaces/Forward.md), [`Redirect`](../../../stentor/src/interfaces/Redirect.md)\>\>

#### Implementation of

`HandlerService.get`

***

### query()

> **query**(`query`, `options?`): `Promise`\<[`KnowledgeBaseResult`](../../../stentor/src/interfaces/KnowledgeBaseResult.md)\>

Defined in: [packages/stentor-service-studio/src/StudioService.ts:162](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-studio/src/StudioService.ts#L162)

Queries both /cms/search & /cms/faq/query to return KnowledgeBaseResult.

#### Parameters

##### query

`string`

##### options?

###### controller?

`AbortController`

###### filters?

\{\[`key`: `string`\]: `string`; \}

#### Returns

`Promise`\<[`KnowledgeBaseResult`](../../../stentor/src/interfaces/KnowledgeBaseResult.md)\>

#### Implementation of

`KnowledgeBaseService.query`

***

### search()

> **search**(`query`, `options?`): `Promise`\<`Pick`\<[`KnowledgeBaseResult`](../../../stentor/src/interfaces/KnowledgeBaseResult.md), `"documents"` \| `"suggested"`\>\>

Defined in: [packages/stentor-service-studio/src/StudioService.ts:202](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-studio/src/StudioService.ts#L202)

Search a knowledge base.

Calls /cms/search endpoint.

#### Parameters

##### query

`string`

The query to search

##### options?

###### controller?

`AbortController`

###### filters?

\{\[`key`: `string`\]: `string`; \}

#### Returns

`Promise`\<`Pick`\<[`KnowledgeBaseResult`](../../../stentor/src/interfaces/KnowledgeBaseResult.md), `"documents"` \| `"suggested"`\>\>

***

### faq()

> **faq**(`query`, `options?`): `Promise`\<`KnowledgeBaseFAQResult`\>

Defined in: [packages/stentor-service-studio/src/StudioService.ts:261](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-studio/src/StudioService.ts#L261)

Find a FAQ match based on the query.

The results are already sorted by relevancy.

#### Parameters

##### query

`string`

##### options?

###### controller?

`AbortController`

#### Returns

`Promise`\<`KnowledgeBaseFAQResult`\>

#### Implementation of

`KnowledgeBaseService.faq`

***

### rag()

> **rag**(`query`, `options`): `Promise`\<[`KnowledgeBaseGenerated`](../../../stentor/src/interfaces/KnowledgeBaseGenerated.md)\>

Defined in: [packages/stentor-service-studio/src/StudioService.ts:340](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-studio/src/StudioService.ts#L340)

**`Beta`**

Retrieval Augmented Generation Response

#### Parameters

##### query

`string`

##### options

###### temperature?

`number`

###### api?

`"retrieve"` \| `"query"`

###### controller?

`AbortController`

###### filters?

\{\[`key`: `string`\]: `string`; \}

#### Returns

`Promise`\<[`KnowledgeBaseGenerated`](../../../stentor/src/interfaces/KnowledgeBaseGenerated.md)\>

#### Implementation of

`KnowledgeBaseService.rag`

***

### putEvents()

> **putEvents**(`events`): `Promise`\<`void`\>

Defined in: [packages/stentor-service-studio/src/StudioService.ts:407](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-studio/src/StudioService.ts#L407)

#### Parameters

##### events

`Event`\<`any`\>[]

#### Returns

`Promise`\<`void`\>
