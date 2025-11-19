[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / ListItem

# Interface: ListItem

Defined in: packages/stentor-models/lib/Display/List/List.d.ts:68

## Properties

### title

> **title**: `string`

Defined in: packages/stentor-models/lib/Display/List/List.d.ts:72

Title of the list item, referred to as PrimaryText on Alexa.

***

### token

> **token**: `string`

Defined in: packages/stentor-models/lib/Display/List/List.d.ts:78

Used as a reference for when the list item is selected.

This is the same as a key on Google.

***

### synonyms?

> `optional` **synonyms**: `string`[]

Defined in: packages/stentor-models/lib/Display/List/List.d.ts:84

Synonyms can be added so the user can speak the selection instead of touching the screen.

Only supported on Google.

***

### description?

> `optional` **description**: `string`

Defined in: packages/stentor-models/lib/Display/List/List.d.ts:88

Description text of the list item, referred to as SecondaryText on Alexa.

***

### image?

> `optional` **image**: `ListImage`

Defined in: packages/stentor-models/lib/Display/List/List.d.ts:92

The image for the list item.

***

### url?

> `optional` **url**: `string`

Defined in: packages/stentor-models/lib/Display/List/List.d.ts:98

URL to open when the list item is selected.

Not applicable to list type CAROUSEL or available on channels without a web browser available.

***

### buttons?

> `optional` **buttons**: [`ListButton`](ListButton.md)[]

Defined in: packages/stentor-models/lib/Display/List/List.d.ts:102

Optional list of buttons that will be displayed on the list item.
