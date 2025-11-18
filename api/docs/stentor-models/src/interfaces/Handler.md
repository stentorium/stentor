[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Handler

# Interface: Handler\<C, D, F, R\>

Defined in: [packages/stentor-models/src/Handler/Handler.ts:14](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Handler/Handler.ts#L14)

A handler defines the necessary information to handle incoming requests and return a response.

## Extends

- [`Intent`](Intent.md)

## Type Parameters

### C

`C` *extends* [`Content`](Content.md) = [`Content`](Content.md)

### D

`D` *extends* [`Data`](Data.md) = [`Data`](Data.md)

### F

`F` *extends* [`Forward`](Forward.md) = [`Forward`](Forward.md)

### R

`R` *extends* [`Redirect`](Redirect.md) = [`Redirect`](Redirect.md)

## Properties

### type

> **type**: `string`

Defined in: [packages/stentor-models/src/Handler/Handler.ts:20](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Handler/Handler.ts#L20)

***

### content?

> `optional` **content**: `C`

Defined in: [packages/stentor-models/src/Handler/Handler.ts:21](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Handler/Handler.ts#L21)

***

### data?

> `optional` **data**: `D`

Defined in: [packages/stentor-models/src/Handler/Handler.ts:22](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Handler/Handler.ts#L22)

***

### forward?

> `optional` **forward**: `F`

Defined in: [packages/stentor-models/src/Handler/Handler.ts:23](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Handler/Handler.ts#L23)

***

### redirect?

> `optional` **redirect**: `R`

Defined in: [packages/stentor-models/src/Handler/Handler.ts:24](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Handler/Handler.ts#L24)

***

### permissions?

> `optional` **permissions**: [`UserDataType`](../type-aliases/UserDataType.md)[]

Defined in: [packages/stentor-models/src/Handler/Handler.ts:25](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Handler/Handler.ts#L25)

***

### organizationId

> **organizationId**: `string`

Defined in: [packages/stentor-models/src/Intent/Intent.ts:26](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L26)

The organization ID for the app of which this intent belongs.

#### Inherited from

[`Intent`](Intent.md).[`organizationId`](Intent.md#organizationid)

***

### appId

> **appId**: `string`

Defined in: [packages/stentor-models/src/Intent/Intent.ts:30](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L30)

The ID for the app the intent belongs to.

#### Inherited from

[`Intent`](Intent.md).[`appId`](Intent.md#appid)

***

### intentId

> **intentId**: `string`

Defined in: [packages/stentor-models/src/Intent/Intent.ts:35](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L35)

The ID of the intent, typically a combination of the name
and a random string.

#### Inherited from

[`Intent`](Intent.md).[`intentId`](Intent.md#intentid)

***

### ~~dialogflowId?~~

> `optional` **dialogflowId**: `string`

Defined in: [packages/stentor-models/src/Intent/Intent.ts:41](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L41)

Dialogflow keeps track of individual intents by a unique ID.

#### Deprecated

This field is being phased out.

#### Inherited from

[`Intent`](Intent.md).[`dialogflowId`](Intent.md#dialogflowid)

***

### name?

> `optional` **name**: `string`

Defined in: [packages/stentor-models/src/Intent/Intent.ts:45](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L45)

The human readable name of the intent.

#### Inherited from

[`Intent`](Intent.md).[`name`](Intent.md#name)

***

### createdAt?

> `optional` **createdAt**: `string`

Defined in: [packages/stentor-models/src/Intent/Intent.ts:49](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L49)

ISO-8601 string of when the intent was created.

#### Inherited from

[`Intent`](Intent.md).[`createdAt`](Intent.md#createdat)

***

### slots?

> `optional` **slots**: [`Slot`](Slot.md)[]

Defined in: [packages/stentor-models/src/Intent/Intent.ts:54](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L54)

The slots defined within the utterance patterns
and their Entity types.

#### Inherited from

[`Intent`](Intent.md).[`slots`](Intent.md#slots)

***

### ~~slotTypes?~~

> `optional` **slotTypes**: [`SlotTypeMap`](SlotTypeMap.md)

Defined in: [packages/stentor-models/src/Intent/Intent.ts:60](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L60)

A map of the slot type definition.

#### Deprecated

Use Entities

#### Inherited from

[`Intent`](Intent.md).[`slotTypes`](Intent.md#slottypes)

***

### substitutions?

> `optional` **substitutions**: `object`

Defined in: [packages/stentor-models/src/Intent/Intent.ts:84](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L84)

Substitutions can be used to clean up your utterance pattern to make it more readable.

For example, you may often have a lot of slots at the beginning of every pattern:

`\{$\{acknowledge\}|$\{yes_no\}|\}$\{prefix\} the rest of the utterance`

This then moves the actual meat of the pattern to the right when really you don't care about the
above except that it is there.

Substitutions will allow you to replace these, just at the local intent level, to make it easier to read.

{ ["_PREFIX_"]}: "{${acknowledge}|${yes_no}|}${prefix}" }

So it then becomes:

`$\{_PREFIX_\} the rest of the utterance`

It also allows you to change the substitution value and have it updated across all
the utterance patterns where the substitution exists.

When compiling the patterns, the substitution is applied first before expanding.

#### Index Signature

\[`pattern`: `string`\]: `string`

#### Inherited from

[`Intent`](Intent.md).[`substitutions`](Intent.md#substitutions)

***

### utterancePatterns?

> `optional` **utterancePatterns**: `string`[]

Defined in: [packages/stentor-models/src/Intent/Intent.ts:90](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L90)

An array of utterance patterns.

For more information on syntax see [https://github.com/alexa-js/alexa-utterances](https://github.com/alexa-js/alexa-utterances)

#### Inherited from

[`Intent`](Intent.md).[`utterancePatterns`](Intent.md#utterancepatterns)

***

### ~~langCode?~~

> `optional` **langCode**: `"en-US"`

Defined in: [packages/stentor-models/src/Intent/Intent.ts:97](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L97)

The language code.  Defaults to "en-US".

#### Default Value

```ts
"en-US"
```

#### Deprecated

This is no longer in use (it was in fact, never used).  Favor [Intent.defaultLocale](#defaultlocale) and [Intent.locales](#locales) instead.

#### Inherited from

[`Intent`](Intent.md).[`langCode`](Intent.md#langcode)

***

### graphCoords?

> `optional` **graphCoords**: [`GraphCoords`](GraphCoords.md)

Defined in: [packages/stentor-models/src/Intent/Intent.ts:102](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L102)

UI position coordinates for graphing.

#### Inherited from

[`Intent`](Intent.md).[`graphCoords`](Intent.md#graphcoords)

***

### defaultLocale?

> `optional` **defaultLocale**: [`Locale`](../type-aliases/Locale.md)

Defined in: [packages/stentor-models/src/Intent/Intent.ts:109](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L109)

This is the locale in which the app is primarily focused on. The intent will publish to this locale with the
data provided. Items which can be overwritten can be placed in the "locale" section with the locale necessary.

#### Default Value

```ts
"en"
```

#### Inherited from

[`Intent`](Intent.md).[`defaultLocale`](Intent.md#defaultlocale)

***

### contexts?

> `optional` **contexts**: `object`[]

Defined in: [packages/stentor-models/src/Intent/Intent.ts:122](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L122)

Contexts the must be active to have this intent be weighted more heavily or selected.

For Amazon Lex, the contexts are required to be selected.  

[https://docs.aws.amazon.com/lex/latest/dg/API\_PutIntent.html#lex-PutIntent-request-inputContexts](https://docs.aws.amazon.com/lex/latest/dg/API_PutIntent.html#lex-PutIntent-request-inputContexts)

For Dialogflow ES, these are more heavily weighted towards matching.

[https://cloud.google.com/dialogflow/es/docs/contexts-input-output#input\_contexts](https://cloud.google.com/dialogflow/es/docs/contexts-input-output#input_contexts)
[https://cloud.google.com/dialogflow/es/docs/reference/rest/v2/projects.agent.intents#Intent](https://cloud.google.com/dialogflow/es/docs/reference/rest/v2/projects.agent.intents#Intent)

#### name

> **name**: `string`

#### Inherited from

[`Intent`](Intent.md).[`contexts`](Intent.md#contexts)

***

### nlu?

> `optional` **nlu**: `object`

Defined in: [packages/stentor-models/src/Intent/Intent.ts:130](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L130)

NLU specific metadata used when translating the intentId to a NLU specific type.

Use to override the type for a specific NLU. 

Additional metadata can be appended that can be used for translating the type.

#### Index Signature

\[`nlu`: `string`\]: `object`

#### Inherited from

[`Intent`](Intent.md).[`nlu`](Intent.md#nlu)

***

### locales?

> `optional` **locales**: `Partial`\<`Record`\<[`Locale`](../type-aliases/Locale.md), [`LocaleSpecificIntent`](../type-aliases/LocaleSpecificIntent.md)\>\>

Defined in: [packages/stentor-models/src/Intent/Intent.ts:139](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L139)

This is a series of locales that the apps supports.  These can override the
items that are in the original Intent.  The items in the main intent are used as defaults if they
are not provided by this locale.

Locales are hierarchical. Languages will override the default attributes. Dialects will override the
languages.

#### Inherited from

[`Intent`](Intent.md).[`locales`](Intent.md#locales)
