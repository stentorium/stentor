[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-constants/src](../README.md) / ENTITY\_NUMBER

# Variable: ENTITY\_NUMBER

> `const` **ENTITY\_NUMBER**: `"STENTOR.NUMBER"` = `"STENTOR.NUMBER"`

Defined in: [packages/stentor-constants/src/entities.ts:31](https://github.com/stentorium/stentor/blob/c0410dcd7b880b4f8e849bc9e18a802c802d0a12/packages/stentor-constants/src/entities.ts#L31)

Converts numeric words to digits.

Translated to:
  @sys.cardinal on Dialogflow
  AMAZON.NUMBER on Alexa & LEX
  number on LUIS

Note, we are not leveraging Dialogflow @sys.number because
it contains both cardinal and ordinal number.  AMAZON.Number
contains only cardinal numbers (according to the docs.)
