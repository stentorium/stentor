[**Stentor API Reference**](../../../README.md)

***

[Stentor API Reference](../../../README.md) / [stentor-interaction-model/src](../README.md) / ENTITY\_NUMBER

# Variable: ENTITY\_NUMBER

> `const` **ENTITY\_NUMBER**: `"STENTOR.NUMBER"` = `"STENTOR.NUMBER"`

Defined in: packages/stentor-constants/lib/entities.d.ts:30

Converts numeric words to digits.

Translated to:
  @sys.cardinal on Dialogflow
  AMAZON.NUMBER on Alexa & LEX
  number on LUIS

Note, we are not leveraging Dialogflow @sys.number because
it contains both cardinal and ordinal number.  AMAZON.Number
contains only cardinal numbers (according to the docs.)
