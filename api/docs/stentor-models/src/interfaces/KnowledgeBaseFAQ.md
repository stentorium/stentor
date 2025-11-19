[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / KnowledgeBaseFAQ

# Interface: KnowledgeBaseFAQ

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:94](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L94)

An FAQ

## Properties

### question

> **question**: `string`

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:98](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L98)

The question that is the closest match

***

### questions?

> `optional` **questions**: `string`[]

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:104](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L104)

Optional, some FAQ based systems can return multiple questions that match to the same answer.  This will be populated if they exist.

There most likely be a duplicate of the question field.

***

### uri?

> `optional` **uri**: `string`

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:108](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L108)

URI, either the source or a location where more information can be found.

***

### document

> **document**: `string`

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:112](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L112)

The answer to the FAQ

***

### highlights?

> `optional` **highlights**: [`KnowledgeBaseHighlight`](KnowledgeBaseHighlight.md)[]

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:116](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L116)

Highlights within the FAQ document that are relevant to the user's original search.

***

### attributes?

> `optional` **attributes**: `object`

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:120](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L120)

Additional attribute for the document.  Keys and values are dependent on the underlying knowledge base.

#### Index Signature

\[`key`: `string`\]: `any`

***

### matchConfidence?

> `optional` **matchConfidence**: `number`

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:124](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L124)

Confidence of the match, number between 0-1 where the higher the number has a higher confidence.

***

### handlerId?

> `optional` **handlerId**: `string`

Defined in: [packages/stentor-models/src/Request/KnowledgeBase.ts:128](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Request/KnowledgeBase.ts#L128)

If provided, this references a handler
