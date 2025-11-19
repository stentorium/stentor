[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / List

# Interface: List

Defined in: [packages/stentor-models/src/Display/List/List.ts:51](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/List/List.ts#L51)

List style display items.

Can either be vertical style list or a carousel.

This translates to a List/Carousel on the Google Assistant and ListTemplate1/ListTemplate2 on Amazon Alexa

See [https://developers.google.com/actions/assistant/responses#list](https://developers.google.com/actions/assistant/responses#list) and
[https://developer.amazon.com/docs/custom-skills/display-template-reference.html#listtemplate1](https://developer.amazon.com/docs/custom-skills/display-template-reference.html#listtemplate1)

## Extends

- [`BaseDisplay`](BaseDisplay.md).[`TemplatedList`](TemplatedList.md)

## Properties

### itemsObject?

> `optional` **itemsObject**: `string`

Defined in: [packages/stentor-models/src/Display/List/List.ts:18](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/List/List.ts#L18)

**`Beta`**

Used when templating the list for automatic generation.

When using itemsObject, the first item in the list is the template
and all other items in the list will be ignored.

 This is not yet fully supported

#### Inherited from

[`TemplatedList`](TemplatedList.md).[`itemsObject`](TemplatedList.md#itemsobject)

***

### itemsName?

> `optional` **itemsName**: `string`

Defined in: [packages/stentor-models/src/Display/List/List.ts:24](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/List/List.ts#L24)

**`Beta`**

Used with itemsObject, it is then used to reference the current item in the list within the template. 

 This is not yet fully supported

#### Inherited from

[`TemplatedList`](TemplatedList.md).[`itemsName`](TemplatedList.md#itemsname)

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

#### Inherited from

[`TemplatedList`](TemplatedList.md).[`range`](TemplatedList.md#range)

***

### type

> **type**: `"LIST"` \| `"CAROUSEL"`

Defined in: [packages/stentor-models/src/Display/List/List.ts:58](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/List/List.ts#L58)

Type of list.

LIST is vertical, translates to a List on Google and ListTemplate1 on Alexa
CAROUSEL is horizontal, translates to a Carousel on Google and ListTemplate2 on Alexa

#### Overrides

[`BaseDisplay`](BaseDisplay.md).[`type`](BaseDisplay.md#type)

***

### token?

> `optional` **token**: `string`

Defined in: [packages/stentor-models/src/Display/List/List.ts:62](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/List/List.ts#L62)

Token is a reference to the list, required by Alexa

#### Overrides

[`BaseDisplay`](BaseDisplay.md).[`token`](BaseDisplay.md#token)

***

### title?

> `optional` **title**: `string`

Defined in: [packages/stentor-models/src/Display/List/List.ts:66](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/List/List.ts#L66)

Title of the list, not required for Carousels on Google

#### Overrides

[`BaseDisplay`](BaseDisplay.md).[`title`](BaseDisplay.md#title)

***

### items

> **items**: [`ListItem`](ListItem.md)[]

Defined in: [packages/stentor-models/src/Display/List/List.ts:70](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/List/List.ts#L70)

The list items.

#### Overrides

[`TemplatedList`](TemplatedList.md).[`items`](TemplatedList.md#items)
