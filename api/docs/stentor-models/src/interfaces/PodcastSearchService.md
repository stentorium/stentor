[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / PodcastSearchService

# Interface: PodcastSearchService

Defined in: [packages/stentor-models/src/Services/PodcastSearchService.ts:4](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/PodcastSearchService.ts#L4)

## Properties

### queryOnly

> **queryOnly**: `boolean`

Defined in: [packages/stentor-models/src/Services/PodcastSearchService.ts:5](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/PodcastSearchService.ts#L5)

## Methods

### queryPodcastEpisode()

> **queryPodcastEpisode**(`podcastIds`, `q`): `Promise`\<[`PodcastEpisode`](PodcastEpisode.md)[]\>

Defined in: [packages/stentor-models/src/Services/PodcastSearchService.ts:6](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/PodcastSearchService.ts#L6)

#### Parameters

##### podcastIds

`string`[]

##### q

`string`

#### Returns

`Promise`\<[`PodcastEpisode`](PodcastEpisode.md)[]\>

***

### storePodcastEpisode()

> **storePodcastEpisode**(`podcastId`, `episode`): `Promise`\<`void`\>

Defined in: [packages/stentor-models/src/Services/PodcastSearchService.ts:7](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/PodcastSearchService.ts#L7)

#### Parameters

##### podcastId

`string`

##### episode

[`PodcastEpisode`](PodcastEpisode.md)

#### Returns

`Promise`\<`void`\>

***

### loadPodcastEpisode()

> **loadPodcastEpisode**(`podcastIds`): `Promise`\<[`PodcastEpisode`](PodcastEpisode.md)[]\>

Defined in: [packages/stentor-models/src/Services/PodcastSearchService.ts:8](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/PodcastSearchService.ts#L8)

#### Parameters

##### podcastIds

`string`[]

#### Returns

`Promise`\<[`PodcastEpisode`](PodcastEpisode.md)[]\>

***

### removePodcastEpisode()

> **removePodcastEpisode**(`podcastId`, `episode`): `Promise`\<`void`\>

Defined in: [packages/stentor-models/src/Services/PodcastSearchService.ts:9](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/Services/PodcastSearchService.ts#L9)

#### Parameters

##### podcastId

`string`

##### episode

[`PodcastEpisode`](PodcastEpisode.md)

#### Returns

`Promise`\<`void`\>
