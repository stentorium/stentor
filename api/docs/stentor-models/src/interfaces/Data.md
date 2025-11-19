[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Data

# Interface: Data

Defined in: [packages/stentor-models/src/Handler/Data.ts:8](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Handler/Data.ts#L8)

Base data object for all the handlers

## Properties

### chat?

> `optional` **chat**: `object`

Defined in: [packages/stentor-models/src/Handler/Data.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Handler/Data.ts#L12)

Fields for modifying all responses

#### suggestionChips?

> `optional` **suggestionChips**: [`SuggestionTypes`](../type-aliases/SuggestionTypes.md)[]

Chips to use when generating the default responses.  They will be added to all responses.

***

### inputUnknownStrategy?

> `optional` **inputUnknownStrategy**: `"GLOBAL"` \| `"GOOGLE"` \| `"REPROMPT"`

Defined in: [packages/stentor-models/src/Handler/Data.ts:25](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Handler/Data.ts#L25)

Strategy to use when the handler receives an InputUnknown request.

Global requests the global InputUnknownHandler
Google's recommended pattern as outlined here: https://designguidelines.withgoogle.com/conversation/conversational-components/errors.html
Reprompt uses the reprompt from the previous response.

***

### accessibleThroughDiscovery?

> `optional` **accessibleThroughDiscovery**: `boolean`

Defined in: [packages/stentor-models/src/Handler/Data.ts:32](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Handler/Data.ts#L32)

Is the handler available externally through discovery.

On Google it means this accessible through Discovery (see [https://developers.google.com/actions/sdk/invocation-and-discovery#discovery](https://developers.google.com/actions/sdk/invocation-and-discovery#discovery))
and on Alexa CanfulfillIntentRequest (see [https://developer.amazon.com/docs/custom-skills/understand-name-free-interaction-for-custom-skills.html](https://developer.amazon.com/docs/custom-skills/understand-name-free-interaction-for-custom-skills.html))
