[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / FormInput

# Interface: FormInput

Defined in: [packages/stentor-models/src/Form/FormField.ts:47](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L47)

Form field base class

## Extended by

- [`FormTextInput`](FormTextInput.md)
- [`FormDropdownInput`](FormDropdownInput.md)
- [`FormChipsInput`](FormChipsInput.md)
- [`FormSelectInput`](FormSelectInput.md)
- [`FormCardInput`](FormCardInput.md)
- [`FormDateInput`](FormDateInput.md)
- [`FormDateRangeInput`](FormDateRangeInput.md)

## Properties

### name

> **name**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:53](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L53)

Name of the form input, this is not human readable and is used to identify the field.

For example: "SERVICE" or "FULL_NAME"

***

### title?

> `optional` **title**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:57](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L57)

Optional title used to display on the input

***

### type

> **type**: `"CARD"` \| `"TEXT"` \| `"DROPDOWN"` \| `"CHECK"` \| `"CHIPS"` \| `"DATE"` \| `"DATERANGE"`

Defined in: [packages/stentor-models/src/Form/FormField.ts:61](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L61)

Type of the input

***

### shape?

> `optional` **shape**: `"ROUND"` \| `"SQUARE"`

Defined in: [packages/stentor-models/src/Form/FormField.ts:65](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L65)

Optional, used to shape the input.  Not applicable to all inputs.

***

### condition?

> `optional` **condition**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:72](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L72)

A condition that must be met for the field to be shown.

For example: "issue === 'service_repair'" - issue is a field name in this example

***

### mandatory?

> `optional` **mandatory**: `boolean`

Defined in: [packages/stentor-models/src/Form/FormField.ts:76](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L76)

Is the field required.

***

### mandatoryError?

> `optional` **mandatoryError**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:80](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L80)

Error message to show when the field is required but not filled out.

***

### mandatoryGroup?

> `optional` **mandatoryGroup**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:84](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L84)

Group fields together where one of the fields in the group is required.

***

### style?

> `optional` **style**: `object`

Defined in: [packages/stentor-models/src/Form/FormField.ts:90](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L90)

React.CSSProperties style object to apply to the field.

For example: {{ width: '300px', height: '150px' }}
