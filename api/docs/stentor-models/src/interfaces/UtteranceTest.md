[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-models/src](../README.md) / UtteranceTest

# Interface: UtteranceTest

Defined in: [packages/stentor-models/src/UtteranceTest.ts:30](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/UtteranceTest.ts#L30)

An utterance test consists of the utterance under test and the expected result.

## Properties

### utterance

> **utterance**: `string`

Defined in: [packages/stentor-models/src/UtteranceTest.ts:34](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/UtteranceTest.ts#L34)

The utterance to be tested

***

### activeContext?

> `optional` **activeContext**: [`ActiveContext`](ActiveContext.md)[]

Defined in: [packages/stentor-models/src/UtteranceTest.ts:38](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/UtteranceTest.ts#L38)

Optional active context required for the utterance to trigger the expected inent.

***

### expected?

> `optional` **expected**: [`ExpectedResult`](ExpectedResult.md)

Defined in: [packages/stentor-models/src/UtteranceTest.ts:42](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-models/src/UtteranceTest.ts#L42)

The expected result once the utterance is passed in the NLU
