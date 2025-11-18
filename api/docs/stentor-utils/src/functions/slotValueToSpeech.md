[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-utils/src](../README.md) / slotValueToSpeech

# Function: slotValueToSpeech()

> **slotValueToSpeech**(`value`, `type`): `string`

Defined in: [packages/stentor-utils/src/response.ts:171](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-utils/src/response.ts#L171)

Based on the provided slot value, it will return the appropriate `<say-as>` tag.

[https://cloud.google.com/text-to-speech/docs/ssml#say%E2%80%91as](https://cloud.google.com/text-to-speech/docs/ssml#say%E2%80%91as)
[https://developer.amazon.com/en-US/docs/alexa/custom-skills/speech-synthesis-markup-language-ssml-reference.html#say-as](https://developer.amazon.com/en-US/docs/alexa/custom-skills/speech-synthesis-markup-language-ssml-reference.html#say-as)
[https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html#say-as-tag](https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html#say-as-tag)

## Parameters

### value

`RequestSlotValues`

### type

`"displayText"` | `"ssml"`

## Returns

`string`
