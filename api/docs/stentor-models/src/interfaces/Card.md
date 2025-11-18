[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Card

# Interface: Card

Defined in: [packages/stentor-models/src/Display/Card/Card.ts:4](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/Card/Card.ts#L4)

## Extends

- [`BaseDisplay`](BaseDisplay.md)

## Properties

### type

> **type**: `"CARD"`

Defined in: [packages/stentor-models/src/Display/Card/Card.ts:5](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/Card/Card.ts#L5)

#### Overrides

[`BaseDisplay`](BaseDisplay.md).[`type`](BaseDisplay.md#type)

***

### title

> **title**: `string`

Defined in: [packages/stentor-models/src/Display/Card/Card.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/Card/Card.ts#L9)

Card title

#### Overrides

[`BaseDisplay`](BaseDisplay.md).[`title`](BaseDisplay.md#title)

***

### subTitle?

> `optional` **subTitle**: `string`

Defined in: [packages/stentor-models/src/Display/Card/Card.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/Card/Card.ts#L13)

Card secondary title, if available it is smaller font below title

***

### content

> **content**: `string`

Defined in: [packages/stentor-models/src/Display/Card/Card.ts:17](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/Card/Card.ts#L17)

Description, typically used in the body of the card

***

### smallImageUrl?

> `optional` **smallImageUrl**: `string`

Defined in: [packages/stentor-models/src/Display/Card/Card.ts:21](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/Card/Card.ts#L21)

Small image, used on smaller form factors.

***

### largeImageUrl?

> `optional` **largeImageUrl**: `string`

Defined in: [packages/stentor-models/src/Display/Card/Card.ts:25](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/Card/Card.ts#L25)

Large image, used on larger form factors

***

### imageActionUrl?

> `optional` **imageActionUrl**: `string`

Defined in: [packages/stentor-models/src/Display/Card/Card.ts:31](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/Card/Card.ts#L31)

**`Beta`**

When present, if the image is clicked the provided website will open.

 Not yet fully supported.

***

### accessibilityText?

> `optional` **accessibilityText**: `string`

Defined in: [packages/stentor-models/src/Display/Card/Card.ts:35](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/Card/Card.ts#L35)

Used when available as the accessibility text for the image, if provided.

***

### buttons?

> `optional` **buttons**: [`CardButton`](CardButton.md)[]

Defined in: [packages/stentor-models/src/Display/Card/Card.ts:39](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/Card/Card.ts#L39)

Buttons for the card which typically appear below the body of the card near the bottom.

***

### token?

> `optional` **token**: `string`

Defined in: [packages/stentor-models/src/Display/Types.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/Types.ts#L9)

#### Inherited from

[`BaseDisplay`](BaseDisplay.md).[`token`](BaseDisplay.md#token)
