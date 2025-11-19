[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / KnowledgeBaseService

# Interface: KnowledgeBaseService

Defined in: [packages/stentor-models/src/Services/KnowledgeBaseService.ts:14](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/KnowledgeBaseService.ts#L14)

A knowledge base that can be queried

## Methods

### query()

> **query**(`query`, `options?`): `Promise`\<[`KnowledgeBaseResult`](KnowledgeBaseResult.md)\>

Defined in: [packages/stentor-models/src/Services/KnowledgeBaseService.ts:21](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/KnowledgeBaseService.ts#L21)

Query the knowledge base

#### Parameters

##### query

`string`

Query to search within the knowledge base, typically a user's question.

##### options?

###### controller?

`AbortController`

###### filters?

\{\[`key`: `string`\]: `string`; \}

#### Returns

`Promise`\<[`KnowledgeBaseResult`](KnowledgeBaseResult.md)\>

Knowledge Base result with either FAQs, suggested, or documents.

***

### faq()?

> `optional` **faq**(`query`, `options?`): `Promise`\<[`KnowledgeBaseFAQResult`](KnowledgeBaseFAQResult.md)\>

Defined in: [packages/stentor-models/src/Services/KnowledgeBaseService.ts:28](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/KnowledgeBaseService.ts#L28)

Search for matching FAQs

#### Parameters

##### query

`string`

##### options?

###### controller?

`AbortController`

#### Returns

`Promise`\<[`KnowledgeBaseFAQResult`](KnowledgeBaseFAQResult.md)\>

***

### rag()?

> `optional` **rag**(`query`, `options?`): `Promise`\<[`KnowledgeBaseGenerated`](KnowledgeBaseGenerated.md)\>

Defined in: [packages/stentor-models/src/Services/KnowledgeBaseService.ts:35](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/KnowledgeBaseService.ts#L35)

**`Beta`**

Retrieval Augmented Generation Response

#### Parameters

##### query

`string`

##### options?

###### controller?

`AbortController`

###### temperature?

`number`

###### filters?

\{\[`key`: `string`\]: `string`; \}

#### Returns

`Promise`\<[`KnowledgeBaseGenerated`](KnowledgeBaseGenerated.md)\>
