[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / KnowledgeBaseSuggested

# Interface: KnowledgeBaseSuggested

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:80](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L80)

A suggested answer with high confidence.

## Extends

- [`KnowledgeBaseDocument`](KnowledgeBaseDocument.md)

## Properties

### title?

> `optional` **title**: `string`

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:56](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L56)

The title of the document

#### Inherited from

[`KnowledgeBaseDocument`](KnowledgeBaseDocument.md).[`title`](KnowledgeBaseDocument.md#title)

***

### uri?

> `optional` **uri**: `string`

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:61](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L61)

Optional URI that is the source of the document.  It can be a URI for a website or
a URI within an internal system (like AWS S3 for example).

#### Inherited from

[`KnowledgeBaseDocument`](KnowledgeBaseDocument.md).[`uri`](KnowledgeBaseDocument.md#uri)

***

### document

> **document**: `string`

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:66](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L66)

The document text.  This isn't necessarily the entire source document found at the optional URI,
it typically is more focused within where the answer may be.

#### Inherited from

[`KnowledgeBaseDocument`](KnowledgeBaseDocument.md).[`document`](KnowledgeBaseDocument.md#document)

***

### highlights?

> `optional` **highlights**: [`KnowledgeBaseHighlight`](KnowledgeBaseHighlight.md)[]

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:70](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L70)

Notable highlights within the document that can help the user scan and find their answer.

#### Inherited from

[`KnowledgeBaseDocument`](KnowledgeBaseDocument.md).[`highlights`](KnowledgeBaseDocument.md#highlights)

***

### attributes?

> `optional` **attributes**: `object`

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:74](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L74)

Additional attribute for the document.  Keys and values are dependent on the underlying knowledgebase.

#### Index Signature

\[`key`: `string`\]: `any`

#### Inherited from

[`KnowledgeBaseDocument`](KnowledgeBaseDocument.md).[`attributes`](KnowledgeBaseDocument.md#attributes)

***

### topAnswer?

> `optional` **topAnswer**: `string`

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:84](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L84)

The snippet that is the exact answer the user is looking for within a larger document.

***

### matchConfidence?

> `optional` **matchConfidence**: `number`

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:88](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L88)

Confidence of the match, number between 0-1 where the higher the number has a higher confidence.
