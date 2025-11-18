## stentor-utils

A set of shared utilities for 📣 stentor for use in Node or Browser (with Webpack) with minimal amount of dependencies.

### Parsing Natural Language Input

Several methods are included that are leveraging popular string parsing libraries that can help you further parse natural language queries.

- `parseData` - A wrapper around [chrono](https://github.com/wanasit/chrono) for parsing date time strings
- `wordToNumber` - A wrapper around [words-to-numbers](https://www.npmjs.com/package/words-to-numbers) for parsing words such as "one hundred" to their numeric equivalence.

### Formatting Output

We also provide several methods to help format information either for display or speech.

- `numberToWord` - Based on [number-to-words](https://www.npmjs.com/package/number-to-words), it converts numeric characters to their english word equivalent. (55 --> fifty-five)
- `formatNumberForDisplay` - A wrapper around [numerals](https://www.npmjs.com/package/numeral) for formatting numbers for display.
- `listisize` - Will take a list of strings and turn them into "one, two, three or four". No oxford commas.
- `capitalize` - Capitalizes the words provided

### Compiling Strings

We include a `Compiler` that is tailored to injecting `${foo}` style variables in the ResponseOutput style object.
