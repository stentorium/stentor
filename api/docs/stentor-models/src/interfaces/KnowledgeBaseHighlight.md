[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / KnowledgeBaseHighlight

# Interface: KnowledgeBaseHighlight

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:28](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L28)

Description of a highlighted word, which is relevant to
the original knowledge base search.

## Properties

### beginOffset

> **beginOffset**: `number`

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:32](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L32)

Starting offset within the document

***

### endOffset

> **endOffset**: `number`

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:36](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L36)

End location of the highlight within the document

***

### topAnswer?

> `optional` **topAnswer**: `boolean`

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:45](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L45)

If the highlight is the top suggested answer for the entire search.

A document can contain the answer while the highlight pinpoints it's location 
within the document. 

When this is true, it will show up as a suggested answer in the results.
