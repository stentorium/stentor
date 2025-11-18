[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-media/src](../README.md) / RSSFeed

# Class: RSSFeed\<T\>

Defined in: [packages/stentor-media/src/RSSFeed.ts:22](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-media/src/RSSFeed.ts#L22)

A list of playables

The playlist also supports SchedulablePlayables.

## Extends

- [`MediaPlaylist`](MediaPlaylist.md)\<`T`\>

## Extended by

- [`Podcast`](Podcast.md)

## Type Parameters

### T

`T` *extends* `RSSFeedItemPlayableMedia` = `RSSFeedItemPlayableMedia`

## Indexable

\[`n`: `number`\]: `T`

## Constructors

### Constructor

> **new RSSFeed**\<`T`\>(`props?`): `RSSFeed`\<`T`\>

Defined in: [packages/stentor-media/src/RSSFeed.ts:39](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-media/src/RSSFeed.ts#L39)

#### Parameters

##### props?

`RSSFeed`\<`T`\> | [`MediaPlaylist`](MediaPlaylist.md)\<`T`\> | [`Playlist`](Playlist.md)\<`T`\> | `T`[] | [`RSSFeedProps`](../interfaces/RSSFeedProps.md)\<`T`\> | [`MediaPlaylistProps`](../interfaces/MediaPlaylistProps.md)\<`T`\> | [`PlaylistProps`](../interfaces/PlaylistProps.md)\<`T`\>

#### Returns

`RSSFeed`\<`T`\>

#### Overrides

[`MediaPlaylist`](MediaPlaylist.md).[`constructor`](MediaPlaylist.md#constructor)

## Properties

### name?

> `optional` **name**: `string`

Defined in: [packages/stentor-media/src/Playlist.ts:25](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-media/src/Playlist.ts#L25)

Name of the playlist

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`name`](MediaPlaylist.md#name)

***

### type

> `readonly` **type**: `RSSFeedType`

Defined in: [packages/stentor-media/src/RSSFeed.ts:23](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-media/src/RSSFeed.ts#L23)

#### Overrides

[`MediaPlaylist`](MediaPlaylist.md).[`type`](MediaPlaylist.md#type)

***

### url

> `readonly` **url**: `string`

Defined in: [packages/stentor-media/src/RSSFeed.ts:25](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-media/src/RSSFeed.ts#L25)

***

### title?

> `readonly` `optional` **title**: `string`

Defined in: [packages/stentor-media/src/RSSFeed.ts:27](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-media/src/RSSFeed.ts#L27)

***

### description?

> `readonly` `optional` **description**: `string`

Defined in: [packages/stentor-media/src/RSSFeed.ts:29](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-media/src/RSSFeed.ts#L29)

***

### subtitle?

> `readonly` `optional` **subtitle**: `string`

Defined in: [packages/stentor-media/src/RSSFeed.ts:31](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-media/src/RSSFeed.ts#L31)

***

### imageUrl?

> `readonly` `optional` **imageUrl**: `string`

Defined in: [packages/stentor-media/src/RSSFeed.ts:33](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-media/src/RSSFeed.ts#L33)

***

### explicit?

> `readonly` `optional` **explicit**: `boolean`

Defined in: [packages/stentor-media/src/RSSFeed.ts:35](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-media/src/RSSFeed.ts#L35)

***

### fetchTime?

> `readonly` `optional` **fetchTime**: `number`

Defined in: [packages/stentor-media/src/RSSFeed.ts:37](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-media/src/RSSFeed.ts#L37)

***

### \[unscopables\]

> `readonly` **\[unscopables\]**: `object`

Defined in: node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:97

Is an object whose properties have the value 'true'
when they will be absent when used in a 'with' statement.

#### Index Signature

\[`key`: `number`\]: `boolean`

#### find?

> `optional` **find**: `boolean`

#### findIndex?

> `optional` **findIndex**: `boolean`

#### fill?

> `optional` **fill**: `boolean`

#### copyWithin?

> `optional` **copyWithin**: `boolean`

#### \[iterator\]?

> `optional` **\[iterator\]**: `boolean`

#### entries?

> `optional` **entries**: `boolean`

#### keys?

> `optional` **keys**: `boolean`

#### values?

> `optional` **values**: `boolean`

#### \[unscopables\]?

> `readonly` `optional` **\[unscopables\]**: `boolean`

Is an object whose properties have the value 'true'
when they will be absent when used in a 'with' statement.

#### includes?

> `optional` **includes**: `boolean`

#### flatMap?

> `optional` **flatMap**: `boolean`

#### flat?

> `optional` **flat**: `boolean`

#### at?

> `optional` **at**: `boolean`

#### findLast?

> `optional` **findLast**: `boolean`

#### findLastIndex?

> `optional` **findLastIndex**: `boolean`

#### toReversed?

> `optional` **toReversed**: `boolean`

#### toSorted?

> `optional` **toSorted**: `boolean`

#### toSpliced?

> `optional` **toSpliced**: `boolean`

#### with?

> `optional` **with**: `boolean`

#### length?

> `optional` **length**: `boolean`

Gets or sets the length of the array. This is a number one higher than the highest index in the array.

#### toString?

> `optional` **toString**: `boolean`

#### toLocaleString?

> `optional` **toLocaleString**: `boolean`

#### pop?

> `optional` **pop**: `boolean`

#### push?

> `optional` **push**: `boolean`

#### concat?

> `optional` **concat**: `boolean`

#### join?

> `optional` **join**: `boolean`

#### reverse?

> `optional` **reverse**: `boolean`

#### shift?

> `optional` **shift**: `boolean`

#### slice?

> `optional` **slice**: `boolean`

#### sort?

> `optional` **sort**: `boolean`

#### splice?

> `optional` **splice**: `boolean`

#### unshift?

> `optional` **unshift**: `boolean`

#### indexOf?

> `optional` **indexOf**: `boolean`

#### lastIndexOf?

> `optional` **lastIndexOf**: `boolean`

#### every?

> `optional` **every**: `boolean`

#### some?

> `optional` **some**: `boolean`

#### forEach?

> `optional` **forEach**: `boolean`

#### map?

> `optional` **map**: `boolean`

#### filter?

> `optional` **filter**: `boolean`

#### reduce?

> `optional` **reduce**: `boolean`

#### reduceRight?

> `optional` **reduceRight**: `boolean`

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`[unscopables]`](MediaPlaylist.md#unscopables)

***

### \[species\]

> `readonly` `static` **\[species\]**: `ArrayConstructor`

Defined in: node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:316

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`[species]`](MediaPlaylist.md#species)

***

### length

> **length**: `number`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1329

Gets or sets the length of the array. This is a number one higher than the highest index in the array.

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`length`](MediaPlaylist.md#length)

## Methods

### concat()

> **concat**(`playlist`): [`Playlist`](Playlist.md)\<`T`\>

Defined in: [packages/stentor-media/src/Playlist.ts:77](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-media/src/Playlist.ts#L77)

Combines two or more arrays.
This method returns a new array without modifying any existing arrays.

#### Parameters

##### playlist

[`Playlist`](Playlist.md)\<`T`\>

#### Returns

[`Playlist`](Playlist.md)\<`T`\>

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`concat`](MediaPlaylist.md#concat)

***

### get()

> **get**(`token`): `T`

Defined in: [packages/stentor-media/src/Playlist.ts:89](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-media/src/Playlist.ts#L89)

Get an item from the playlist either by index or string,
where string is either the token or ID of the item in the
playlist.

#### Parameters

##### token

`string` | `number`

#### Returns

`T`

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`get`](MediaPlaylist.md#get)

***

### indexOf()

> **indexOf**(`playable`): `number`

Defined in: [packages/stentor-media/src/Playlist.ts:117](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-media/src/Playlist.ts#L117)

Returns the index of the provided playable or token, -1
if it doesn't exist in the playlist

#### Parameters

##### playable

`string` | `T`

#### Returns

`number`

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`indexOf`](MediaPlaylist.md#indexof)

***

### next()

> **next**(`current?`): `T`

Defined in: [packages/stentor-media/src/Playlist.ts:145](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-media/src/Playlist.ts#L145)

Get the next track in the playlist

#### Parameters

##### current?

`string` | `T`

#### Returns

`T`

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`next`](MediaPlaylist.md#next)

***

### previous()

> **previous**(`current?`): `T`

Defined in: [packages/stentor-media/src/Playlist.ts:206](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-media/src/Playlist.ts#L206)

Get the previous track in the playlist

#### Parameters

##### current?

`string` | `T`

#### Returns

`T`

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`previous`](MediaPlaylist.md#previous)

***

### latest()

> **latest**(): `T`

Defined in: [packages/stentor-media/src/Playlist.ts:229](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-media/src/Playlist.ts#L229)

Get the latest track in the playlist

#### Returns

`T`

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`latest`](MediaPlaylist.md#latest)

***

### toJSON()

> **toJSON**(): [`RSSFeedProps`](../interfaces/RSSFeedProps.md)\<`T`\>

Defined in: [packages/stentor-media/src/RSSFeed.ts:76](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-media/src/RSSFeed.ts#L76)

#### Returns

[`RSSFeedProps`](../interfaces/RSSFeedProps.md)\<`T`\>

#### Overrides

[`MediaPlaylist`](MediaPlaylist.md).[`toJSON`](MediaPlaylist.md#tojson)

***

### find()

#### Call Signature

> **find**\<`S`\>(`predicate`, `thisArg?`): `S`

Defined in: node\_modules/typescript/lib/lib.es2015.core.d.ts:29

Returns the value of the first element in the array where predicate is true, and undefined
otherwise.

##### Type Parameters

###### S

`S` *extends* `RSSFeedItemPlayableMedia`

##### Parameters

###### predicate

(`value`, `index`, `obj`) => `value is S`

find calls predicate once for each element of the array, in ascending
order, until it finds one where predicate returns true. If such an element is found, find
immediately returns that element value. Otherwise, find returns undefined.

###### thisArg?

`any`

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

##### Returns

`S`

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`find`](MediaPlaylist.md#find)

#### Call Signature

> **find**(`predicate`, `thisArg?`): `T`

Defined in: node\_modules/typescript/lib/lib.es2015.core.d.ts:30

##### Parameters

###### predicate

(`value`, `index`, `obj`) => `unknown`

###### thisArg?

`any`

##### Returns

`T`

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`find`](MediaPlaylist.md#find)

***

### findIndex()

> **findIndex**(`predicate`, `thisArg?`): `number`

Defined in: node\_modules/typescript/lib/lib.es2015.core.d.ts:41

Returns the index of the first element in the array where predicate is true, and -1
otherwise.

#### Parameters

##### predicate

(`value`, `index`, `obj`) => `unknown`

find calls predicate once for each element of the array, in ascending
order, until it finds one where predicate returns true. If such an element is found,
findIndex immediately returns that element index. Otherwise, findIndex returns -1.

##### thisArg?

`any`

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

#### Returns

`number`

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`findIndex`](MediaPlaylist.md#findindex)

***

### fill()

> **fill**(`value`, `start?`, `end?`): `this`

Defined in: node\_modules/typescript/lib/lib.es2015.core.d.ts:51

Changes all array elements from `start` to `end` index to a static `value` and returns the modified array

#### Parameters

##### value

`T`

value to fill array section with

##### start?

`number`

index to start filling the array at. If start is negative, it is treated as
length+start where length is the length of the array.

##### end?

`number`

index to stop filling the array at. If end is negative, it is treated as
length+end.

#### Returns

`this`

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`fill`](MediaPlaylist.md#fill)

***

### copyWithin()

> **copyWithin**(`target`, `start`, `end?`): `this`

Defined in: node\_modules/typescript/lib/lib.es2015.core.d.ts:62

Returns the this object after copying a section of the array identified by start and end
to the same array starting at position target

#### Parameters

##### target

`number`

If target is negative, it is treated as length+target where length is the
length of the array.

##### start

`number`

If start is negative, it is treated as length+start. If end is negative, it
is treated as length+end.

##### end?

`number`

If not specified, length of the this object is used as its default value.

#### Returns

`this`

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`copyWithin`](MediaPlaylist.md#copywithin)

***

### from()

#### Call Signature

> `static` **from**\<`T`\>(`arrayLike`): `T`[]

Defined in: node\_modules/typescript/lib/lib.es2015.core.d.ts:72

Creates an array from an array-like object.

##### Type Parameters

###### T

`T`

##### Parameters

###### arrayLike

`ArrayLike`\<`T`\>

An array-like object to convert to an array.

##### Returns

`T`[]

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`from`](MediaPlaylist.md#from)

#### Call Signature

> `static` **from**\<`T`, `U`\>(`arrayLike`, `mapfn`, `thisArg?`): `U`[]

Defined in: node\_modules/typescript/lib/lib.es2015.core.d.ts:80

Creates an array from an iterable object.

##### Type Parameters

###### T

`T`

###### U

`U`

##### Parameters

###### arrayLike

`ArrayLike`\<`T`\>

An array-like object to convert to an array.

###### mapfn

(`v`, `k`) => `U`

A mapping function to call on every element of the array.

###### thisArg?

`any`

Value of 'this' used to invoke the mapfn.

##### Returns

`U`[]

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`from`](MediaPlaylist.md#from)

#### Call Signature

> `static` **from**\<`T`\>(`iterable`): `T`[]

Defined in: node\_modules/typescript/lib/lib.es2015.iterable.d.ts:101

Creates an array from an iterable object.

##### Type Parameters

###### T

`T`

##### Parameters

###### iterable

An iterable object to convert to an array.

`Iterable`\<`T`, `any`, `any`\> | `ArrayLike`\<`T`\>

##### Returns

`T`[]

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`from`](MediaPlaylist.md#from)

#### Call Signature

> `static` **from**\<`T`, `U`\>(`iterable`, `mapfn`, `thisArg?`): `U`[]

Defined in: node\_modules/typescript/lib/lib.es2015.iterable.d.ts:109

Creates an array from an iterable object.

##### Type Parameters

###### T

`T`

###### U

`U`

##### Parameters

###### iterable

An iterable object to convert to an array.

`Iterable`\<`T`, `any`, `any`\> | `ArrayLike`\<`T`\>

###### mapfn

(`v`, `k`) => `U`

A mapping function to call on every element of the array.

###### thisArg?

`any`

Value of 'this' used to invoke the mapfn.

##### Returns

`U`[]

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`from`](MediaPlaylist.md#from)

***

### of()

> `static` **of**\<`T`\>(...`items`): `T`[]

Defined in: node\_modules/typescript/lib/lib.es2015.core.d.ts:86

Returns a new array from a set of elements.

#### Type Parameters

##### T

`T`

#### Parameters

##### items

...`T`[]

A set of elements to include in the new array object.

#### Returns

`T`[]

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`of`](MediaPlaylist.md#of)

***

### \[iterator\]()

> **\[iterator\]**(): `ArrayIterator`\<`T`\>

Defined in: node\_modules/typescript/lib/lib.es2015.iterable.d.ts:78

Iterator

#### Returns

`ArrayIterator`\<`T`\>

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`[iterator]`](MediaPlaylist.md#iterator)

***

### entries()

> **entries**(): `ArrayIterator`\<\[`number`, `T`\]\>

Defined in: node\_modules/typescript/lib/lib.es2015.iterable.d.ts:83

Returns an iterable of key, value pairs for every entry in the array

#### Returns

`ArrayIterator`\<\[`number`, `T`\]\>

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`entries`](MediaPlaylist.md#entries)

***

### keys()

> **keys**(): `ArrayIterator`\<`number`\>

Defined in: node\_modules/typescript/lib/lib.es2015.iterable.d.ts:88

Returns an iterable of keys in the array

#### Returns

`ArrayIterator`\<`number`\>

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`keys`](MediaPlaylist.md#keys)

***

### values()

> **values**(): `ArrayIterator`\<`T`\>

Defined in: node\_modules/typescript/lib/lib.es2015.iterable.d.ts:93

Returns an iterable of values in the array

#### Returns

`ArrayIterator`\<`T`\>

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`values`](MediaPlaylist.md#values)

***

### includes()

> **includes**(`searchElement`, `fromIndex?`): `boolean`

Defined in: node\_modules/typescript/lib/lib.es2016.array.include.d.ts:25

Determines whether an array includes a certain element, returning true or false as appropriate.

#### Parameters

##### searchElement

`T`

The element to search for.

##### fromIndex?

`number`

The position in this array at which to begin searching for searchElement.

#### Returns

`boolean`

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`includes`](MediaPlaylist.md#includes)

***

### flatMap()

> **flatMap**\<`U`, `This`\>(`callback`, `thisArg?`): `U`[]

Defined in: node\_modules/typescript/lib/lib.es2019.array.d.ts:64

Calls a defined callback function on each element of an array. Then, flattens the result into
a new array.
This is identical to a map followed by flat with depth 1.

#### Type Parameters

##### U

`U`

##### This

`This` = `undefined`

#### Parameters

##### callback

(`this`, `value`, `index`, `array`) => `U` \| readonly `U`[]

A function that accepts up to three arguments. The flatMap method calls the
callback function one time for each element in the array.

##### thisArg?

`This`

An object to which the this keyword can refer in the callback function. If
thisArg is omitted, undefined is used as the this value.

#### Returns

`U`[]

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`flatMap`](MediaPlaylist.md#flatmap)

***

### flat()

> **flat**\<`A`, `D`\>(`this`, `depth?`): `FlatArray`\<`A`, `D`\>[]

Defined in: node\_modules/typescript/lib/lib.es2019.array.d.ts:75

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth.

#### Type Parameters

##### A

`A`

##### D

`D` *extends* `number` = `1`

#### Parameters

##### this

`A`

##### depth?

`D`

The maximum recursion depth

#### Returns

`FlatArray`\<`A`, `D`\>[]

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`flat`](MediaPlaylist.md#flat)

***

### at()

> **at**(`index`): `T`

Defined in: node\_modules/typescript/lib/lib.es2022.array.d.ts:24

Returns the item located at the specified index.

#### Parameters

##### index

`number`

The zero-based index of the desired code unit. A negative index will count back from the last item.

#### Returns

`T`

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`at`](MediaPlaylist.md#at)

***

### findLast()

#### Call Signature

> **findLast**\<`S`\>(`predicate`, `thisArg?`): `S`

Defined in: node\_modules/typescript/lib/lib.es2023.array.d.ts:29

Returns the value of the last element in the array where predicate is true, and undefined
otherwise.

##### Type Parameters

###### S

`S` *extends* `RSSFeedItemPlayableMedia`

##### Parameters

###### predicate

(`value`, `index`, `array`) => `value is S`

findLast calls predicate once for each element of the array, in descending
order, until it finds one where predicate returns true. If such an element is found, findLast
immediately returns that element value. Otherwise, findLast returns undefined.

###### thisArg?

`any`

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

##### Returns

`S`

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`findLast`](MediaPlaylist.md#findlast)

#### Call Signature

> **findLast**(`predicate`, `thisArg?`): `T`

Defined in: node\_modules/typescript/lib/lib.es2023.array.d.ts:30

##### Parameters

###### predicate

(`value`, `index`, `array`) => `unknown`

###### thisArg?

`any`

##### Returns

`T`

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`findLast`](MediaPlaylist.md#findlast)

***

### findLastIndex()

> **findLastIndex**(`predicate`, `thisArg?`): `number`

Defined in: node\_modules/typescript/lib/lib.es2023.array.d.ts:41

Returns the index of the last element in the array where predicate is true, and -1
otherwise.

#### Parameters

##### predicate

(`value`, `index`, `array`) => `unknown`

findLastIndex calls predicate once for each element of the array, in descending
order, until it finds one where predicate returns true. If such an element is found,
findLastIndex immediately returns that element index. Otherwise, findLastIndex returns -1.

##### thisArg?

`any`

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

#### Returns

`number`

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`findLastIndex`](MediaPlaylist.md#findlastindex)

***

### toReversed()

> **toReversed**(): `T`[]

Defined in: node\_modules/typescript/lib/lib.es2023.array.d.ts:46

Returns a copy of an array with its elements reversed.

#### Returns

`T`[]

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`toReversed`](MediaPlaylist.md#toreversed)

***

### toSorted()

> **toSorted**(`compareFn?`): `T`[]

Defined in: node\_modules/typescript/lib/lib.es2023.array.d.ts:57

Returns a copy of an array with its elements sorted.

#### Parameters

##### compareFn?

(`a`, `b`) => `number`

Function used to determine the order of the elements. It is expected to return
a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
value otherwise. If omitted, the elements are sorted in ascending, UTF-16 code unit order.
```ts
[11, 2, 22, 1].toSorted((a, b) => a - b) // [1, 2, 11, 22]
```

#### Returns

`T`[]

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`toSorted`](MediaPlaylist.md#tosorted)

***

### toSpliced()

#### Call Signature

> **toSpliced**(`start`, `deleteCount`, ...`items`): `T`[]

Defined in: node\_modules/typescript/lib/lib.es2023.array.d.ts:66

Copies an array and removes elements and, if necessary, inserts new elements in their place. Returns the copied array.

##### Parameters

###### start

`number`

The zero-based location in the array from which to start removing elements.

###### deleteCount

`number`

The number of elements to remove.

###### items

...`T`[]

Elements to insert into the copied array in place of the deleted elements.

##### Returns

`T`[]

The copied array.

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`toSpliced`](MediaPlaylist.md#tospliced)

#### Call Signature

> **toSpliced**(`start`, `deleteCount?`): `T`[]

Defined in: node\_modules/typescript/lib/lib.es2023.array.d.ts:74

Copies an array and removes elements while returning the remaining elements.

##### Parameters

###### start

`number`

The zero-based location in the array from which to start removing elements.

###### deleteCount?

`number`

The number of elements to remove.

##### Returns

`T`[]

A copy of the original array with the remaining elements.

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`toSpliced`](MediaPlaylist.md#tospliced)

***

### with()

> **with**(`index`, `value`): `T`[]

Defined in: node\_modules/typescript/lib/lib.es2023.array.d.ts:85

Copies an array, then overwrites the value at the provided index with the
given value. If the index is negative, then it replaces from the end
of the array.

#### Parameters

##### index

`number`

The index of the value to overwrite. If the index is
negative, then it replaces from the end of the array.

##### value

`T`

The value to write into the copied array.

#### Returns

`T`[]

The copied array with the updated value.

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`with`](MediaPlaylist.md#with)

***

### toString()

> **toString**(): `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1333

Returns a string representation of an array.

#### Returns

`string`

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`toString`](MediaPlaylist.md#tostring)

***

### toLocaleString()

#### Call Signature

> **toLocaleString**(): `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1337

Returns a string representation of an array. The elements are converted to string using their toLocaleString methods.

##### Returns

`string`

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`toLocaleString`](MediaPlaylist.md#tolocalestring)

#### Call Signature

> **toLocaleString**(`locales`, `options?`): `string`

Defined in: node\_modules/typescript/lib/lib.es2015.core.d.ts:64

##### Parameters

###### locales

`string` | `string`[]

###### options?

`NumberFormatOptions` & `DateTimeFormatOptions`

##### Returns

`string`

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`toLocaleString`](MediaPlaylist.md#tolocalestring)

***

### pop()

> **pop**(): `T`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1342

Removes the last element from an array and returns it.
If the array is empty, undefined is returned and the array is not modified.

#### Returns

`T`

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`pop`](MediaPlaylist.md#pop)

***

### push()

> **push**(...`items`): `number`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1347

Appends new elements to the end of an array, and returns the new length of the array.

#### Parameters

##### items

...`T`[]

New elements to add to the array.

#### Returns

`number`

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`push`](MediaPlaylist.md#push)

***

### join()

> **join**(`separator?`): `string`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1364

Adds all the elements of an array into a string, separated by the specified separator string.

#### Parameters

##### separator?

`string`

A string used to separate one element of the array from the next in the resulting string. If omitted, the array elements are separated with a comma.

#### Returns

`string`

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`join`](MediaPlaylist.md#join)

***

### reverse()

> **reverse**(): `T`[]

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1369

Reverses the elements in an array in place.
This method mutates the array and returns a reference to the same array.

#### Returns

`T`[]

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`reverse`](MediaPlaylist.md#reverse)

***

### shift()

> **shift**(): `T`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1374

Removes the first element from an array and returns it.
If the array is empty, undefined is returned and the array is not modified.

#### Returns

`T`

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`shift`](MediaPlaylist.md#shift)

***

### slice()

> **slice**(`start?`, `end?`): `T`[]

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1384

Returns a copy of a section of an array.
For both start and end, a negative index can be used to indicate an offset from the end of the array.
For example, -2 refers to the second to last element of the array.

#### Parameters

##### start?

`number`

The beginning index of the specified portion of the array.
If start is undefined, then the slice begins at index 0.

##### end?

`number`

The end index of the specified portion of the array. This is exclusive of the element at the index 'end'.
If end is undefined, then the slice extends to the end of the array.

#### Returns

`T`[]

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`slice`](MediaPlaylist.md#slice)

***

### sort()

> **sort**(`compareFn?`): `this`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1395

Sorts an array in place.
This method mutates the array and returns a reference to the same array.

#### Parameters

##### compareFn?

(`a`, `b`) => `number`

Function used to determine the order of the elements. It is expected to return
a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
value otherwise. If omitted, the elements are sorted in ascending, UTF-16 code unit order.
```ts
[11,2,22,1].sort((a, b) => a - b)
```

#### Returns

`this`

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`sort`](MediaPlaylist.md#sort)

***

### splice()

#### Call Signature

> **splice**(`start`, `deleteCount?`): `T`[]

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1404

Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

##### Parameters

###### start

`number`

The zero-based location in the array from which to start removing elements.

###### deleteCount?

`number`

The number of elements to remove. Omitting this argument will remove all elements from the start
paramater location to end of the array. If value of this argument is either a negative number, zero, undefined, or a type
that cannot be converted to an integer, the function will evaluate the argument as zero and not remove any elements.

##### Returns

`T`[]

An array containing the elements that were deleted.

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`splice`](MediaPlaylist.md#splice)

#### Call Signature

> **splice**(`start`, `deleteCount`, ...`items`): `T`[]

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1414

Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

##### Parameters

###### start

`number`

The zero-based location in the array from which to start removing elements.

###### deleteCount

`number`

The number of elements to remove. If value of this argument is either a negative number, zero,
undefined, or a type that cannot be converted to an integer, the function will evaluate the argument as zero and
not remove any elements.

###### items

...`T`[]

Elements to insert into the array in place of the deleted elements.

##### Returns

`T`[]

An array containing the elements that were deleted.

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`splice`](MediaPlaylist.md#splice)

***

### unshift()

> **unshift**(...`items`): `number`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1419

Inserts new elements at the start of an array, and returns the new length of the array.

#### Parameters

##### items

...`T`[]

Elements to insert at the start of the array.

#### Returns

`number`

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`unshift`](MediaPlaylist.md#unshift)

***

### lastIndexOf()

> **lastIndexOf**(`searchElement`, `fromIndex?`): `number`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1431

Returns the index of the last occurrence of a specified value in an array, or -1 if it is not present.

#### Parameters

##### searchElement

`T`

The value to locate in the array.

##### fromIndex?

`number`

The array index at which to begin searching backward. If fromIndex is omitted, the search starts at the last index in the array.

#### Returns

`number`

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`lastIndexOf`](MediaPlaylist.md#lastindexof)

***

### every()

#### Call Signature

> **every**\<`S`\>(`predicate`, `thisArg?`): `this is S[]`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1440

Determines whether all the members of an array satisfy the specified test.

##### Type Parameters

###### S

`S` *extends* `RSSFeedItemPlayableMedia`

##### Parameters

###### predicate

(`value`, `index`, `array`) => `value is S`

A function that accepts up to three arguments. The every method calls
the predicate function for each element in the array until the predicate returns a value
which is coercible to the Boolean value false, or until the end of the array.

###### thisArg?

`any`

An object to which the this keyword can refer in the predicate function.
If thisArg is omitted, undefined is used as the this value.

##### Returns

`this is S[]`

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`every`](MediaPlaylist.md#every)

#### Call Signature

> **every**(`predicate`, `thisArg?`): `boolean`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1449

Determines whether all the members of an array satisfy the specified test.

##### Parameters

###### predicate

(`value`, `index`, `array`) => `unknown`

A function that accepts up to three arguments. The every method calls
the predicate function for each element in the array until the predicate returns a value
which is coercible to the Boolean value false, or until the end of the array.

###### thisArg?

`any`

An object to which the this keyword can refer in the predicate function.
If thisArg is omitted, undefined is used as the this value.

##### Returns

`boolean`

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`every`](MediaPlaylist.md#every)

***

### some()

> **some**(`predicate`, `thisArg?`): `boolean`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1458

Determines whether the specified callback function returns true for any element of an array.

#### Parameters

##### predicate

(`value`, `index`, `array`) => `unknown`

A function that accepts up to three arguments. The some method calls
the predicate function for each element in the array until the predicate returns a value
which is coercible to the Boolean value true, or until the end of the array.

##### thisArg?

`any`

An object to which the this keyword can refer in the predicate function.
If thisArg is omitted, undefined is used as the this value.

#### Returns

`boolean`

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`some`](MediaPlaylist.md#some)

***

### forEach()

> **forEach**(`callbackfn`, `thisArg?`): `void`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1464

Performs the specified action for each element in an array.

#### Parameters

##### callbackfn

(`value`, `index`, `array`) => `void`

A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.

##### thisArg?

`any`

An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.

#### Returns

`void`

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`forEach`](MediaPlaylist.md#foreach)

***

### map()

> **map**\<`U`\>(`callbackfn`, `thisArg?`): `U`[]

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1470

Calls a defined callback function on each element of an array, and returns an array that contains the results.

#### Type Parameters

##### U

`U`

#### Parameters

##### callbackfn

(`value`, `index`, `array`) => `U`

A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.

##### thisArg?

`any`

An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.

#### Returns

`U`[]

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`map`](MediaPlaylist.md#map)

***

### filter()

#### Call Signature

> **filter**\<`S`\>(`predicate`, `thisArg?`): `S`[]

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1476

Returns the elements of an array that meet the condition specified in a callback function.

##### Type Parameters

###### S

`S` *extends* `RSSFeedItemPlayableMedia`

##### Parameters

###### predicate

(`value`, `index`, `array`) => `value is S`

A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.

###### thisArg?

`any`

An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.

##### Returns

`S`[]

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`filter`](MediaPlaylist.md#filter)

#### Call Signature

> **filter**(`predicate`, `thisArg?`): `T`[]

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1482

Returns the elements of an array that meet the condition specified in a callback function.

##### Parameters

###### predicate

(`value`, `index`, `array`) => `unknown`

A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.

###### thisArg?

`any`

An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.

##### Returns

`T`[]

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`filter`](MediaPlaylist.md#filter)

***

### reduce()

#### Call Signature

> **reduce**(`callbackfn`): `T`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1488

Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

##### Parameters

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`, `array`) => `T`

A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.

##### Returns

`T`

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`reduce`](MediaPlaylist.md#reduce)

#### Call Signature

> **reduce**(`callbackfn`, `initialValue`): `T`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1489

##### Parameters

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`, `array`) => `T`

###### initialValue

`T`

##### Returns

`T`

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`reduce`](MediaPlaylist.md#reduce)

#### Call Signature

> **reduce**\<`U`\>(`callbackfn`, `initialValue`): `U`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1495

Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

##### Type Parameters

###### U

`U`

##### Parameters

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`, `array`) => `U`

A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.

###### initialValue

`U`

If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.

##### Returns

`U`

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`reduce`](MediaPlaylist.md#reduce)

***

### reduceRight()

#### Call Signature

> **reduceRight**(`callbackfn`): `T`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1501

Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

##### Parameters

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`, `array`) => `T`

A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.

##### Returns

`T`

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`reduceRight`](MediaPlaylist.md#reduceright)

#### Call Signature

> **reduceRight**(`callbackfn`, `initialValue`): `T`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1502

##### Parameters

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`, `array`) => `T`

###### initialValue

`T`

##### Returns

`T`

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`reduceRight`](MediaPlaylist.md#reduceright)

#### Call Signature

> **reduceRight**\<`U`\>(`callbackfn`, `initialValue`): `U`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1508

Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

##### Type Parameters

###### U

`U`

##### Parameters

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`, `array`) => `U`

A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.

###### initialValue

`U`

If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.

##### Returns

`U`

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`reduceRight`](MediaPlaylist.md#reduceright)

***

### isArray()

> `static` **isArray**(`arg`): `arg is any[]`

Defined in: node\_modules/typescript/lib/lib.es5.d.ts:1520

#### Parameters

##### arg

`any`

#### Returns

`arg is any[]`

#### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`isArray`](MediaPlaylist.md#isarray)

***

### fromAsync()

#### Call Signature

> `static` **fromAsync**\<`T`\>(`iterableOrArrayLike`): `Promise`\<`T`[]\>

Defined in: node\_modules/typescript/lib/lib.esnext.array.d.ts:24

Creates an array from an async iterator or iterable object.

##### Type Parameters

###### T

`T`

##### Parameters

###### iterableOrArrayLike

An async iterator or array-like object to convert to an array.

`AsyncIterable`\<`T`, `any`, `any`\> | `Iterable`\<`T` \| `PromiseLike`\<`T`\>, `any`, `any`\> | `ArrayLike`\<`T` \| `PromiseLike`\<`T`\>\>

##### Returns

`Promise`\<`T`[]\>

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`fromAsync`](MediaPlaylist.md#fromasync)

#### Call Signature

> `static` **fromAsync**\<`T`, `U`\>(`iterableOrArrayLike`, `mapFn`, `thisArg?`): `Promise`\<`Awaited`\<`U`\>[]\>

Defined in: node\_modules/typescript/lib/lib.esnext.array.d.ts:34

Creates an array from an async iterator or iterable object.

##### Type Parameters

###### T

`T`

###### U

`U`

##### Parameters

###### iterableOrArrayLike

An async iterator or array-like object to convert to an array.

`AsyncIterable`\<`T`, `any`, `any`\> | `Iterable`\<`T`, `any`, `any`\> | `ArrayLike`\<`T`\>

###### mapFn

(`value`, `index`) => `U`

###### thisArg?

`any`

Value of 'this' used when executing mapfn.

##### Returns

`Promise`\<`Awaited`\<`U`\>[]\>

##### Inherited from

[`MediaPlaylist`](MediaPlaylist.md).[`fromAsync`](MediaPlaylist.md#fromasync)
