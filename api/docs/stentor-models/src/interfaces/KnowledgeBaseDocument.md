[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / KnowledgeBaseDocument

# Interface: KnowledgeBaseDocument

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:52](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L52)

A single document, typically part of a larger corpus of information 
that is where the answer to the user's original query may reside.

## Extended by

- [`KnowledgeBaseSuggested`](KnowledgeBaseSuggested.md)
- [`KnowledgeBaseGenerated`](KnowledgeBaseGenerated.md)

## Properties

### title?

> `optional` **title**: `string`

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:56](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L56)

The title of the document

***

### uri?

> `optional` **uri**: `string`

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:61](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L61)

Optional URI that is the source of the document.  It can be a URI for a website or
a URI within an internal system (like AWS S3 for example).

***

### document

> **document**: `string`

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:66](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L66)

The document text.  This isn't necessarily the entire source document found at the optional URI,
it typically is more focused within where the answer may be.

***

### highlights?

> `optional` **highlights**: [`KnowledgeBaseHighlight`](KnowledgeBaseHighlight.md)[]

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:70](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L70)

Notable highlights within the document that can help the user scan and find their answer.

***

### attributes?

> `optional` **attributes**: `object`

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:74](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L74)

Additional attribute for the document.  Keys and values are dependent on the underlying knowledgebase.

#### Index Signature

\[`key`: `string`\]: `any`
