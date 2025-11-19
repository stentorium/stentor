[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / AbstractResponseBuilder

# Abstract Class: AbstractResponseBuilder\<R\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:33](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L33)

## Type Parameters

### R

`R` = `any`

## Constructors

### Constructor

> **new AbstractResponseBuilder**\<`R`\>(`props`): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:71](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L71)

#### Parameters

##### props

[`ResponseBuilderProps`](../interfaces/ResponseBuilderProps.md)

#### Returns

`AbstractResponseBuilder`\<`R`\>

## Properties

### device

> `protected` `readonly` **device**: `Readonly`\<[`Device`](../interfaces/Device.md)\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:40](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L40)

Information about the device capabilities.  Use to determine
if you can present display information or play media.

***

### ~~backgroundImage?~~

> `protected` `readonly` `optional` **backgroundImage**: [`ImageSpecification`](../interfaces/ImageSpecification.md)[]

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:46](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L46)

Do not use.

#### Deprecated

Use metadata from the App model

***

### ~~assistantTitle?~~

> `protected` `readonly` `optional` **assistantTitle**: `string`

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:52](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L52)

Do not use.

#### Deprecated

Use metadata from the App model

***

### tag

> **tag**: `string` \| `string`[]

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:69](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L69)

Tag used by supported 3rd party analytics to track the response.

## Accessors

### response

#### Get Signature

> **get** **response**(): `Readonly`\<[`Response`](../type-aliases/Response.md)\<[`ResponseOutput`](../interfaces/ResponseOutput.md)\>\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:58](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L58)

The response that will be communicated to the user

##### Returns

`Readonly`\<[`Response`](../type-aliases/Response.md)\<[`ResponseOutput`](../interfaces/ResponseOutput.md)\>\>

## Methods

### respond()

> `abstract` **respond**(`response`): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:84](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L84)

Respond to the user.

Can contain just an output speech but can also contain an reprompt.

#### Parameters

##### response

[`Response`](../type-aliases/Response.md)

The entire response

#### Returns

`AbstractResponseBuilder`\<`R`\>

The builder instance

***

### say()

> `abstract` **say**(`ssml`, `append?`): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:92](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L92)

Say something to the user.

#### Parameters

##### ssml

The response, either as a string or a response output object which contains SSML and display text.

`string` | [`ResponseOutput`](../interfaces/ResponseOutput.md)

##### append?

`boolean`

Append the response to the existing, if available

#### Returns

`AbstractResponseBuilder`\<`R`\>

The builder instance

***

### reprompt()

> `abstract` **reprompt**(`ssml`, `append?`): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:100](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L100)

Provide a reprompt, necessary if you want to "ask" something

#### Parameters

##### ssml

The reprompt, either as a string or a response output object which contains SSML and display text.

`string` | [`ResponseOutput`](../interfaces/ResponseOutput.md)

##### append?

`boolean`

Append the response to the existing, if available

#### Returns

`AbstractResponseBuilder`\<`R`\>

The builder instance

***

### withCard()

> `abstract` **withCard**(`card`): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:107](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L107)

Provide a card

#### Parameters

##### card

[`Card`](../interfaces/Card.md)

Card to be displayed to the user

#### Returns

`AbstractResponseBuilder`\<`R`\>

The builder instance

***

### withList()

> `abstract` **withList**(`items`, `title?`): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:115](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L115)

Provide a list (vertical selection)

#### Parameters

##### items

[`ListItem`](../interfaces/ListItem.md)[]

List items to display

##### title?

`string`

The title for the list

#### Returns

`AbstractResponseBuilder`\<`R`\>

The builder instance

***

### withCarousel()

> `abstract` **withCarousel**(`items`): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:122](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L122)

Provide a carousel (horizontal selection)

#### Parameters

##### items

[`ListItem`](../interfaces/ListItem.md)[]

List items to display in the carousel

#### Returns

`AbstractResponseBuilder`\<`R`\>

The builder instance

***

### withDisplay()

> `abstract` **withDisplay**(`display`): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:129](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L129)

Add a custom display object to the response

#### Parameters

##### display

`object`

A custom display object

#### Returns

`AbstractResponseBuilder`\<`R`\>

The builder instance

***

### withSuggestions()

> `abstract` **withSuggestions**(`suggestion`, `append?`): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:138](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L138)

Provide suggestions for the user.

Limited support across platforms for this at the moment, only Google Assistant.

#### Parameters

##### suggestion

Either a single suggestion chip or an array

[`SuggestionTypes`](../type-aliases/SuggestionTypes.md) | [`SuggestionTypes`](../type-aliases/SuggestionTypes.md)[]

##### append?

`boolean`

#### Returns

`AbstractResponseBuilder`\<`R`\>

The builder instance

***

### withActiveContext()

> `abstract` **withActiveContext**(`context`): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:148](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L148)

Active contexts provide guidance to the NLU to help it better select the next intent from the user's utterance.

#### Parameters

##### context

Either a single context or array of contexts.

[`ActiveContext`](../interfaces/ActiveContext.md) | [`ActiveContext`](../interfaces/ActiveContext.md)[]

#### Returns

`AbstractResponseBuilder`\<`R`\>

The builder instance

***

### withCanFulfill()

> `abstract` **withCanFulfill**(`results`): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:155](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L155)

Build intent pre-fetch results aka "CanFulfillRequest"

#### Parameters

##### results

[`CanFulfillIntentResult`](../interfaces/CanFulfillIntentResult.md)

#### Returns

`AbstractResponseBuilder`\<`R`\>

The builder instance

***

### play()

> `abstract` **play**(`playable`, `offset?`): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:167](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L167)

Play the provided audio

#### Parameters

##### playable

[`PlayableMedia`](../type-aliases/PlayableMedia.md)

Media to play

##### offset?

`number`

#### Returns

`AbstractResponseBuilder`\<`R`\>

The builder instance

***

### playPlaylist()

> `abstract` **playPlaylist**(`playlist`): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:177](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L177)

Play a playlist

Note: Only supported by Actions on Google at the moment.  If attempting to use this function on
Alexa, only the first item in the playlist will be played.

#### Parameters

##### playlist

[`PlayableMedia`](../type-aliases/PlayableMedia.md)[]

The playlist to be played

#### Returns

`AbstractResponseBuilder`\<`R`\>

The builder instance

***

### stop()

> `abstract` **stop**(): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:183](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L183)

Stop the current audio

#### Returns

`AbstractResponseBuilder`\<`R`\>

The builder instance

***

### enqueue()

> `abstract` **enqueue**(`next`, `current`): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:191](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L191)

Enqueue the next audio

#### Parameters

##### next

[`PlayableMedia`](../type-aliases/PlayableMedia.md)

Track to be queued

##### current

[`PlayableMedia`](../type-aliases/PlayableMedia.md)

The current track playing

#### Returns

`AbstractResponseBuilder`\<`R`\>

The builder instance

***

### mediaQueueSize()

> **mediaQueueSize**(): `number`

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:195](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L195)

The number of playables that can be sent at once. Override it if the platform handles more.

#### Returns

`number`

***

### askForAccountLinking()

> `abstract` **askForAccountLinking**(`response?`): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:208](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L208)

Request account linking

#### Parameters

##### response?

`string` | [`SimpleResponse`](../interfaces/SimpleResponse.md)\<`string` \| [`ResponseOutput`](../interfaces/ResponseOutput.md)\>

#### Returns

`AbstractResponseBuilder`\<`R`\>

The builder instance

***

### askForNotification()

> `abstract` **askForNotification**(`intentId?`): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:216](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L216)

**`Beta`**

Request notification to intent

 This is a beta feature.

#### Parameters

##### intentId?

`string`

#### Returns

`AbstractResponseBuilder`\<`R`\>

The builder instance

***

### askForSurfaceChange()

> `abstract` **askForSurfaceChange**(`response?`, `notificationLabel?`): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:224](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L224)

Ask the user to change surfaces, for example from a smart speaker to a mobile phone.

#### Parameters

##### response?

Response to give as context to the user for the surface change

`string` | [`SimpleResponse`](../interfaces/SimpleResponse.md)\<`string` \| [`ResponseOutput`](../interfaces/ResponseOutput.md)\>

##### notificationLabel?

`string`

The label for the notification on the new surface

#### Returns

`AbstractResponseBuilder`\<`R`\>

The builder instance

***

### askForListAccess()

> `abstract` **askForListAccess**(`response?`): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:233](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L233)

Request access to shopping lists

#### Parameters

##### response?

`string` | [`SimpleResponse`](../interfaces/SimpleResponse.md)\<`string` \| [`ResponseOutput`](../interfaces/ResponseOutput.md)\>

#### Returns

`AbstractResponseBuilder`\<`R`\>

The builder instance

***

### askForUserData()

> `abstract` **askForUserData**(`userDataType`, `accessData?`): `Promise`\<[`UserDataValue`](../interfaces/UserDataValue.md)\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:239](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L239)

Chase down the user profile data

#### Parameters

##### userDataType

[`UserDataType`](../type-aliases/UserDataType.md)

##### accessData?

[`ApiAccessData`](../interfaces/ApiAccessData.md)

#### Returns

`Promise`\<[`UserDataValue`](../interfaces/UserDataValue.md)\>

The builder instance

***

### askForCallTransfer()

> `abstract` **askForCallTransfer**(`phoneNumber`): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:246](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L246)

Ask for call transfer (on telephony capable channels)

#### Parameters

##### phoneNumber

`string`

The phone number to transfer the call to

#### Returns

`AbstractResponseBuilder`\<`R`\>

The builder instance

***

### askForHandoff()

> `abstract` **askForHandoff**(`handoffTargetId`): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:252](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L252)

**`Alpha`**

- The feature is under active development

#### Parameters

##### handoffTargetId

`string`

The id that represents the handoff target (app id/name, queue id/name, etc)

#### Returns

`AbstractResponseBuilder`\<`R`\>

***

### askTransactionRequirements()

> `abstract` **askTransactionRequirements**(): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:256](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L256)

Check if the user can "transact"

#### Returns

`AbstractResponseBuilder`\<`R`\>

***

### askForDeliveryAddress()

> `abstract` **askForDeliveryAddress**(`response?`): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:262](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L262)

Ask the platform to query the delivery address

#### Parameters

##### response?

The reason for the delivery address ("To know where to send the order")

`string` | [`SimpleResponse`](../interfaces/SimpleResponse.md)\<`string` \| [`ResponseOutput`](../interfaces/ResponseOutput.md)\>

#### Returns

`AbstractResponseBuilder`\<`R`\>

***

### askForTransactionDecision()

> `abstract` **askForTransactionDecision**(`paymentParameters`, `order`): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:268](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L268)

#### Parameters

##### paymentParameters

[`PaymentParameters`](../interfaces/PaymentParameters.md)

(google payment or merchant)

##### order

[`OrderDescription`](../interfaces/OrderDescription.md)

the order description

#### Returns

`AbstractResponseBuilder`\<`R`\>

***

### askForOrderUpdate()

> `abstract` **askForOrderUpdate**(`response`, `order`): `AbstractResponseBuilder`\<`R`\>

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:274](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L274)

#### Parameters

##### response

To announce the order was completed ("Your order ${conv.data.UNIQUE_ORDER_ID} is all set!")

`string` | [`SimpleResponse`](../interfaces/SimpleResponse.md)\<`string` \| [`ResponseOutput`](../interfaces/ResponseOutput.md)\>

##### order

[`OrderDescription`](../interfaces/OrderDescription.md)

the order description

#### Returns

`AbstractResponseBuilder`\<`R`\>

***

### build()

> `abstract` **build**(): `R`

Defined in: [packages/stentor-models/src/Response/AbstractResponseBuilder.ts:280](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/AbstractResponseBuilder.ts#L280)

Build the response

#### Returns

`R`

The built response
