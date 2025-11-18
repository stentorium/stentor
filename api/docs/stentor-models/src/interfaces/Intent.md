[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Intent

# Interface: Intent

Defined in: [packages/stentor-models/src/Intent/Intent.ts:22](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L22)

Intents represent the request of a user.

## Extends

- [`Localizable`](Localizable.md)\<[`LocaleSpecificIntent`](../type-aliases/LocaleSpecificIntent.md)\>

## Extended by

- [`Handler`](Handler.md)

## Properties

### organizationId

> **organizationId**: `string`

Defined in: [packages/stentor-models/src/Intent/Intent.ts:26](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L26)

The organization ID for the app of which this intent belongs.

***

### appId

> **appId**: `string`

Defined in: [packages/stentor-models/src/Intent/Intent.ts:30](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L30)

The ID for the app the intent belongs to.

***

### intentId

> **intentId**: `string`

Defined in: [packages/stentor-models/src/Intent/Intent.ts:35](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L35)

The ID of the intent, typically a combination of the name
and a random string.

***

### ~~dialogflowId?~~

> `optional` **dialogflowId**: `string`

Defined in: [packages/stentor-models/src/Intent/Intent.ts:41](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L41)

Dialogflow keeps track of individual intents by a unique ID.

#### Deprecated

This field is being phased out.

***

### name?

> `optional` **name**: `string`

Defined in: [packages/stentor-models/src/Intent/Intent.ts:45](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L45)

The human readable name of the intent.

***

### createdAt?

> `optional` **createdAt**: `string`

Defined in: [packages/stentor-models/src/Intent/Intent.ts:49](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L49)

ISO-8601 string of when the intent was created.

***

### slots?

> `optional` **slots**: [`Slot`](Slot.md)[]

Defined in: [packages/stentor-models/src/Intent/Intent.ts:54](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L54)

The slots defined within the utterance patterns
and their Entity types.

***

### ~~slotTypes?~~

> `optional` **slotTypes**: [`SlotTypeMap`](SlotTypeMap.md)

Defined in: [packages/stentor-models/src/Intent/Intent.ts:60](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L60)

A map of the slot type definition.

#### Deprecated

Use Entities

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

***

### utterancePatterns?

> `optional` **utterancePatterns**: `string`[]

Defined in: [packages/stentor-models/src/Intent/Intent.ts:90](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L90)

An array of utterance patterns.

For more information on syntax see [https://github.com/alexa-js/alexa-utterances](https://github.com/alexa-js/alexa-utterances)

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

This is no longer in use (it was in fact, never used).  Favor [Intent.defaultLocale](Handler.md#defaultlocale) and [Intent.locales](Handler.md#locales) instead.

***

### graphCoords?

> `optional` **graphCoords**: [`GraphCoords`](GraphCoords.md)

Defined in: [packages/stentor-models/src/Intent/Intent.ts:102](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L102)

UI position coordinates for graphing.

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

#### Overrides

[`Localizable`](Localizable.md).[`defaultLocale`](Localizable.md#defaultlocale)

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

***

### nlu?

> `optional` **nlu**: `object`

Defined in: [packages/stentor-models/src/Intent/Intent.ts:130](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L130)

NLU specific metadata used when translating the intentId to a NLU specific type.

Use to override the type for a specific NLU. 

Additional metadata can be appended that can be used for translating the type.

#### Index Signature

\[`nlu`: `string`\]: `object`

***

### locales?

> `optional` **locales**: `Partial`\<`Record`\<[`Locale`](../type-aliases/Locale.md), [`LocaleSpecificIntent`](../type-aliases/LocaleSpecificIntent.md)\>\>

Defined in: [packages/stentor-models/src/Intent/Intent.ts:139](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Intent/Intent.ts#L139)

This is a series of locales that the apps supports.  These can override the
items that are in the original Intent.  The items in the main intent are used as defaults if they
are not provided by this locale.

Locales are hierarchical. Languages will override the default attributes. Dialects will override the
languages.

#### Overrides

[`Localizable`](Localizable.md).[`locales`](Localizable.md#locales)
