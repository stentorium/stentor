[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / ResponseBuilder

# Class: ResponseBuilder\<T\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:8

A builder for stentor responses.

## Extends

- `AbstractResponseBuilder`\<`T`\>

## Type Parameters

### T

`T` = [`Response`](../type-aliases/Response.md)\<[`ResponseOutput`](../interfaces/ResponseOutput.md)\>

## Constructors

### Constructor

> **new ResponseBuilder**\<`T`\>(`props`): `ResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:9

#### Parameters

##### props

`ResponseBuilderProps`

#### Returns

`ResponseBuilder`\<`T`\>

#### Overrides

`AbstractResponseBuilder<T>.constructor`

## Properties

### device

> `protected` `readonly` **device**: `Readonly`\<[`Device`](../interfaces/Device.md)\>

Defined in: packages/stentor-models/lib/Response/AbstractResponseBuilder.d.ts:38

Information about the device capabilities.  Use to determine
if you can present display information or play media.

#### Inherited from

`AbstractResponseBuilder.device`

***

### ~~backgroundImage?~~

> `protected` `readonly` `optional` **backgroundImage**: `ImageSpecification`[]

Defined in: packages/stentor-models/lib/Response/AbstractResponseBuilder.d.ts:44

Do not use.

#### Deprecated

Use metadata from the App model

#### Inherited from

`AbstractResponseBuilder.backgroundImage`

***

### ~~assistantTitle?~~

> `protected` `readonly` `optional` **assistantTitle**: `string`

Defined in: packages/stentor-models/lib/Response/AbstractResponseBuilder.d.ts:50

Do not use.

#### Deprecated

Use metadata from the App model

#### Inherited from

`AbstractResponseBuilder.assistantTitle`

***

### tag

> **tag**: `string` \| `string`[]

Defined in: packages/stentor-models/lib/Response/AbstractResponseBuilder.d.ts:64

Tag used by supported 3rd party analytics to track the response.

#### Inherited from

`AbstractResponseBuilder.tag`

## Accessors

### response

#### Get Signature

> **get** **response**(): `Readonly`\<[`Response`](../type-aliases/Response.md)\<[`ResponseOutput`](../interfaces/ResponseOutput.md)\>\>

Defined in: packages/stentor-models/lib/Response/AbstractResponseBuilder.d.ts:56

The response that will be communicated to the user

##### Returns

`Readonly`\<[`Response`](../type-aliases/Response.md)\<[`ResponseOutput`](../interfaces/ResponseOutput.md)\>\>

#### Inherited from

`AbstractResponseBuilder.response`

## Methods

### mediaQueueSize()

> **mediaQueueSize**(): `number`

Defined in: packages/stentor-models/lib/Response/AbstractResponseBuilder.d.ts:180

The number of playables that can be sent at once. Override it if the platform handles more.

#### Returns

`number`

#### Inherited from

`AbstractResponseBuilder.mediaQueueSize`

***

### respond()

> **respond**(`response`): `ResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:15

Provide a fully formed response object

Note: This will overwrite any existing response that has been set previously with the builder.

#### Parameters

##### response

[`Response`](../type-aliases/Response.md)

#### Returns

`ResponseBuilder`\<`T`\>

#### Overrides

`AbstractResponseBuilder.respond`

***

### say()

> **say**(`say`, `append?`): `ResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:22

Communicate to the provided text user.  Depending on the channel, this will be displayed in a chat message style bubble
or spoken with text to speech.  You can provide both at the same time, text for display (displayText) or spoken (ssml).

If you use this without also providing a reprompt, the conversation will end on channels with voice input.

#### Parameters

##### say

`string` | [`ResponseOutput`](../interfaces/ResponseOutput.md)

##### append?

`boolean`

#### Returns

`ResponseBuilder`\<`T`\>

#### Overrides

`AbstractResponseBuilder.say`

***

### reprompt()

> **reprompt**(`reprompt`, `append?`): `ResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:26

Used on voice input channels, the reprompt is used when the user does not provide an input within a timely manner.

#### Parameters

##### reprompt

`string` | [`ResponseOutput`](../interfaces/ResponseOutput.md)

##### append?

`boolean`

#### Returns

`ResponseBuilder`\<`T`\>

#### Overrides

`AbstractResponseBuilder.reprompt`

***

### withSuggestions()

> **withSuggestions**(`suggestion`, `append?`): `ResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:30

Provide suggestion chips to the response.

#### Parameters

##### suggestion

`SuggestionTypes` | `SuggestionTypes`[]

##### append?

`boolean`

#### Returns

`ResponseBuilder`\<`T`\>

#### Overrides

`AbstractResponseBuilder.withSuggestions`

***

### withActiveContext()

> **withActiveContext**(`context`): `ResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:34

Provides active context that the NLU can use to help select the next intent.

#### Parameters

##### context

`ActiveContext` | `ActiveContext`[]

#### Returns

`ResponseBuilder`\<`T`\>

#### Overrides

`AbstractResponseBuilder.withActiveContext`

***

### withCard()

> **withCard**(`card`): `ResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:38

Add a display card element to the response.

#### Parameters

##### card

`Card`

#### Returns

`ResponseBuilder`\<`T`\>

#### Overrides

`AbstractResponseBuilder.withCard`

***

### withList()

> **withList**(`items`, `title?`): `ResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:42

Add a vertical list to the response

#### Parameters

##### items

[`ListItem`](../interfaces/ListItem.md)[]

##### title?

`string`

#### Returns

`ResponseBuilder`\<`T`\>

#### Overrides

`AbstractResponseBuilder.withList`

***

### withCarousel()

> **withCarousel**(`items`): `ResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:46

Add a horizontal list to the response.

#### Parameters

##### items

[`ListItem`](../interfaces/ListItem.md)[]

#### Returns

`ResponseBuilder`\<`T`\>

#### Overrides

`AbstractResponseBuilder.withCarousel`

***

### withDisplay()

> **withDisplay**(`display`): `ResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:50

Add a custom display object to the response.

#### Parameters

##### display

`object`

#### Returns

`ResponseBuilder`\<`T`\>

#### Overrides

`AbstractResponseBuilder.withDisplay`

***

### askForUserData()

> **askForUserData**(`userDataType`): `Promise`\<`UserDataValue`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:51

Chase down the user profile data

#### Parameters

##### userDataType

`UserDataType`

#### Returns

`Promise`\<`UserDataValue`\>

The builder instance

#### Overrides

`AbstractResponseBuilder.askForUserData`

***

### askForAccountLinking()

> **askForAccountLinking**(`response?`): `ResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:52

Request account linking

#### Parameters

##### response?

`string`

#### Returns

`ResponseBuilder`\<`T`\>

The builder instance

#### Overrides

`AbstractResponseBuilder.askForAccountLinking`

***

### askForNotification()

> **askForNotification**(`intentId?`): `ResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:53

**`Beta`**

Request notification to intent

 This is a beta feature.

#### Parameters

##### intentId?

`string`

#### Returns

`ResponseBuilder`\<`T`\>

The builder instance

#### Overrides

`AbstractResponseBuilder.askForNotification`

***

### askForSurfaceChange()

> **askForSurfaceChange**(`notificationText?`, `notificationLabel?`): `ResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:54

Ask the user to change surfaces, for example from a smart speaker to a mobile phone.

#### Parameters

##### notificationText?

`string`

##### notificationLabel?

`string`

The label for the notification on the new surface

#### Returns

`ResponseBuilder`\<`T`\>

The builder instance

#### Overrides

`AbstractResponseBuilder.askForSurfaceChange`

***

### askForListAccess()

> **askForListAccess**(`response?`): `ResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:55

Request access to shopping lists

#### Parameters

##### response?

`string` | [`Response`](../type-aliases/Response.md)

#### Returns

`ResponseBuilder`\<`T`\>

The builder instance

#### Overrides

`AbstractResponseBuilder.askForListAccess`

***

### askTransactionRequirements()

> **askTransactionRequirements**(): `ResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:56

Check if the user can "transact"

#### Returns

`ResponseBuilder`\<`T`\>

#### Overrides

`AbstractResponseBuilder.askTransactionRequirements`

***

### askForDeliveryAddress()

> **askForDeliveryAddress**(`response?`): `AbstractResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:57

Ask the platform to query the delivery address

#### Parameters

##### response?

The reason for the delivery address ("To know where to send the order")

`string` | `SimpleResponse`\<`string` \| [`ResponseOutput`](../interfaces/ResponseOutput.md)\>

#### Returns

`AbstractResponseBuilder`\<`T`\>

#### Overrides

`AbstractResponseBuilder.askForDeliveryAddress`

***

### askForTransactionDecision()

> **askForTransactionDecision**(`paymentParameters`, `order`): `AbstractResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:58

#### Parameters

##### paymentParameters

`PaymentParameters`

(google payment or merchant)

##### order

`OrderDescription`

the order description

#### Returns

`AbstractResponseBuilder`\<`T`\>

#### Overrides

`AbstractResponseBuilder.askForTransactionDecision`

***

### askForOrderUpdate()

> **askForOrderUpdate**(`response`, `order`): `AbstractResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:59

#### Parameters

##### response

To announce the order was completed ("Your order ${conv.data.UNIQUE_ORDER_ID} is all set!")

`string` | `SimpleResponse`\<`string` \| [`ResponseOutput`](../interfaces/ResponseOutput.md)\>

##### order

`OrderDescription`

the order description

#### Returns

`AbstractResponseBuilder`\<`T`\>

#### Overrides

`AbstractResponseBuilder.askForOrderUpdate`

***

### play()

> **play**(`playable`): `ResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:63

Play the provided media.

#### Parameters

##### playable

`PlayableMedia`

#### Returns

`ResponseBuilder`\<`T`\>

#### Overrides

`AbstractResponseBuilder.play`

***

### playPlaylist()

> **playPlaylist**(`playlist`): `ResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:64

Play a playlist

Note: Only supported by Actions on Google at the moment.  If attempting to use this function on
Alexa, only the first item in the playlist will be played.

#### Parameters

##### playlist

The playlist to be played

`Playlist`\<`PlayableMedia`\> | `PlayableMedia`[]

#### Returns

`ResponseBuilder`\<`T`\>

The builder instance

#### Overrides

`AbstractResponseBuilder.playPlaylist`

***

### stop()

> **stop**(): `ResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:65

Stop the current audio

#### Returns

`ResponseBuilder`\<`T`\>

The builder instance

#### Overrides

`AbstractResponseBuilder.stop`

***

### enqueue()

> **enqueue**(`next`, `current`): `ResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:66

Enqueue the next audio

#### Parameters

##### next

`PlayableMedia`

Track to be queued

##### current

`PlayableMedia`

The current track playing

#### Returns

`ResponseBuilder`\<`T`\>

The builder instance

#### Overrides

`AbstractResponseBuilder.enqueue`

***

### build()

> **build**(): `T`

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:67

Build the response

#### Returns

`T`

The built response

#### Overrides

`AbstractResponseBuilder.build`

***

### withCanFulfill()

> **withCanFulfill**(`results`): `ResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:68

Build intent pre-fetch results aka "CanFulfillRequest"

#### Parameters

##### results

`CanFulfillIntentResult`

#### Returns

`ResponseBuilder`\<`T`\>

The builder instance

#### Overrides

`AbstractResponseBuilder.withCanFulfill`

***

### askForCallTransfer()

> **askForCallTransfer**(`phoneNumber`): `AbstractResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:74

**`Alpha`**

- The feature is under active development

#### Parameters

##### phoneNumber

`string`

The phone number to transfer to

#### Returns

`AbstractResponseBuilder`\<`T`\>

#### Overrides

`AbstractResponseBuilder.askForCallTransfer`

***

### askForHandoff()

> **askForHandoff**(`handoffTargetId`): `AbstractResponseBuilder`\<`T`\>

Defined in: packages/stentor-response/lib/ResponseBuilder.d.ts:80

**`Alpha`**

- The feature is under active development

#### Parameters

##### handoffTargetId

`string`

The id that represents the handoff target (app id/name, queue id/name, etc)

#### Returns

`AbstractResponseBuilder`\<`T`\>

#### Overrides

`AbstractResponseBuilder.askForHandoff`
