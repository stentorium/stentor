[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-interaction-model/src](../README.md) / UtteranceGeneratorProps

# Interface: UtteranceGeneratorProps

Defined in: [packages/stentor-interaction-model/src/Intent/UtteranceGenerator.ts:14](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Intent/UtteranceGenerator.ts#L14)

## Properties

### slotPattern?

> `optional` **slotPattern**: [`UtteranceGeneratorSlotPattern`](../enumerations/UtteranceGeneratorSlotPattern.md)

Defined in: [packages/stentor-interaction-model/src/Intent/UtteranceGenerator.ts:18](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Intent/UtteranceGenerator.ts#L18)

Select the slot pattern to generate the utterances from.

***

### ignoreInvalidUtterancesForPlatform?

> `optional` **ignoreInvalidUtterancesForPlatform**: `"dialogflow"` \| `"alexa"`

Defined in: [packages/stentor-interaction-model/src/Intent/UtteranceGenerator.ts:24](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-interaction-model/src/Intent/UtteranceGenerator.ts#L24)

When provided, it will ignore (not generate) invalid utterances for the provided.

For example, on Alexa we will ignore utterances that contain a SearchQuery slot and any other slots.
