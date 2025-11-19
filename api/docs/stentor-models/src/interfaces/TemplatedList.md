[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / TemplatedList

# Interface: TemplatedList

Defined in: [packages/stentor-models/src/Display/List/List.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/List/List.ts#L9)

**`Beta`**

Add to a display that has a list of items to give it the ability to be compiled with variables.

 This is a new feature and may not work 100% as expected or may change.

## Extended by

- [`List`](List.md)

## Properties

### itemsObject?

> `optional` **itemsObject**: `string`

Defined in: [packages/stentor-models/src/Display/List/List.ts:18](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/List/List.ts#L18)

**`Beta`**

Used when templating the list for automatic generation.

When using itemsObject, the first item in the list is the template
and all other items in the list will be ignored.

 This is not yet fully supported

***

### itemsName?

> `optional` **itemsName**: `string`

Defined in: [packages/stentor-models/src/Display/List/List.ts:24](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/List/List.ts#L24)

**`Beta`**

Used with itemsObject, it is then used to reference the current item in the list within the template. 

 This is not yet fully supported

***

### range?

> `optional` **range**: `object`

Defined in: [packages/stentor-models/src/Display/List/List.ts:31](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/List/List.ts#L31)

**`Beta`**

When itemsObject is provided, this is the amount of list items to display
along with the offset within the list.

 This is not yet fully supported

#### length

> **length**: `number`

#### from

> **from**: `number`

***

### items?

> `optional` **items**: `any`[]

Defined in: [packages/stentor-models/src/Display/List/List.ts:36](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/List/List.ts#L36)

**`Beta`**
