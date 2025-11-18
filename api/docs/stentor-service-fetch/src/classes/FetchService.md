[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-service-fetch/src](../README.md) / FetchService

# Abstract Class: FetchService

Defined in: [packages/stentor-service-fetch/src/FetchService.ts:33](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-fetch/src/FetchService.ts#L33)

Abstract service for services that primarily rely on the fetch API.

It includes built-in timeout feature to better keep track of external APIs.

## Export

FetchService

## Extends

- [`AbstractService`](AbstractService.md)

## Constructors

### Constructor

> **new FetchService**(`props?`): `FetchService`

Defined in: [packages/stentor-service-fetch/src/AbstractService.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-fetch/src/AbstractService.ts#L13)

#### Parameters

##### props?

`BaseService`

#### Returns

`FetchService`

#### Inherited from

[`AbstractService`](AbstractService.md).[`constructor`](AbstractService.md#constructor)

## Properties

### timeout

> `readonly` **timeout**: `number` = `1000`

Defined in: [packages/stentor-service-fetch/src/AbstractService.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-fetch/src/AbstractService.ts#L9)

Timeout

#### Inherited from

[`AbstractService`](AbstractService.md).[`timeout`](AbstractService.md#timeout)

***

### retryAttempts

> `readonly` **retryAttempts**: `number` = `0`

Defined in: [packages/stentor-service-fetch/src/AbstractService.ts:10](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-fetch/src/AbstractService.ts#L10)

How many attempts to make on the API

#### Inherited from

[`AbstractService`](AbstractService.md).[`retryAttempts`](AbstractService.md#retryattempts)

***

### logs

> `readonly` **logs**: `boolean` = `false`

Defined in: [packages/stentor-service-fetch/src/AbstractService.ts:11](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-fetch/src/AbstractService.ts#L11)

Log information from the service

#### Inherited from

[`AbstractService`](AbstractService.md).[`logs`](AbstractService.md#logs)

## Methods

### fetch()

> `protected` **fetch**(`url`, `options?`): `Promise`\<`Response`\>

Defined in: [packages/stentor-service-fetch/src/FetchService.ts:39](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-fetch/src/FetchService.ts#L39)

Wrapper around fetch to add some basic diagnostics

Will throw a TimeoutError if the timeout is reached.

#### Parameters

##### url

`string`

##### options?

`RequestInit` & [`WithTimeout`](../interfaces/WithTimeout.md)

#### Returns

`Promise`\<`Response`\>
