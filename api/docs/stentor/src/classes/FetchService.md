[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / FetchService

# Abstract Class: FetchService

Defined in: packages/stentor-service-fetch/lib/FetchService.d.ts:24

Abstract service for services that primarily rely on the fetch API.

It includes built-in timeout feature to better keep track of external APIs.

## Export

FetchService

## Extends

- `AbstractService`

## Constructors

### Constructor

> **new FetchService**(`props?`): `FetchService`

Defined in: packages/stentor-service-fetch/lib/AbstractService.d.ts:11

#### Parameters

##### props?

`BaseService`

#### Returns

`FetchService`

#### Inherited from

`AbstractService.constructor`

## Properties

### timeout

> `readonly` **timeout**: `number`

Defined in: packages/stentor-service-fetch/lib/AbstractService.d.ts:8

Timeout

#### Inherited from

`AbstractService.timeout`

***

### retryAttempts

> `readonly` **retryAttempts**: `number`

Defined in: packages/stentor-service-fetch/lib/AbstractService.d.ts:9

How many attempts to make on the API

#### Inherited from

`AbstractService.retryAttempts`

***

### logs

> `readonly` **logs**: `boolean`

Defined in: packages/stentor-service-fetch/lib/AbstractService.d.ts:10

Log information from the service

#### Inherited from

`AbstractService.logs`

## Methods

### fetch()

> `protected` **fetch**(`url`, `options?`): `Promise`\<`Response`\>

Defined in: packages/stentor-service-fetch/lib/FetchService.d.ts:30

Wrapper around fetch to add some basic diagnostics

Will throw a TimeoutError if the timeout is reached.

#### Parameters

##### url

`string`

##### options?

`RequestInit` & [`WithTimeout`](../interfaces/WithTimeout.md)

#### Returns

`Promise`\<`Response`\>
