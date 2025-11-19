[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / toHTML

# Function: toHTML()

> **toHTML**(`input`, `props?`): `string`

Defined in: [packages/stentor-utils/src/markdown.ts:21](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/markdown.ts#L21)

Converts a markdown string to HTML.

Supported markdown is Github

It also decodes HTML entities and cleans dirty dangerous tags.

All `<a>` hyperlink tags have `target="_blank"` added to open the URLs in a new window.

## Parameters

### input

`string`

String with markdown

### props?

Optional props to pass that influence the behavior.

#### allowedTags?

`string`[]

## Returns

`string`

String with HTML, wrapped with <p></p> tags.
