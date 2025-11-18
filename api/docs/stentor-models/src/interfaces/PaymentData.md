[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / PaymentData

# Interface: PaymentData

Defined in: [packages/stentor-models/src/Response/Transactions.ts:162](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Transactions.ts#L162)

## Properties

### paymentResult

> **paymentResult**: `object`

Defined in: [packages/stentor-models/src/Response/Transactions.ts:163](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Transactions.ts#L163)

#### googlePaymentData?

> `optional` **googlePaymentData**: `string`

#### merchantPaymentMethodId

> **merchantPaymentMethodId**: `string`

***

### paymentInfo

> **paymentInfo**: `object`

Defined in: [packages/stentor-models/src/Response/Transactions.ts:167](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Transactions.ts#L167)

#### paymentMethodDisplayInfo

> **paymentMethodDisplayInfo**: `object`

##### paymentMethodDisplayInfo.paymentType

> **paymentType**: [`PaymentType`](../type-aliases/PaymentType.md)

##### paymentMethodDisplayInfo.paymentMethodDisplayName

> **paymentMethodDisplayName**: `string`

#### paymentMethodProvenance

> **paymentMethodProvenance**: [`ProvenanceType`](../type-aliases/ProvenanceType.md)
