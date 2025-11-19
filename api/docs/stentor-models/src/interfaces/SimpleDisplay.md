[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / SimpleDisplay

# Interface: SimpleDisplay

Defined in: [packages/stentor-models/src/Display/SimpleDisplay.ts:17](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/SimpleDisplay.ts#L17)

**`Beta`**

The base Display structure

 Not widely used

## Extends

- [`BaseDisplay`](BaseDisplay.md)

## Properties

### type

> **type**: `"ImageDisplay"` \| `"ShortText"` \| `"LongText"` \| `"ImageRightDetail"` \| `"ImageLeftDetail"` \| `"ImageForwardList"` \| `"TextForwardList"`

Defined in: [packages/stentor-models/src/Display/SimpleDisplay.ts:18](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/SimpleDisplay.ts#L18)

**`Beta`**

#### Overrides

[`BaseDisplay`](BaseDisplay.md).[`type`](BaseDisplay.md#type)

***

### token

> **token**: `string`

Defined in: [packages/stentor-models/src/Display/SimpleDisplay.ts:26](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/SimpleDisplay.ts#L26)

**`Beta`**

#### Overrides

[`BaseDisplay`](BaseDisplay.md).[`token`](BaseDisplay.md#token)

***

### backgroundImage?

> `optional` **backgroundImage**: [`Image`](Image.md)

Defined in: [packages/stentor-models/src/Display/SimpleDisplay.ts:27](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/SimpleDisplay.ts#L27)

**`Beta`**

***

### image?

> `optional` **image**: [`Image`](Image.md)

Defined in: [packages/stentor-models/src/Display/SimpleDisplay.ts:28](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/SimpleDisplay.ts#L28)

**`Beta`**

***

### title?

> `optional` **title**: `string`

Defined in: [packages/stentor-models/src/Display/SimpleDisplay.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/SimpleDisplay.ts#L29)

**`Beta`**

#### Overrides

[`BaseDisplay`](BaseDisplay.md).[`title`](BaseDisplay.md#title)

***

### textContent?

> `optional` **textContent**: [`TextContent`](TextContent.md)

Defined in: [packages/stentor-models/src/Display/SimpleDisplay.ts:30](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/SimpleDisplay.ts#L30)

**`Beta`**

***

### backButtonVisible?

> `optional` **backButtonVisible**: `boolean`

Defined in: [packages/stentor-models/src/Display/SimpleDisplay.ts:31](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/SimpleDisplay.ts#L31)

**`Beta`**

***

### listItems?

> `optional` **listItems**: [`DisplayListItem`](DisplayListItem.md)[]

Defined in: [packages/stentor-models/src/Display/SimpleDisplay.ts:32](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/SimpleDisplay.ts#L32)

**`Beta`**
