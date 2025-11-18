[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / SimpleResponse

# Interface: SimpleResponse\<T\>

Defined in: [packages/stentor-models/src/Response/Response.ts:82](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Response.ts#L82)

A response that expects a user's input.

## Extends

- `Partial`\<[`Actionable`](Actionable.md)\>.`Partial`\<[`Conditioned`](Conditioned.md)\>.`Partial`\<[`Channeled`](Channeled.md)\>

## Type Parameters

### T

`T` = `string` \| [`ResponseOutput`](ResponseOutput.md)

## Properties

### actions?

> `optional` **actions**: [`StorageAction`](StorageAction.md)[]

Defined in: [packages/stentor-models/src/Action/Actionable.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Action/Actionable.ts#L12)

#### Inherited from

[`Actionable`](Actionable.md).[`actions`](Actionable.md#actions)

***

### channel?

> `optional` **channel**: `object`

Defined in: [packages/stentor-models/src/Channel/Channeled.ts:12](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Channel/Channeled.ts#L12)

Description of the channel that will be

#### name?

> `optional` **name**: `string`

String to match with the name of the channel that will match.  It can either be the exact name of the
channel or a regex string to match multiple.

#### Inherited from

[`Channeled`](Channeled.md).[`channel`](Channeled.md#channel)

***

### conditions?

> `optional` **conditions**: `string` \| [`Conditions`](Conditions.md)

Defined in: [packages/stentor-models/src/Conditional.ts:73](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Conditional.ts#L73)

Conditions to be met.

Can either be a Conditions object or a string such as "foo('bar') || false"

#### Inherited from

[`Conditioned`](Conditioned.md).[`conditions`](Conditioned.md#conditions)

***

### name?

> `optional` **name**: `string`

Defined in: [packages/stentor-models/src/Response/Response.ts:88](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Response.ts#L88)

Name of the response.

Used to help differentiate multiple responses.

***

### tag?

> `optional` **tag**: `string` \| `string`[]

Defined in: [packages/stentor-models/src/Response/Response.ts:92](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Response.ts#L92)

Used for tracking the response in third party analytics.

***

### outputSpeech?

> `optional` **outputSpeech**: `T`

Defined in: [packages/stentor-models/src/Response/Response.ts:96](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Response.ts#L96)

What the assistant will say first as part of the response.

***

### reprompt?

> `optional` **reprompt**: `T`

Defined in: [packages/stentor-models/src/Response/Response.ts:101](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Response.ts#L101)

If provided, the output speech was most likely a question and requires a response from the user.
The reprompt is given if the user doesn't say anything or the assistant can't recognize the response.

***

### ~~silencePrompt?~~

> `optional` **silencePrompt**: `T`

Defined in: [packages/stentor-models/src/Response/Response.ts:105](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Response.ts#L105)

#### Deprecated

This is not in use.

***

### segments?

> `optional` **segments**: [`ResponseSegmentsMap`](ResponseSegmentsMap.md)

Defined in: [packages/stentor-models/src/Response/Response.ts:109](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Response.ts#L109)

Segments used for the outputSpeech and reprompt.

***

### displays?

> `optional` **displays**: [`Display`](../type-aliases/Display.md)[]

Defined in: [packages/stentor-models/src/Response/Response.ts:113](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Response.ts#L113)

Display elements for surfaces/devices with screens.

***

### media?

> `optional` **media**: [`Media`](Media.md)[]

Defined in: [packages/stentor-models/src/Response/Response.ts:117](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Response.ts#L117)

Media for playback

***

### system?

> `optional` **system**: `"ACCOUNT_LINK"` \| `"HANDOFF"` \| `"MEDIA_ENQUEUE"` \| `"MEDIA_STOP"` \| `"PERMISSION_EMAIL"` \| `"PERMISSION_LIST"` \| `"PERMISSION_LOCATION_COARSE"` \| `"PERMISSION_LOCATION_PRECISE"` \| `"PERMISSION_NOTIFICATION"` \| `"PERMISSION_PHONE_NUMBER"` \| `"SURFACE_CHANGE"` \| `"SURFACE_CLOSE"` \| `"SURFACE_MINIMIZE"` \| `"SURFACE_RESET"` \| `"TRANSACTION_DECISION"` \| `"TRANSACTION_DELIVERY_ADDRESS"` \| `"TRANSACTION_REQUIREMENTS_CHECK"` \| `"TRANSACTION_STATUS"` \| `"TRANSFER_CALL"`

Defined in: [packages/stentor-models/src/Response/Response.ts:121](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Response.ts#L121)

System responses to perform account links, control media, surface changes, and permission requests.

***

### data?

> `optional` **data**: [`ResponseData`](ResponseData.md)

Defined in: [packages/stentor-models/src/Response/Response.ts:145](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Response.ts#L145)

Supplemental data to augment the response.

***

### context?

> `optional` **context**: `object`

Defined in: [packages/stentor-models/src/Response/Response.ts:152](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Response.ts#L152)

Optional active contexts which help influence the NLU.

- [https://cloud.google.com/dialogflow/es/docs/contexts-input-output](https://cloud.google.com/dialogflow/es/docs/contexts-input-output)
- [https://docs.aws.amazon.com/lex/latest/dg/context-mgmt-active-context.html](https://docs.aws.amazon.com/lex/latest/dg/context-mgmt-active-context.html)

#### active?

> `optional` **active**: [`ActiveContext`](ActiveContext.md)[]

Matches to outputContexts on Dialogflow & activeContexts
