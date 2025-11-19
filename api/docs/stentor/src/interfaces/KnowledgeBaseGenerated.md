[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / KnowledgeBaseGenerated

# Interface: KnowledgeBaseGenerated

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:128

A single document, typically part of a larger corpus of information
that is where the answer to the user's original query may reside.

## Extends

- [`KnowledgeBaseDocument`](KnowledgeBaseDocument.md)

## Properties

### title?

> `optional` **title**: `string`

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:52

The title of the document

#### Inherited from

[`KnowledgeBaseDocument`](KnowledgeBaseDocument.md).[`title`](KnowledgeBaseDocument.md#title)

***

### uri?

> `optional` **uri**: `string`

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:57

Optional URI that is the source of the document.  It can be a URI for a website or
a URI within an internal system (like AWS S3 for example).

#### Inherited from

[`KnowledgeBaseDocument`](KnowledgeBaseDocument.md).[`uri`](KnowledgeBaseDocument.md#uri)

***

### document

> **document**: `string`

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:62

The document text.  This isn't necessarily the entire source document found at the optional URI,
it typically is more focused within where the answer may be.

#### Inherited from

[`KnowledgeBaseDocument`](KnowledgeBaseDocument.md).[`document`](KnowledgeBaseDocument.md#document)

***

### highlights?

> `optional` **highlights**: `KnowledgeBaseHighlight`[]

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:66

Notable highlights within the document that can help the user scan and find their answer.

#### Inherited from

[`KnowledgeBaseDocument`](KnowledgeBaseDocument.md).[`highlights`](KnowledgeBaseDocument.md#highlights)

***

### attributes?

> `optional` **attributes**: `object`

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:70

Additional attribute for the document.  Keys and values are dependent on the underlying knowledgebase.

#### Index Signature

\[`key`: `string`\]: `any`

#### Inherited from

[`KnowledgeBaseDocument`](KnowledgeBaseDocument.md).[`attributes`](KnowledgeBaseDocument.md#attributes)

***

### generated

> **generated**: `string`

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:132

The generated text from the LLM

***

### llm?

> `optional` **llm**: `string`

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:136

Optional, the source LLM of the generated answer.

***

### type?

> `optional` **type**: `string`

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:145

A description of the type of generated response.

This can be used to better describe the prompt used for generation so it can be understood what type of
information is in the generated response.

Two standard values are "retrieval-augmented-generation" and "general-knowledge"

***

### hasAnswer?

> `optional` **hasAnswer**: `boolean`

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:149

Generated AI will still return an response even if it didn't have an answer.  True if it has the answer to the user's query.

***

### suggestions?

> `optional` **suggestions**: `SuggestionObjectTypes`[]

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:153

Generated AI suggested follow up queries.

***

### sources?

> `optional` **sources**: `object`[]

Defined in: packages/stentor-models/lib/Request/KnowledgeBase.d.ts:157

Optional sources that the Generative AI used to generate the response.  This is typically specific to type "retrieval-augmented-generation" where source material is used to generate the answer.

#### url?

> `optional` **url**: `string`

#### title?

> `optional` **title**: `string`
