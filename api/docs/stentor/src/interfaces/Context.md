[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / Context

# Interface: Context\<S\>

Defined in: packages/stentor-models/lib/Context.d.ts:42

Context object that is passed around while formulating the response.

It contains contextual information relevant to the user.

## Type Parameters

### S

`S` *extends* [`Storage`](Storage.md) = [`Storage`](Storage.md)

## Properties

### ~~device~~

> **device**: [`Device`](Device.md)

Defined in: packages/stentor-models/lib/Context.d.ts:48

Information about the current device the user is on within the channel.

#### Deprecated

- Will be removed in next major release.  You can find the same information on the request.  The information will continue to be in both places until removal.

***

### storage

> **storage**: `S`

Defined in: packages/stentor-models/lib/Context.d.ts:52

Long term storage for the user.

***

### pii?

> `optional` **pii**: `Pii`

Defined in: packages/stentor-models/lib/Context.d.ts:56

The PII record

***

### response

> **response**: `AbstractResponseBuilder`

Defined in: packages/stentor-models/lib/Context.d.ts:60

The response builder.

***

### requestUserData?

> `optional` **requestUserData**: `UserData`

Defined in: packages/stentor-models/lib/Context.d.ts:64

A method that serves user profile data (email, location, phone number, etc)

***

### session?

> `optional` **session**: `SessionStore`

Defined in: packages/stentor-models/lib/Context.d.ts:68

Session data. Gets deleted when session (id) changes)

***

### services

> **services**: `ContextServices`

Defined in: packages/stentor-models/lib/Context.d.ts:76

Services available for the handlers

## Methods

### timeLeftInMillis()?

> `optional` **timeLeftInMillis**(): `number`

Defined in: packages/stentor-models/lib/Context.d.ts:72

Milliseconds left from the execution (NOTE: infinity if not executing in a lambda)

#### Returns

`number`
