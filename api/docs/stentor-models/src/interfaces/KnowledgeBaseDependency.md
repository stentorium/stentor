[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / KnowledgeBaseDependency

# Interface: KnowledgeBaseDependency

Defined in: [packages/stentor-models/src/Knowledgebase/KnowledgeBaseConfig.ts:38](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Knowledgebase/KnowledgeBaseConfig.ts#L38)

## Extends

- [`KnowledgeBaseConfig`](KnowledgeBaseConfig.md)

## Properties

### matchIntentId?

> `optional` **matchIntentId**: `string`

Defined in: [packages/stentor-models/src/Knowledgebase/KnowledgeBaseConfig.ts:10](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Knowledgebase/KnowledgeBaseConfig.ts#L10)

Either the intentId or regex to determine which requests to call the KnowledgeBaseService.  If not provided it defaults to "^.*$", which is a regex
that will match on all requests.

#### Inherited from

[`KnowledgeBaseConfig`](KnowledgeBaseConfig.md).[`matchIntentId`](KnowledgeBaseConfig.md#matchintentid)

***

### matchChannel?

> `optional` **matchChannel**: `string`

Defined in: [packages/stentor-models/src/Knowledgebase/KnowledgeBaseConfig.ts:16](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Knowledgebase/KnowledgeBaseConfig.ts#L16)

Either exact name of the channel or a regex to determine which channel to call the KnowledgeBaseService.

If this matches, all requests from this channel go to the KnowledgeBaseService regardless if matchIntentId is set.

#### Inherited from

[`KnowledgeBaseConfig`](KnowledgeBaseConfig.md).[`matchChannel`](KnowledgeBaseConfig.md#matchchannel)

***

### setIntentId?

> `optional` **setIntentId**: `string`

Defined in: [packages/stentor-models/src/Knowledgebase/KnowledgeBaseConfig.ts:22](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Knowledgebase/KnowledgeBaseConfig.ts#L22)

If provided, it will override the intentId on the original request if the knowledgebase results are preferred.

It will also update the request type to be that of an Intent Request.

#### Inherited from

[`KnowledgeBaseConfig`](KnowledgeBaseConfig.md).[`setIntentId`](KnowledgeBaseConfig.md#setintentid)

***

### mergeResults?

> `optional` **mergeResults**: `boolean`

Defined in: [packages/stentor-models/src/Knowledgebase/KnowledgeBaseConfig.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Knowledgebase/KnowledgeBaseConfig.ts#L29)

**`Beta`**

If set to true then when knowledge base results already exist, they will be merged instead of the default behavior of
being overwritten.
 
 - This field and behavior of the field is subject to change.

#### Inherited from

[`KnowledgeBaseConfig`](KnowledgeBaseConfig.md).[`mergeResults`](KnowledgeBaseConfig.md#mergeresults)

***

### service

> **service**: [`KnowledgeBaseService`](KnowledgeBaseService.md)

Defined in: [packages/stentor-models/src/Knowledgebase/KnowledgeBaseConfig.ts:39](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Knowledgebase/KnowledgeBaseConfig.ts#L39)
