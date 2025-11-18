[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / toResponseOutput

# Function: toResponseOutput()

> **toResponseOutput**(`input`): [`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md)

Defined in: [packages/stentor-utils/src/response.ts:16](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/response.ts#L16)

Ensures that an outputSpeech or reprompt, either string or ResponseOutput,
is a ResponseOutput.

## Parameters

### input

Either a string or ResponseOutput to convert to a ResponseOutput

`string` | [`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md)

## Returns

[`ResponseOutput`](../../../stentor/src/interfaces/ResponseOutput.md)
