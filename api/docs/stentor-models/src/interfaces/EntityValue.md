[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / EntityValue

# Interface: EntityValue

Defined in: [packages/stentor-models/src/Entity/EntityValue.ts:2](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Entity/EntityValue.ts#L2)

## Properties

### name

> **name**: `string`

Defined in: [packages/stentor-models/src/Entity/EntityValue.ts:8](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Entity/EntityValue.ts#L8)

The name of the entity.

For example, for an entity called cities, a value would be "Los Angeles".

***

### canonicalId?

> `optional` **canonicalId**: `string`

Defined in: [packages/stentor-models/src/Entity/EntityValue.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Entity/EntityValue.ts#L12)

Used by Alexa.  This value is returned as a reference, such as "LAX"

***

### synonyms?

> `optional` **synonyms**: `string`[]

Defined in: [packages/stentor-models/src/Entity/EntityValue.ts:18](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Entity/EntityValue.ts#L18)

List of potential synonyms for the entity.

For example, "L.A."" & "City of Angels"
