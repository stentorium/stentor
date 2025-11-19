[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-service-fetch/src](../README.md) / AbstractService

# Abstract Class: AbstractService

Defined in: [packages/stentor-service-fetch/src/AbstractService.ts:8](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-fetch/src/AbstractService.ts#L8)

Abstract service

## Extended by

- [`FetchService`](FetchService.md)

## Implements

- `BaseService`

## Constructors

### Constructor

> **new AbstractService**(`props?`): `AbstractService`

Defined in: [packages/stentor-service-fetch/src/AbstractService.ts:13](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-fetch/src/AbstractService.ts#L13)

#### Parameters

##### props?

`BaseService`

#### Returns

`AbstractService`

## Properties

### timeout

> `readonly` **timeout**: `number` = `1000`

Defined in: [packages/stentor-service-fetch/src/AbstractService.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-fetch/src/AbstractService.ts#L9)

Timeout

#### Implementation of

`BaseService.timeout`

***

### retryAttempts

> `readonly` **retryAttempts**: `number` = `0`

Defined in: [packages/stentor-service-fetch/src/AbstractService.ts:10](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-fetch/src/AbstractService.ts#L10)

How many attempts to make on the API

#### Implementation of

`BaseService.retryAttempts`

***

### logs

> `readonly` **logs**: `boolean` = `false`

Defined in: [packages/stentor-service-fetch/src/AbstractService.ts:11](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-fetch/src/AbstractService.ts#L11)

Log information from the service

#### Implementation of

`BaseService.logs`
