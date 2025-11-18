[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / KnowledgeBaseResult

# Interface: KnowledgeBaseResult

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:162

## Properties

### suggested?

> `optional` **suggested**: [`KnowledgeBaseSuggested`](KnowledgeBaseSuggested.md)[]

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:168

A list of ML powered answer found in specific documents.

This corresponds with results such as the Kendra Suggested answer.  They use some ML model to attempt to pinpoint exactly within

***

### faqs?

> `optional` **faqs**: [`KnowledgeBaseFAQ`](KnowledgeBaseFAQ.md)[]

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:174

List of FAQs that could match the query.

The source of these answers are from a database of existing FAQs.

***

### documents?

> `optional` **documents**: [`KnowledgeBaseDocument`](KnowledgeBaseDocument.md)[]

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:180

A list of results based on perceived relevance.

The source of this is a set corpus

***

### generated?

> `optional` **generated**: [`KnowledgeBaseGenerated`](KnowledgeBaseGenerated.md)[]

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:184

A list of generated answers from a large language model.
