[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / KnowledgeBaseFAQ

# Interface: KnowledgeBaseFAQ

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:90

An FAQ

## Properties

### question

> **question**: `string`

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:94

The question that is the closest match

***

### questions?

> `optional` **questions**: `string`[]

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:100

Optional, some FAQ based systems can return multiple questions that match to the same answer.  This will be populated if they exist.

There most likely be a duplicate of the question field.

***

### uri?

> `optional` **uri**: `string`

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:104

URI, either the source or a location where more information can be found.

***

### document

> **document**: `string`

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:108

The answer to the FAQ

***

### highlights?

> `optional` **highlights**: `KnowledgeBaseHighlight`[]

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:112

Highlights within the FAQ document that are relevant to the user's original search.

***

### attributes?

> `optional` **attributes**: `object`

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:116

Additional attribute for the document.  Keys and values are dependent on the underlying knowledge base.

#### Index Signature

\[`key`: `string`\]: `any`

***

### matchConfidence?

> `optional` **matchConfidence**: `number`

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:122

Confidence of the match, number between 0-1 where the higher the number has a higher confidence.

***

### handlerId?

> `optional` **handlerId**: `string`

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:126

If provided, this references a handler
