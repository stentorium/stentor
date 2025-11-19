[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Entity

# Interface: Entity

Defined in: [packages/stentor-models/src/Entity/Entity.ts:4](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Entity/Entity.ts#L4)

## Properties

### appId?

> `optional` **appId**: `string`

Defined in: [packages/stentor-models/src/Entity/Entity.ts:10](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Entity/Entity.ts#L10)

The ID for the application the entity belongs to.

This is immutable.

***

### entityId

> **entityId**: `string`

Defined in: [packages/stentor-models/src/Entity/Entity.ts:18](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Entity/Entity.ts#L18)

The ID (name) of the entity.

 This is meant for machines but is somewhat human readable

 This is immutable.

***

### nlu?

> `optional` **nlu**: `object`

Defined in: [packages/stentor-models/src/Entity/Entity.ts:24](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Entity/Entity.ts#L24)

NLU specific metadata used when translating to the NLU entity.

Use it to override the entity type for a specific NLU

#### Index Signature

\[`nlu`: `string`\]: `object`

***

### displayName?

> `optional` **displayName**: `string`

Defined in: [packages/stentor-models/src/Entity/Entity.ts:28](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Entity/Entity.ts#L28)

Optional display name, used to help better communicate the entity.

***

### ~~dialogflowId?~~

> `optional` **dialogflowId**: `string`

Defined in: [packages/stentor-models/src/Entity/Entity.ts:34](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Entity/Entity.ts#L34)

Optional ID if the slot type has a representation in Dialogflow.

#### Deprecated

This field is being phased out.  It will be removed in the next major release

***

### values

> **values**: [`EntityValue`](EntityValue.md)[]

Defined in: [packages/stentor-models/src/Entity/Entity.ts:38](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Entity/Entity.ts#L38)

Values for the entity.

***

### type?

> `optional` **type**: `"REGEX"` \| `"VALUE_SYNONYMS"`

Defined in: [packages/stentor-models/src/Entity/Entity.ts:50](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Entity/Entity.ts#L50)

**`Alpha`**

The type of entity.

If not set, the default is 'VALUE_SYNONYMS' which uses a set of values
and corresponding synonyms for the value.

REGEX is when the values are expecting to be a regular expression.  This is not
supported by all NLU.

 Still under development. It may change.
