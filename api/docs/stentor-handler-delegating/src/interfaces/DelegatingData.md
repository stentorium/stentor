[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-handler-delegating/src](../README.md) / DelegatingData

# Interface: DelegatingData

Defined in: [packages/stentor-handler-delegating/src/Data.ts:6](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler-delegating/src/Data.ts#L6)

## Extends

- [`Data`](../../../stentor/src/interfaces/Data.md)

## Properties

### delegateTo

> **delegateTo**: `string`

Defined in: [packages/stentor-handler-delegating/src/Data.ts:7](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler-delegating/src/Data.ts#L7)

***

### delegateData

> **delegateData**: `any`

Defined in: [packages/stentor-handler-delegating/src/Data.ts:8](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-handler-delegating/src/Data.ts#L8)

***

### chat?

> `optional` **chat**: `object`

Defined in: packages/stentor-models/lib/Handler/Data.d.ts:11

Fields for modifying all responses

#### suggestionChips?

> `optional` **suggestionChips**: `SuggestionTypes`[]

Chips to use when generating the default responses.  They will be added to all responses.

#### Inherited from

[`Data`](../../../stentor/src/interfaces/Data.md).[`chat`](../../../stentor/src/interfaces/Data.md#chat)

***

### inputUnknownStrategy?

> `optional` **inputUnknownStrategy**: `"GLOBAL"` \| `"GOOGLE"` \| `"REPROMPT"`

Defined in: packages/stentor-models/lib/Handler/Data.d.ts:24

Strategy to use when the handler receives an InputUnknown request.

Global requests the global InputUnknownHandler
Google's recommended pattern as outlined here: https://designguidelines.withgoogle.com/conversation/conversational-components/errors.html
Reprompt uses the reprompt from the previous response.

#### Inherited from

[`Data`](../../../stentor/src/interfaces/Data.md).[`inputUnknownStrategy`](../../../stentor/src/interfaces/Data.md#inputunknownstrategy)

***

### accessibleThroughDiscovery?

> `optional` **accessibleThroughDiscovery**: `boolean`

Defined in: packages/stentor-models/lib/Handler/Data.d.ts:31

Is the handler available externally through discovery.

On Google it means this accessible through Discovery (see [https://developers.google.com/actions/sdk/invocation-and-discovery#discovery](https://developers.google.com/actions/sdk/invocation-and-discovery#discovery))
and on Alexa CanfulfillIntentRequest (see [https://developer.amazon.com/docs/custom-skills/understand-name-free-interaction-for-custom-skills.html](https://developer.amazon.com/docs/custom-skills/understand-name-free-interaction-for-custom-skills.html))

#### Inherited from

[`Data`](../../../stentor/src/interfaces/Data.md).[`accessibleThroughDiscovery`](../../../stentor/src/interfaces/Data.md#accessiblethroughdiscovery)
