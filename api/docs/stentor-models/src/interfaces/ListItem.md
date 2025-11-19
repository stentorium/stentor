[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / ListItem

# Interface: ListItem

Defined in: [packages/stentor-models/src/Display/List/List.ts:73](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/List/List.ts#L73)

## Properties

### title

> **title**: `string`

Defined in: [packages/stentor-models/src/Display/List/List.ts:77](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/List/List.ts#L77)

Title of the list item, referred to as PrimaryText on Alexa.

***

### token

> **token**: `string`

Defined in: [packages/stentor-models/src/Display/List/List.ts:83](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/List/List.ts#L83)

Used as a reference for when the list item is selected.

This is the same as a key on Google.

***

### synonyms?

> `optional` **synonyms**: `string`[]

Defined in: [packages/stentor-models/src/Display/List/List.ts:89](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/List/List.ts#L89)

Synonyms can be added so the user can speak the selection instead of touching the screen.

Only supported on Google.

***

### description?

> `optional` **description**: `string`

Defined in: [packages/stentor-models/src/Display/List/List.ts:93](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/List/List.ts#L93)

Description text of the list item, referred to as SecondaryText on Alexa.

***

### image?

> `optional` **image**: [`ListImage`](ListImage.md)

Defined in: [packages/stentor-models/src/Display/List/List.ts:97](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/List/List.ts#L97)

The image for the list item.

***

### url?

> `optional` **url**: `string`

Defined in: [packages/stentor-models/src/Display/List/List.ts:103](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/List/List.ts#L103)

URL to open when the list item is selected.

Not applicable to list type CAROUSEL or available on channels without a web browser available.

***

### buttons?

> `optional` **buttons**: [`ListButton`](ListButton.md)[]

Defined in: [packages/stentor-models/src/Display/List/List.ts:107](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Display/List/List.ts#L107)

Optional list of buttons that will be displayed on the list item.
