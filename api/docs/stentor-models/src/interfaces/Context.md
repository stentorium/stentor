[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / Context

# Interface: Context\<S\>

Defined in: [packages/stentor-models/src/Context.ts:48](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Context.ts#L48)

Context object that is passed around while formulating the response.

It contains contextual information relevant to the user.

## Type Parameters

### S

`S` *extends* [`Storage`](Storage.md) = [`Storage`](Storage.md)

## Properties

### ~~device~~

> **device**: [`Device`](Device.md)

Defined in: [packages/stentor-models/src/Context.ts:54](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Context.ts#L54)

Information about the current device the user is on within the channel.

#### Deprecated

- Will be removed in next major release.  You can find the same information on the request.  The information will continue to be in both places until removal.

***

### storage

> **storage**: `S`

Defined in: [packages/stentor-models/src/Context.ts:58](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Context.ts#L58)

Long term storage for the user.

***

### pii?

> `optional` **pii**: [`Pii`](Pii.md)

Defined in: [packages/stentor-models/src/Context.ts:62](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Context.ts#L62)

The PII record

***

### response

> **response**: [`AbstractResponseBuilder`](../classes/AbstractResponseBuilder.md)

Defined in: [packages/stentor-models/src/Context.ts:66](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Context.ts#L66)

The response builder.

***

### requestUserData?

> `optional` **requestUserData**: [`UserData`](../type-aliases/UserData.md)

Defined in: [packages/stentor-models/src/Context.ts:70](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Context.ts#L70)

A method that serves user profile data (email, location, phone number, etc)

***

### session?

> `optional` **session**: [`SessionStore`](SessionStore.md)

Defined in: [packages/stentor-models/src/Context.ts:74](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Context.ts#L74)

Session data. Gets deleted when session (id) changes)

***

### services

> **services**: [`ContextServices`](ContextServices.md)

Defined in: [packages/stentor-models/src/Context.ts:82](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Context.ts#L82)

Services available for the handlers

## Methods

### timeLeftInMillis()?

> `optional` **timeLeftInMillis**(): `number`

Defined in: [packages/stentor-models/src/Context.ts:78](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Context.ts#L78)

Milliseconds left from the execution (NOTE: infinity if not executing in a lambda)

#### Returns

`number`
