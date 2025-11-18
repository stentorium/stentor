[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / FormCardInput

# Interface: FormCardInput

Defined in: [packages/stentor-models/src/Form/FormField.ts:158](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L158)

Card (text/image)

## Extends

- [`FormInput`](FormInput.md)

## Properties

### name

> **name**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:53](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L53)

Name of the form input, this is not human readable and is used to identify the field.

For example: "SERVICE" or "FULL_NAME"

#### Inherited from

[`FormInput`](FormInput.md).[`name`](FormInput.md#name)

***

### title?

> `optional` **title**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:57](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L57)

Optional title used to display on the input

#### Inherited from

[`FormInput`](FormInput.md).[`title`](FormInput.md#title)

***

### type

> **type**: `"CARD"` \| `"TEXT"` \| `"DROPDOWN"` \| `"CHECK"` \| `"CHIPS"` \| `"DATE"` \| `"DATERANGE"`

Defined in: [packages/stentor-models/src/Form/FormField.ts:61](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L61)

Type of the input

#### Inherited from

[`FormInput`](FormInput.md).[`type`](FormInput.md#type)

***

### shape?

> `optional` **shape**: `"ROUND"` \| `"SQUARE"`

Defined in: [packages/stentor-models/src/Form/FormField.ts:65](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L65)

Optional, used to shape the input.  Not applicable to all inputs.

#### Inherited from

[`FormInput`](FormInput.md).[`shape`](FormInput.md#shape)

***

### condition?

> `optional` **condition**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:72](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L72)

A condition that must be met for the field to be shown.

For example: "issue === 'service_repair'" - issue is a field name in this example

#### Inherited from

[`FormInput`](FormInput.md).[`condition`](FormInput.md#condition)

***

### mandatory?

> `optional` **mandatory**: `boolean`

Defined in: [packages/stentor-models/src/Form/FormField.ts:76](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L76)

Is the field required.

#### Inherited from

[`FormInput`](FormInput.md).[`mandatory`](FormInput.md#mandatory)

***

### mandatoryError?

> `optional` **mandatoryError**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:80](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L80)

Error message to show when the field is required but not filled out.

#### Inherited from

[`FormInput`](FormInput.md).[`mandatoryError`](FormInput.md#mandatoryerror)

***

### mandatoryGroup?

> `optional` **mandatoryGroup**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:84](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L84)

Group fields together where one of the fields in the group is required.

#### Inherited from

[`FormInput`](FormInput.md).[`mandatoryGroup`](FormInput.md#mandatorygroup)

***

### style?

> `optional` **style**: `object`

Defined in: [packages/stentor-models/src/Form/FormField.ts:90](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L90)

React.CSSProperties style object to apply to the field.

For example: {{ width: '300px', height: '150px' }}

#### Inherited from

[`FormInput`](FormInput.md).[`style`](FormInput.md#style)

***

### header?

> `optional` **header**: `object`

Defined in: [packages/stentor-models/src/Form/FormField.ts:159](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L159)

#### title

> **title**: `string`

#### subheader?

> `optional` **subheader**: `string`

***

### media?

> `optional` **media**: `object`

Defined in: [packages/stentor-models/src/Form/FormField.ts:164](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L164)

#### height?

> `optional` **height**: `number`

#### width?

> `optional` **width**: `number`

#### imageUrl

> **imageUrl**: `string`

#### alt?

> `optional` **alt**: `string`

***

### text?

> `optional` **text**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:171](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L171)

***

### variant?

> `optional` **variant**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:172](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L172)

***

### color?

> `optional` **color**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:173](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L173)

***

### align?

> `optional` **align**: `string`

Defined in: [packages/stentor-models/src/Form/FormField.ts:174](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Form/FormField.ts#L174)
