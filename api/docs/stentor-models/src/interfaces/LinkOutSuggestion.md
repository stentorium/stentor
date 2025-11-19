[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / LinkOutSuggestion

# Interface: LinkOutSuggestion

Defined in: [packages/stentor-models/src/Suggestion.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Suggestion.ts#L29)

Suggestion chip that links out to an App or Website.  Ownership of the
URL must be validated in the Actions on Google developer console or the suggestion will not
be shown.

The title has a limit of 20 characters, note this is different from when
it is a normal suggestion

Only Google Assistant at the moment.

## Extends

- [`Suggestion`](Suggestion.md)

## Properties

### title

> **title**: `string`

Defined in: [packages/stentor-models/src/Suggestion.ts:16](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Suggestion.ts#L16)

#### Inherited from

[`Suggestion`](Suggestion.md).[`title`](Suggestion.md#title)

***

### url

> **url**: `string`

Defined in: [packages/stentor-models/src/Suggestion.ts:30](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Suggestion.ts#L30)
