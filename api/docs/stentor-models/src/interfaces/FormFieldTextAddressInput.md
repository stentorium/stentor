[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / FormFieldTextAddressInput

# Interface: FormFieldTextAddressInput

Defined in: [packages/stentor-models/src/Form/FormField.ts:93](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L93)

Text input. Validate according to the format.

## Extends

- [`FormTextInput`](FormTextInput.md)

## Properties

### name

> **name**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:53](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L53)

Name of the form input, this is not human readable and is used to identify the field.

For example: "SERVICE" or "FULL_NAME"

#### Inherited from

[`FormTextInput`](FormTextInput.md).[`name`](FormTextInput.md#name)

***

### title?

> `optional` **title**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:57](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L57)

Optional title used to display on the input

#### Inherited from

[`FormTextInput`](FormTextInput.md).[`title`](FormTextInput.md#title)

***

### type

> **type**: `"CARD"` \| `"TEXT"` \| `"DROPDOWN"` \| `"CHECK"` \| `"CHIPS"` \| `"DATE"` \| `"DATERANGE"`

Defined in: [packages/stentor-models/src/Form/FormField.ts:61](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L61)

Type of the input

#### Inherited from

[`FormTextInput`](FormTextInput.md).[`type`](FormTextInput.md#type)

***

### shape?

> `optional` **shape**: `"ROUND"` \| `"SQUARE"`

Defined in: [packages/stentor-models/src/Form/FormField.ts:65](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L65)

Optional, used to shape the input.  Not applicable to all inputs.

#### Inherited from

[`FormTextInput`](FormTextInput.md).[`shape`](FormTextInput.md#shape)

***

### condition?

> `optional` **condition**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:72](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L72)

A condition that must be met for the field to be shown.

For example: "issue === 'service_repair'" - issue is a field name in this example

#### Inherited from

[`FormTextInput`](FormTextInput.md).[`condition`](FormTextInput.md#condition)

***

### mandatory?

> `optional` **mandatory**: `boolean`

Defined in: [packages/stentor-models/src/Form/FormField.ts:76](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L76)

Is the field required.

#### Inherited from

[`FormTextInput`](FormTextInput.md).[`mandatory`](FormTextInput.md#mandatory)

***

### mandatoryError?

> `optional` **mandatoryError**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:80](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L80)

Error message to show when the field is required but not filled out.

#### Inherited from

[`FormTextInput`](FormTextInput.md).[`mandatoryError`](FormTextInput.md#mandatoryerror)

***

### mandatoryGroup?

> `optional` **mandatoryGroup**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:84](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L84)

Group fields together where one of the fields in the group is required.

#### Inherited from

[`FormTextInput`](FormTextInput.md).[`mandatoryGroup`](FormTextInput.md#mandatorygroup)

***

### style?

> `optional` **style**: `object`

Defined in: [packages/stentor-models/src/Form/FormField.ts:90](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L90)

React.CSSProperties style object to apply to the field.

For example: {{ width: '300px', height: '150px' }}

#### Inherited from

[`FormTextInput`](FormTextInput.md).[`style`](FormTextInput.md#style)

***

### format

> **format**: `"ADDRESS"`

Defined in: [packages/stentor-models/src/Form/FormField.ts:94](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L94)

#### Overrides

[`FormTextInput`](FormTextInput.md).[`format`](FormTextInput.md#format)

***

### mapsBaseUrl?

> `optional` **mapsBaseUrl**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:98](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L98)

Base URL of an endpoint that adheres to the Google Maps Location Autocomplete API.

***

### mapsUrlQueryParams?

> `optional` **mapsUrlQueryParams**: [`AddressAutocompleteParameters`](AddressAutocompleteParameters.md)

Defined in: [packages/stentor-models/src/Form/FormField.ts:102](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L102)

Optional query parameters to help limit the results returned by the Google Maps Autocomplete API.

***

### googleMapsApiKey?

> `optional` **googleMapsApiKey**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:106](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L106)

Required when you are using the official Google Maps Autocomplete API.

***

### multiline?

> `optional` **multiline**: `boolean`

Defined in: [packages/stentor-models/src/Form/FormField.ts:113](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L113)

#### Inherited from

[`FormTextInput`](FormTextInput.md).[`multiline`](FormTextInput.md#multiline)

***

### placeholder?

> `optional` **placeholder**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:115](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L115)

#### Inherited from

[`FormTextInput`](FormTextInput.md).[`placeholder`](FormTextInput.md#placeholder)

***

### label?

> `optional` **label**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:117](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L117)

#### Inherited from

[`FormTextInput`](FormTextInput.md).[`label`](FormTextInput.md#label)

***

### rows?

> `optional` **rows**: `number`

Defined in: [packages/stentor-models/src/Form/FormField.ts:120](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L120)

#### Inherited from

[`FormTextInput`](FormTextInput.md).[`rows`](FormTextInput.md#rows)

***

### rowsMax?

> `optional` **rowsMax**: `number`

Defined in: [packages/stentor-models/src/Form/FormField.ts:121](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L121)

#### Inherited from

[`FormTextInput`](FormTextInput.md).[`rowsMax`](FormTextInput.md#rowsmax)
