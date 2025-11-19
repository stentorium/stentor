[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / PaymentType

# Type Alias: PaymentType

> **PaymentType** = `"PAYMENT_TYPE_UNSPECIFIED"` \| `"PAYMENT_CARD"` \| `"BANK"` \| `"LOYALTY_PROGRAM"` \| `"CASH"` \| `"GIFT_CARD"` \| `"WALLET"`

Defined in: [packages/stentor-models/src/Response/Transactions.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Response/Transactions.ts#L9)

Here we go again. We are abstracting the Stentor input following a platform. In this case Google.
This is a more common sense (more user-friendly), de-googlified version of the Google inputs.
This transaction API could change in the future as we gain more experience.
