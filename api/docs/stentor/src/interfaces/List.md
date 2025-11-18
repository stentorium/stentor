[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / List

# Interface: List

Defined in: packages/stentor-models/lib/Display/List/List.d.ts:47

List style display items.

Can either be vertical style list or a carousel.

This translates to a List/Carousel on the Google Assistant and ListTemplate1/ListTemplate2 on Amazon Alexa

See [https://developers.google.com/actions/assistant/responses#list](https://developers.google.com/actions/assistant/responses#list) and
[https://developer.amazon.com/docs/custom-skills/display-template-reference.html#listtemplate1](https://developer.amazon.com/docs/custom-skills/display-template-reference.html#listtemplate1)

## Extends

- `BaseDisplay`.`TemplatedList`

## Properties

### itemsObject?

> `optional` **itemsObject**: `string`

Defined in: packages/stentor-models/lib/Display/List/List.d.ts:17

**`Beta`**

Used when templating the list for automatic generation.

When using itemsObject, the first item in the list is the template
and all other items in the list will be ignored.

 This is not yet fully supported

#### Inherited from

`TemplatedList.itemsObject`

***

### itemsName?

> `optional` **itemsName**: `string`

Defined in: packages/stentor-models/lib/Display/List/List.d.ts:23

**`Beta`**

Used with itemsObject, it is then used to reference the current item in the list within the template.

 This is not yet fully supported

#### Inherited from

`TemplatedList.itemsName`

***

### range?

> `optional` **range**: `object`

Defined in: packages/stentor-models/lib/Display/List/List.d.ts:30

**`Beta`**

When itemsObject is provided, this is the amount of list items to display
along with the offset within the list.

 This is not yet fully supported

#### length

> **length**: `number`

#### from

> **from**: `number`

#### Inherited from

`TemplatedList.range`

***

### type

> **type**: `"LIST"` \| `"CAROUSEL"`

Defined in: packages/stentor-models/lib/Display/List/List.d.ts:54

Type of list.

LIST is vertical, translates to a List on Google and ListTemplate1 on Alexa
CAROUSEL is horizontal, translates to a Carousel on Google and ListTemplate2 on Alexa

#### Overrides

`BaseDisplay.type`

***

### token?

> `optional` **token**: `string`

Defined in: packages/stentor-models/lib/Display/List/List.d.ts:58

Token is a reference to the list, required by Alexa

#### Overrides

`BaseDisplay.token`

***

### title?

> `optional` **title**: `string`

Defined in: packages/stentor-models/lib/Display/List/List.d.ts:62

Title of the list, not required for Carousels on Google

#### Overrides

`BaseDisplay.title`

***

### items

> **items**: [`ListItem`](ListItem.md)[]

Defined in: packages/stentor-models/lib/Display/List/List.d.ts:66

The list items.

#### Overrides

`TemplatedList.items`
