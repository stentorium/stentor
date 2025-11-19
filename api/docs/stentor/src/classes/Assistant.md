[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor/src](../README.md) / Assistant

# Class: Assistant

Defined in: [packages/stentor/src/Assistant.ts:46](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor/src/Assistant.ts#L46)

Omni-channel assistant application builder.

## Constructors

### Constructor

> **new Assistant**(): `Assistant`

#### Returns

`Assistant`

## Methods

### withRuntimeData()

> **withRuntimeData**(`runtime`): `Assistant`

Defined in: [packages/stentor/src/Assistant.ts:66](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor/src/Assistant.ts#L66)

**`Beta`**

Data that can be leveraged at runtime for certain responses.

#### Parameters

##### runtime

`AppRuntimeData`

Runtime data

#### Returns

`Assistant`

***

### withChannels()

> **withChannels**(`channels`): `Assistant`

Defined in: [packages/stentor/src/Assistant.ts:77](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor/src/Assistant.ts#L77)

Supply the assistant with channels for use at runtime.

#### Parameters

##### channels

[`Channel`](../interfaces/Channel.md)[]

An array of channels the assistant supports

#### Returns

`Assistant`

***

### withHandlers()

> **withHandlers**(`handlers`): `Assistant`

Defined in: [packages/stentor/src/Assistant.ts:92](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor/src/Assistant.ts#L92)

Provide a set of custom handlers that are available to the assistant application.

#### Parameters

##### handlers

Custom handlers available at runtime

[`HandlersArray`](../type-aliases/HandlersArray.md) | [`HandlersKeyValue`](../interfaces/HandlersKeyValue.md) | `DelegatingHandlersMap`

#### Returns

`Assistant`

#### Remarks

Providing custom handlers allows you to extend functionality beyond what the
basic dialog management provides.

***

### withHandlerService()

> **withHandlerService**(`handlerService`): `Assistant`

Defined in: [packages/stentor/src/Assistant.ts:109](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor/src/Assistant.ts#L109)

Provide the assistant a handler service to query content at runtime.

#### Parameters

##### handlerService

`HandlerService`

#### Returns

`Assistant`

***

### withKnowledgeBaseService()

> **withKnowledgeBaseService**(`service`, `config`): `Assistant`

Defined in: [packages/stentor/src/Assistant.ts:121](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor/src/Assistant.ts#L121)

Add a Knowledge Base Service that is called on particular requests and the results are appended to the request.

#### Parameters

##### service

`KnowledgeBaseService`

Service that impelements KnowledgeBaseService

##### config

`KnowledgeBaseConfig`

Configuration for when to call the service and how the results should be used.

#### Returns

`Assistant`

***

### withPiiService()

> **withPiiService**(`piiService`): `Assistant`

Defined in: [packages/stentor/src/Assistant.ts:144](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor/src/Assistant.ts#L144)

**`Beta`**

The PII service keeps all personally identifiable information separated from
user data that does not contain any PII.

#### Parameters

##### piiService

`PIIService`

#### Returns

`Assistant`

***

### withCrmService()

> **withCrmService**(`crmService`): `Assistant`

Defined in: [packages/stentor/src/Assistant.ts:156](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor/src/Assistant.ts#L156)

**`Beta`**

The CRM service send the collected sales leads to a CRM server.

#### Parameters

##### crmService

[`CrmService`](../interfaces/CrmService.md)

#### Returns

`Assistant`

***

### withSmsService()

> **withSmsService**(`smsService`): `Assistant`

Defined in: [packages/stentor/src/Assistant.ts:168](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor/src/Assistant.ts#L168)

**`Beta`**

The SMS service sends text messages

#### Parameters

##### smsService

`SMSService`

#### Returns

`Assistant`

***

### withUserStorage()

> **withUserStorage**(`userStorage`): `Assistant`

Defined in: [packages/stentor/src/Assistant.ts:179](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor/src/Assistant.ts#L179)

Required service to store user data.

#### Parameters

##### userStorage

[`UserStorageService`](../interfaces/UserStorageService.md)

#### Returns

`Assistant`

***

### withHooks()

> **withHooks**(`hooks`): `Assistant`

Defined in: [packages/stentor/src/Assistant.ts:189](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor/src/Assistant.ts#L189)

Set runtime hooks on the Assistant.

#### Parameters

##### hooks

`Hooks`

Available runtime hooks

#### Returns

`Assistant`

***

### withEventStream()

> **withEventStream**(`stream`): `Assistant`

Defined in: [packages/stentor/src/Assistant.ts:201](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor/src/Assistant.ts#L201)

**`Beta`**

#### Parameters

##### stream

`EventStream`

#### Returns

`Assistant`

***

### withEventPrefix()

> **withEventPrefix**(`prefix`): `Assistant`

Defined in: [packages/stentor/src/Assistant.ts:214](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor/src/Assistant.ts#L214)

**`Beta`**

Add an prefix to your events.  This is a key value pair that is prefixed
to all of your events.

#### Parameters

##### prefix

`EventPrefix`

#### Returns

`Assistant`

***

### lambda()

> **lambda**(): `Handler`

Defined in: [packages/stentor/src/Assistant.ts:302](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor/src/Assistant.ts#L302)

Build the assistant application to run on AWS Lambda

#### Returns

`Handler`

***

### express()

> **express**(`app?`, `path?`): `Application`

Defined in: [packages/stentor/src/Assistant.ts:417](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor/src/Assistant.ts#L417)

**`Beta`**

Returns an express.js application.

You must start the server that is passed out with:
```
app.listen(SERVER_PORT);
```

#### Parameters

##### app?

`Application`

##### path?

`string` = `"/"`

#### Returns

`Application`
