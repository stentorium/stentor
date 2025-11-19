[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / Data

# Interface: Data

Defined in: packages/stentor-models/lib/Handler/Data.d.ts:7

Base data object for all the handlers

## Extended by

- [`DelegatingData`](../../../stentor-handler-delegating/src/interfaces/DelegatingData.md)

## Properties

### chat?

> `optional` **chat**: `object`

Defined in: packages/stentor-models/lib/Handler/Data.d.ts:11

Fields for modifying all responses

#### suggestionChips?

> `optional` **suggestionChips**: `SuggestionTypes`[]

Chips to use when generating the default responses.  They will be added to all responses.

***

### inputUnknownStrategy?

> `optional` **inputUnknownStrategy**: `"GLOBAL"` \| `"GOOGLE"` \| `"REPROMPT"`

Defined in: packages/stentor-models/lib/Handler/Data.d.ts:24

Strategy to use when the handler receives an InputUnknown request.

Global requests the global InputUnknownHandler
Google's recommended pattern as outlined here: https://designguidelines.withgoogle.com/conversation/conversational-components/errors.html
Reprompt uses the reprompt from the previous response.

***

### accessibleThroughDiscovery?

> `optional` **accessibleThroughDiscovery**: `boolean`

Defined in: packages/stentor-models/lib/Handler/Data.d.ts:31

Is the handler available externally through discovery.

On Google it means this accessible through Discovery (see [https://developers.google.com/actions/sdk/invocation-and-discovery#discovery](https://developers.google.com/actions/sdk/invocation-and-discovery#discovery))
and on Alexa CanfulfillIntentRequest (see [https://developer.amazon.com/docs/custom-skills/understand-name-free-interaction-for-custom-skills.html](https://developer.amazon.com/docs/custom-skills/understand-name-free-interaction-for-custom-skills.html))
