[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Slot

# Interface: Slot

Defined in: [packages/stentor-models/src/Slot/Slot.ts:7](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Slot/Slot.ts#L7)

Slots available to the intent.

## Properties

### name

> **name**: `string`

Defined in: [packages/stentor-models/src/Slot/Slot.ts:14](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Slot/Slot.ts#L14)

The name of the slot, corresponds to how it is displayed in the
sample utterance.

For example: "Play {Podcast}" where Podcast is the name.

***

### type?

> `optional` **type**: `string`

Defined in: [packages/stentor-models/src/Slot/Slot.ts:22](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Slot/Slot.ts#L22)

The type of entity for the slot.

This corresponds to an Entity, specifically the entityId key.

For legacy applications, SlotType is used.

***

### nlu?

> `optional` **nlu**: `object`

Defined in: [packages/stentor-models/src/Slot/Slot.ts:28](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Slot/Slot.ts#L28)

NLU specific metadata used when translating to the NLU entity.

Use to override the type for a specific NLU.

#### Index Signature

\[`nlu`: `string`\]: `object`

***

### isList?

> `optional` **isList**: `number` \| `boolean`

Defined in: [packages/stentor-models/src/Slot/Slot.ts:40](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Slot/Slot.ts#L40)

Is the slot a list of values.

#### Remarks

Supported natively by Dialogflow and shims for Alexa.

Can be a boolean or number.  When a number is used, it provides guidance to the Alexa shim on the max amount of expected
items in the list.  Minimum value is 2.  Value defaults to 6 when set to true.

Only one isList slot is supported per utterance pattern.

***

### slotElicitationContentKey?

> `optional` **slotElicitationContentKey**: `string`

Defined in: [packages/stentor-models/src/Slot/Slot.ts:46](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Slot/Slot.ts#L46)

When set, if the slot is not provided by the user the key will be used to 
get the response off of the content for the handler in order to ask the user
to provide the slot.

***

### inputText?

> `optional` **inputText**: `string`

Defined in: [packages/stentor-models/src/Slot/Slot.ts:61](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Slot/Slot.ts#L61)

Human readable description of what kind of information
the slot is expecting.  The text should be very brief.  For example:

"zip"
"zip code"
"city"
"state"
"street"

#### Memberof

Slot

***

### obfuscateValue?

> `optional` **obfuscateValue**: `"FULL"` \| `"PARTIAL"`

Defined in: [packages/stentor-models/src/Slot/Slot.ts:70](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Slot/Slot.ts#L70)

The slot will be obfuscated either fully or partially.  

* Full obfuscation, the slot is replaced with the slot name.  "my name is ${first_name}"
* Partial obfuscation will only display a subset of characters, enough to protect the full value but enough for someone that is debugging to recognize the value.

For some NLU, such as Amazon Lex, any setting on this value will be interpretted as obfuscated, for more information see [Amazon Lex Slot Obfuscation](https://docs.aws.amazon.com/lex/latest/dg/how-obfuscate.html)
