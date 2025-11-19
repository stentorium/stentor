[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / KnowledgeBaseResult

# Interface: KnowledgeBaseResult

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:163](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L163)

## Properties

### suggested?

> `optional` **suggested**: [`KnowledgeBaseSuggested`](KnowledgeBaseSuggested.md)[]

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:169](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L169)

A list of ML powered answer found in specific documents.

This corresponds with results such as the Kendra Suggested answer.  They use some ML model to attempt to pinpoint exactly within

***

### faqs?

> `optional` **faqs**: [`KnowledgeBaseFAQ`](KnowledgeBaseFAQ.md)[]

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:175](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L175)

List of FAQs that could match the query.

The source of these answers are from a database of existing FAQs.

***

### documents?

> `optional` **documents**: [`KnowledgeBaseDocument`](KnowledgeBaseDocument.md)[]

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:181](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L181)

A list of results based on perceived relevance.

The source of this is a set corpus

***

### generated?

> `optional` **generated**: [`KnowledgeBaseGenerated`](KnowledgeBaseGenerated.md)[]

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:185](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L185)

A list of generated answers from a large language model.
