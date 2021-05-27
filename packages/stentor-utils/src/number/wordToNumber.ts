/* eslint-disable */
/*! Copyright (c) 2021, XAPPmedia */


/*
Copyright (c) 2021 Kyle Simpson <getify@gmail.com>

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

// The following was retrieved from https://gist.github.com/getify/83e6fae8f54c1d38f89132a130493f98
// May 26, 2021

const digits: { [word: string]: string } = {
    "o": "0",
    "zero": "0",
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
};

const tens: { [word: string]: string } = {
    "ten": "10",
    "eleven": "11",
    "twelve": "12",
    "thirteen": "13",
    "fourteen": "14",
    "fifteen": "15",
    "sixteen": "16",
    "seventeen": "17",
    "eighteen": "18",
    "nineteen": "19",
};

const doubles: { [word: string]: string } = {
    "twenty": "20",
    "thirty": "30",
    "forty": "40",
    "fifty": "50",
    "sixty": "60",
    "seventy": "70",
    "eighty": "80",
    "ninety": "90",
};

const units: string[] = [
    "hundred",
    "thousand",
    "million",
    "billion",
    "trillion",
    "quadrillion",
];

const freeUnits: { [word: string]: number } = {
    "pair": 2,
    "dozen": 12,
    "score": 20,
};

interface AST {
    negative?: boolean;
    unit?: any;
    value?: any;
    and?: any;
}


function assignHundredUnitPlaceNode(curNode: { unit?: any; value?: any; and?: any; }, val: string) {
    if (curNode.unit != "hundred") {
        // current node is "empty", so we can assign it
        // as the "hundred" unit-place node
        if (!curNode.unit && !curNode.value) {
            curNode.unit = "hundred";
            curNode.value = val;
            return curNode;
        }
        else {
            // attempt to generate missing unit node(s)
            const [tree, leaf,] =
                generateMissingUnitNodes(curNode.unit, "hundred");
            if (tree) {
                curNode.and = tree.and;
                curNode = leaf;
            }
            else {
                throw new Error("Invalid! " + val);
            }
        }
    }

    // current node is a placeholder in the "hundred"
    // unit-place, that has not yet been assigned any
    // value from a token?
    if (!curNode.value) {
        curNode.value = val;
        return curNode;
    }
    else {
        throw new Error("Invalid! " + val);
    }
}

function collectConsecutiveDigits(tokens: string | any[], tokenIdx: number, limit = Number.MAX_SAFE_INTEGER) {
    const digitTokens = [tokens[tokenIdx],];
    for (
        let adjIdx = tokenIdx + 1;
        (
            adjIdx < tokens.length &&
            tokens[adjIdx].type == "digit" &&
            !tokens[adjIdx].unit &&
            digitTokens.length < limit
        );
        adjIdx++
    ) {
        digitTokens.push(tokens[adjIdx]);
    }
    return digitTokens;
}

function generateMissingUnitNodes(curUnit: string, targetUnit: string): AST[] {
    if (units.includes(curUnit) && units.includes(targetUnit)) {
        let unit = curUnit;
        const tree: AST = { unit: curUnit, };
        let leaf = tree;
        while (unit && unit != targetUnit) {
            unit = nextUnit(unit);
            if (unit) {
                leaf = leaf.and = { unit, };
            }
        }

        if (unit && unit == targetUnit) {
            return [tree, leaf];
        }
    }

    return [];
}

function nextUnit(unit: string) {
    const unitIdx = units.indexOf(unit);
    if (unitIdx > 0) {
        return units[unitIdx - 1];
    }
}

function parse(numstr: string) {
    const words = numstr.trim().replace(/[^\-0-9a-z\s]+/ig, "").toLowerCase().split(/[\s\-]+/).filter(Boolean);

    // (STEP 1) tokenize the string
    const tokens = [];
    let inDecimal = false;
    for (const word of words) {
        const curToken = tokens[tokens.length - 1];

        if (word == "negative" && tokens.length == 0) {
            tokens.push({ type: "negative", value: "-", complete: true, });
        }
        else if (word == "point" || word == "dot") {
            if (curToken && !curToken.complete) {
                if (!curToken.unit) {
                    curToken.unit = "hundred";
                }
                curToken.complete = true;
            }

            if (!inDecimal) {
                inDecimal = true;
                tokens.push({ type: "point", value: ".", complete: true, });
            }
            else {
                throw new Error("Invalid! " + word);
            }
        }
        else if (word == "o" || word == "zero") {
            if (curToken && !curToken.complete) {
                tokens.push({ type: "digit", value: "0", complete: true, });
                curToken.complete = true;
            }
            else {
                tokens.push({ type: "digit", value: "0", complete: true, });
            }
        }
        else if (word in digits) {
            if (curToken && !curToken.complete) {
                // replace a trailing zero (from a double or hundred)?
                if (curToken.value.endsWith("0")) {
                    curToken.value = curToken.value.slice(0, -1) + digits[word];
                    curToken.complete = true;
                }
                else {
                    tokens.push({ type: "digit", value: digits[word], complete: true, });
                    curToken.complete = true;
                }
            }
            else {
                tokens.push({ type: "digit", value: digits[word], complete: true, });
            }
        }
        else if (word in tens) {
            if (curToken && !curToken.complete) {
                // replace two trailing zeros (from a hundred)?
                if (curToken.value.endsWith("00")) {
                    curToken.value = curToken.value.slice(0, 1) + tens[word];
                    curToken.complete = true;
                }
                else {
                    tokens.push({ type: "ten", value: tens[word], complete: true, });
                    curToken.complete = true;
                }
            }
            // promote a single digit to a complete triple?
            else if (curToken && !curToken.unit && curToken.type == "digit") {
                curToken.type = "triple";
                curToken.value = curToken.value.slice(0, 1) + tens[word];
            }
            else {
                tokens.push({ type: "ten", value: tens[word], complete: true, });
            }
        }
        else if (word in doubles) {
            if (curToken && !curToken.complete) {
                // replace two trailing zeros (from a triple)?
                if (curToken.value.endsWith("00")) {
                    curToken.value = curToken.value.slice(0, 1) + doubles[word];
                    // NOTE: leave complete:false since a digit can complete a double
                }
                else {
                    tokens.push({ type: "double", value: doubles[word], complete: false, });
                    curToken.complete = true;
                }
            }
            // promote a single digit to an incomplete triple?
            else if (curToken && !curToken.unit && curToken.type == "digit") {
                curToken.type = "triple";
                curToken.value = curToken.value.slice(0, 1) + doubles[word];
                curToken.complete = false;
            }
            else {
                tokens.push({ type: "double", value: doubles[word], complete: false, });
            }
        }
        else if (!inDecimal) {
            if (word == "hundred") {
                if (curToken && !curToken.complete) {
                    curToken.complete = true;
                    tokens.push({ type: "triple", value: "100", complete: false, });
                }
                // promote a single digit to an incomplete triple?
                else if (curToken && !curToken.unit && curToken.type == "digit") {
                    curToken.type = "triple";
                    curToken.value = curToken.value.slice(0, 1) + "00";
                    curToken.complete = false;
                }
                else {
                    tokens.push({ type: "triple", value: "100", complete: false, });
                }
            }
            else if (
                // thousand, million, etc
                units.includes(word) ||
                // dozen, score, etc
                word in freeUnits
            ) {
                if (curToken && !curToken.unit) {
                    curToken.unit = word;
                    curToken.complete = true;
                }
                else {
                    tokens.push({ type: "digit", unit: word, value: "1", complete: true, });
                }
            }
            // harmless article or conjunction word?
            else if (["a", "and",].includes(word)) {
                continue;
            }
            // unrecognized/invalid word
            else {
                throw new Error("Invalid! " + word);
            }
        }
        // word not allowed while tokenizing decimal values
        else {
            throw new Error("Invalid! " + word);
        }
    }

    // (STEP 2) parse the token list into an AST
    // AST - abstract suffix tree
    const ast: AST = {};
    let curNode = ast;
    for (let tokenIdx = 0; tokenIdx < tokens.length; tokenIdx++) {
        const token = tokens[tokenIdx];
        const nextToken = tokens[tokenIdx + 1];

        if (token.type == "negative") {
            curNode.negative = true;
        }
        // token indicates an assigned base-10 unit-place?
        else if (units.includes(token.unit)) {
            // current node has no assigned unit-place?
            if (!curNode.unit) {
                curNode.unit = token.unit;
                curNode.value = (
                    curNode == ast ?
                        token.value :
                        token.value.padStart(3, "0")
                );
                const unit = nextUnit(token.unit);
                if (unit) {
                    // create next placeholder node
                    curNode = curNode.and = { unit, };
                }
            }
            // token unit same as current node?
            else if (token.unit == curNode.unit) {
                // current node is a placeholder that has not yet
                // been assigned a value from token?
                if (!curNode.value) {
                    curNode.value = (
                        curNode == ast ?
                            token.value :
                            token.value.padStart(3, "0")
                    );
                    const unit = nextUnit(token.unit);
                    if (unit) {
                        // create next placeholder node
                        curNode = curNode.and = { unit, };
                    }
                }
                else {
                    throw new Error("Invalid! " + token.unit);
                }
            }
            // current node is different (higher?) unit place
            // than token?
            else {
                // attempt to generate missing unit node(s)
                const [tree, leaf,] =
                    generateMissingUnitNodes(curNode.unit, token.unit);
                if (tree) {
                    curNode.and = tree.and;
                    curNode = leaf;
                    curNode.value = token.value;
                }
                else {
                    throw new Error("Invalid! " + token.unit);
                }
            }
        }
        // token indicates a free-unit (dozen, score, etc)?
        else if (token.unit in freeUnits) {
            // current node has no unit-place assigned yet?
            if (!curNode.unit) {
                // compute the free-unit real value
                let val = BigInt(Number(token.value) * freeUnits[token.unit]);

                // additional value following after free unit?
                //   * "three dozen and __" (digit, ten, double, or triple)
                //   * "four score and seven"
                if (
                    nextToken &&
                    ["digit", "ten", "double",].includes(nextToken.type) &&
                    !nextToken.unit
                ) {
                    // include additional value in computed value
                    val += BigInt(nextToken.value);
                    tokenIdx += 1;  // lookahead: 1 spot
                }

                // determine unit-places needed to represent
                // computed value
                let magnitudes = units.map((unit, idx) => [
                    // @ts-ignore 
                    idx === 0 ? 0 : 10n ** (BigInt(idx) * 3n),
                    unit
                ]);
                const [, maxUnit] = magnitudes.reduce(
                    ([val, nearUnit], [magnitude, unit]) => (
                        (val >= magnitude) ? [val, unit] : [val, nearUnit]
                    ),
                    [val, ""]
                );
                // @ts-ignore 
                magnitudes = magnitudes.reduce(
                    (list, [magnitude, unit]) => (
                        (val >= magnitude) ? [...list, magnitude] : list
                    ),
                    []
                ).reverse();

                // distribute the computed value into tree
                // node(s) as needed
                let [tree,] =
                    // @ts-ignore
                    generateMissingUnitNodes(maxUnit, "hundred");
                do {
                    curNode.unit = tree.unit;

                    // compute this node's value
                    const magnitude = magnitudes.shift();
                    const nodeVal = (
                        //@ts-ignore
                        (val >= magnitude && magnitude > 0) ?
                            // NOTE: bigints use integer division
                            // @ts-ignore
                            (val / magnitude) :
                            val
                    );
                    curNode.value = String(Number(nodeVal)).padStart(3, "0");

                    // any more nodes left to fill in?
                    // @ts-ignore
                    if (magnitude > 0) {
                        // compute remaining value for next node
                        //@ts-ignore
                        val = val % magnitude;
                        tree = tree.and;
                        curNode = curNode.and = {};
                    }
                    else {
                        tree = null;
                    }
                }
                while (tree);
            }
            else {
                throw new Error("Invalid! " + token.unit);
            }
        }
        // decimal point?
        else if (token.type == "point") {
            // current node has no unit-place assigned yet?
            if (!curNode.unit) {
                curNode.unit = "hundred";
                curNode = curNode.and = { unit: "decimal", value: "", };
            }
            else if (curNode.unit == "hundred") {
                curNode = curNode.and = { unit: "decimal", value: "", };
            }
            else {
                // attempt to generate missing unit-place node(s)
                const [tree, leaf,] =
                    generateMissingUnitNodes(curNode.unit, "hundred");
                if (tree) {
                    curNode.and = tree.and;
                    curNode = leaf;
                    curNode = curNode.and = { unit: "decimal", value: "", };
                }
                else {
                    throw new Error("Invalid! " + token.type);
                }
            }
        }
        // separate digit?
        else if (token.type == "digit") {
            // append digit to the decimal node?
            if (curNode.unit == "decimal") {
                // look-ahead to collect all consecutive digits, if any
                const digitTokens = collectConsecutiveDigits(tokens, tokenIdx);
                tokenIdx += (digitTokens.length - 1);

                // add digit token(s) to current node 
                for (const digit of digitTokens) {
                    curNode.value = (curNode.value || "") + digit.value;
                }
            }
            // multiple adjacent (non-decimal) digits?
            else if (
                nextToken &&
                nextToken.type == "digit"
            ) {
                // current node is "empty", so we can implicitly
                // create arbitrary unit-place segment(s) from multiple
                // digits?
                if (!curNode.unit) {
                    // look-ahead to collect all consecutive digits
                    let digitTokens = collectConsecutiveDigits(tokens, tokenIdx);
                    tokenIdx += (digitTokens.length - 1);

                    // skip any leading zeros (since we're at the
                    // start of the number)
                    const firstNonZeroDigitIdx = digitTokens.findIndex(digit => digit.value != "0");
                    if (firstNonZeroDigitIdx > 0) {
                        digitTokens = digitTokens.slice(firstNonZeroDigitIdx);
                    }

                    // any digits remain to be added to the AST?
                    if (digitTokens.length > 0) {
                        // determine how many unit-place groups are needed
                        const numGroups = Math.ceil(
                            Math.min(digitTokens.length, units.length * 3) / 3
                        );

                        // determine number of digits in first group
                        let groupSize = (
                            digitTokens.length > (units.length * 3) ?
                                digitTokens.length - (units.length * 3) + 3 :
                                digitTokens.length % 3 || 3
                        );

                        // create the necessary unit-place nodes in the AST
                        const [tree,] = generateMissingUnitNodes(
                            units[
                            Math.min(units.length - 1, numGroups - 1)
                            ],
                            "hundred"
                        );
                        if (tree) {
                            curNode.unit = tree.unit;
                            curNode.value = "";
                            if (tree.and) {
                                curNode.and = tree.and;
                            }
                            // fill in the unit-place groups to the AST
                            do {
                                // collect a group of digits into current node
                                const digitGroup = digitTokens.slice(0, groupSize);
                                digitTokens = digitTokens.slice(groupSize);
                                curNode.value = digitGroup.reduce((val, digit) => val + digit.value, "");

                                // more digits to add as a unit-place group?
                                if (curNode.and && digitTokens.length > 0) {
                                    curNode = curNode.and;
                                    // from here forward, all digit groups are
                                    // fixed size of 3
                                    groupSize = 3;
                                }
                            }
                            // keep going while digits remain to be grouped
                            while (digitTokens.length > 0);
                        }
                    }
                    else {
                        // NOTE: should never get here
                        throw new Error("Invalid! " + token.value);
                    }
                }
                else {
                    // look-ahead to collect up to 3 consecutive digits
                    const digitTokens =
                        collectConsecutiveDigits(tokens, tokenIdx,/*limit=*/3);
                    tokenIdx += (digitTokens.length - 1);

                    // combine digits into a single value
                    const val = digitTokens.reduce((val, digit) => val + digit.value, "");

                    // assign combined-digits to "hundred" unit-place node
                    curNode = assignHundredUnitPlaceNode(
                        curNode,
                        // zero-pad the value
                        val.padStart(3, "0")
                    );
                }
            }
            else {
                // assign single digit to "hundred" unit-place node
                curNode = assignHundredUnitPlaceNode(
                    curNode,
                    // zero-pad the value
                    token.value.padStart(3, "0")
                );
            }
        }
        // stand-alone ten or double token?
        else if (token.type == "ten" || token.type == "double") {
            // append numbers to the decimal node?
            if (curNode.unit == "decimal") {
                curNode.value += token.value;
            }
            // literal/year form:
            //   * "seventeen nineteen"
            //   * "seventeen thirty"
            //   * "twenty fourteen"
            //   * "twenty fifty"
            else if (
                nextToken &&
                (nextToken.type == "ten" || nextToken.type == "double")
            ) {
                if (!curNode.unit) {
                    curNode.unit = "thousand";
                    curNode.value = token.value.slice(0, 1);
                    curNode = curNode.and = {
                        unit: "hundred",
                        value: token.value.slice(1) + nextToken.value,
                    };
                    tokenIdx += 1;  // lookahead: 1 spot
                }
                else {
                    throw new Error("Invalid! " + token.value);
                }
            }
            // "twelve hundred"
            // "twenty three hundred"
            else if (
                !curNode.unit &&
                nextToken &&
                nextToken.type == "triple" &&
                nextToken.value == "100" &&
                !nextToken.unit
            ) {
                curNode.unit = "thousand";
                curNode.value = token.value.slice(0, 1);
                curNode = curNode.and = {
                    unit: "hundred",
                    value: token.value.slice(1) + "00",
                };
                tokenIdx += 1;  // lookahead: 1 spot
            }
            // ten/double followed by:
            //   * any 3 digits
            //   * '0' plus another digit
            else if (
                !curNode.unit &&
                nextToken &&
                nextToken.type == "digit" &&
                !nextToken.unit
            ) {
                const tokenN2 = tokens[tokenIdx + 2];
                const tokenN3 = tokens[tokenIdx + 3];

                // any 3 digits
                if (
                    tokenN2 &&
                    tokenN2.type == "digit" &&
                    tokenN3 &&
                    tokenN3.type == "digit"
                ) {
                    curNode.unit = "thousand";
                    curNode.value = token.value;
                    curNode = curNode.and = {
                        unit: "hundred",
                        value: nextToken.value + tokenN2.value + tokenN3.value,
                    };
                    tokenIdx += 3;  // lookahead: 3 spots
                }
                // '0' plus another digit
                else if (
                    nextToken.value == "0" &&
                    tokenN2 &&
                    tokenN2.type == "digit"
                ) {
                    curNode.unit = "thousand";
                    curNode.value = token.value.slice(0, 1);
                    curNode = curNode.and = {
                        unit: "hundred",
                        value: token.value.slice(1) + nextToken.value + tokenN2.value,
                    };
                    tokenIdx += 2;  // lookahead: 2 spots
                }
                else {
                    throw new Error("Invalid! " + token.value);
                }
            }
            // assumed "thousand" unit:
            //   * "thirteen nine forty two"
            //   * "thirty nine two o six"
            else if (
                !curNode.unit &&
                nextToken &&
                nextToken.type == "triple" &&
                !nextToken.unit
            ) {
                curNode.unit = "thousand";
                curNode.value = token.value;
                curNode = curNode.and = {
                    unit: "hundred",
                    value: nextToken.value.padStart(3, "0"),
                };
                tokenIdx += 1;  // lookahead: 1 spot
            }
            else {
                // assign ten/double value to "hundred" unit-place node
                curNode = assignHundredUnitPlaceNode(
                    curNode,
                    // zero-pad the value
                    token.value.padStart(3, "0")
                );
            }
        }
        // encountered a stand-alone triple?
        else if (token.type == "triple") {
            if (curNode.unit == "decimal") {
                curNode.value += token.value;
            }
            else {
                // assign triple value to "hundred" unit-place node
                curNode = assignHundredUnitPlaceNode(
                    curNode,
                    // zero-pad the value
                    token.value.padStart(3, "0")
                );
            }
        }
        else {
            // NOTE: should never get here
            throw new Error("Invalid! " + token.type);
        }
    }

    // append missing AST nodes (if any)
    if (!["hundred", "decimal"].includes(curNode.unit)) {
        const [tree] = generateMissingUnitNodes(curNode.unit, "hundred");
        if (tree) {
            curNode.and = tree.and;
        }
        else {
            throw new Error("Invalid! " + curNode.value);
        }
    }

    return ast;
}

/**
 * Converts a word like "one hundred" to the number 100.
 *
 * Words that are not numbers are passed through.
 *
 * @public
 * @param word - Word to convert to a number
 * @returns Returns either the original value or the number that was converted.
 */

export function wordToNumber(word: string, separator = ""): number | string {
    if (typeof word === "undefined") {
        return word;
    }

    const ast = parse(word);

    let numberDigits = "";
    let node = ast;
    while (node) {
        numberDigits += (
            (node.unit == "decimal" ?
                ("." + (node.value || "0")) :
                (
                    (numberDigits != "" ? separator : "") +
                    (node.value || "000")
                )
            )
        );
        node = node.and;
    }

    // normalize leading zeros
    numberDigits = numberDigits.replace(/^0+/, "").replace(/^\./, "0.") || "0";

    // append negative sign (if needed)
    if (ast.negative) {
        numberDigits = "-" + numberDigits;
    }

    return numberDigits;
}