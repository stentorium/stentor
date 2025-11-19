[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / popLastQuestion

# Function: popLastQuestion()

> **popLastQuestion**(`text`): \[`string`, `string`?\]

Defined in: [packages/stentor-utils/src/text.ts:95](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/text.ts#L95)

Removes the last sentence from the text if it is a question.

## Parameters

### text

`string`

The input text from which the last question sentence will be removed.

## Returns

\[`string`, `string`?\]

Returns an array with the modified text in the first element and the last question sentence in the second element.  
If there isn't a question in the text the first element will be unmodified and the second element will not be provided.
