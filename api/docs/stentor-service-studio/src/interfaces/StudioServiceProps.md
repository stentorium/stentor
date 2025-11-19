[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-service-studio/src](../README.md) / StudioServiceProps

# Interface: StudioServiceProps

Defined in: [packages/stentor-service-studio/src/StudioService.ts:23](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-studio/src/StudioService.ts#L23)

## Properties

### baseURL?

> `optional` **baseURL**: `string`

Defined in: [packages/stentor-service-studio/src/StudioService.ts:27](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-studio/src/StudioService.ts#L27)

Defaults to https://api.xapp.ai, update this if you have a single tenant instance of OC Studio.

***

### token?

> `optional` **token**: `string`

Defined in: [packages/stentor-service-studio/src/StudioService.ts:31](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-studio/src/StudioService.ts#L31)

Machine to machine token associated with the appId, used for authentication

***

### orgToken?

> `optional` **orgToken**: `string`

Defined in: [packages/stentor-service-studio/src/StudioService.ts:35](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-studio/src/StudioService.ts#L35)

Optional, organization level token that has access to all applications within the organization.

***

### appId?

> `optional` **appId**: `string`

Defined in: [packages/stentor-service-studio/src/StudioService.ts:39](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-studio/src/StudioService.ts#L39)

The appId for the application you are requesting information for.

***

### preFilterFAQs?

> `optional` **preFilterFAQs**: `boolean`

Defined in: [packages/stentor-service-studio/src/StudioService.ts:43](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-service-studio/src/StudioService.ts#L43)

Previously true by default, we are not phasing this out.  You can set this to be true if you want to pre-filter the FAQs as done previously.
