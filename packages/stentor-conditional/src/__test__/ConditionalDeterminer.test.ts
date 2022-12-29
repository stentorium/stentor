/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";

import { ConditionalDeterminer } from "../ConditionalDeterminer";
import { ConditionalCheck, Conditioned } from "stentor-models";

// Data model
interface YouTellMe {
    tellMe: boolean;
}
// The guard
function isYouTellMe(obj: object | YouTellMe): obj is YouTellMe {
    return !!obj && (obj as YouTellMe).tellMe !== undefined;
}
// The function
function tellMe(input: boolean): boolean {
    return input;
}

function tellMeTwice(input: boolean, optional?: boolean): boolean {
    if (typeof optional === "boolean") {
        return optional;
    }

    return input;
}

function tellMeBounded(input: boolean): boolean {
    return tellMe(input);
}
// The TellMe check
const SIMPLE_CHECK: ConditionalCheck = {
    test: isYouTellMe,
    check: (obj: YouTellMe) => {
        return obj.tellMe;
    },
    functions: [tellMe, tellMeTwice, tellMeBounded.bind(null, true)]
}

const FALSE_CHECK: ConditionalCheck = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    test: (t: any): t is any => {
        return false
    },
    check: () => { return false },
    functions: [tellMe.bind(false)]
};

const MUST_TRUE: Conditioned = {
    conditions: {
        must: [{ tellMe: true }],
        should: []
    }
};

const MUST_TRUE_FALSE: Conditioned = {
    conditions: {
        must: [{ tellMe: true }, { tellMe: false }],
        should: []
    }
}

const MUST_FALSE: Conditioned = {
    conditions: {
        must: [{ tellMe: false }, { tellMe: false }],
        should: []
    }
}

// Should return TRUE
const MUST_TRUE_SHOULD_TRUE_FALSE: Conditioned = {
    conditions: {
        must: [{ tellMe: true }, { tellMe: true }],
        should: [{ tellMe: true }, { tellMe: false }]
    }
}

const SHOULD_TRUE: Conditioned = {
    conditions: {
        must: [],
        should: [{ tellMe: true }]
    }
}

const SHOULD_FALSE: Conditioned = {
    conditions: {
        must: [],
        should: [{ tellMe: false }]
    }
}

const STRING_TRUE_AND_TRUE: Conditioned = {
    conditions: "true && true"
}

// Note: Update the tests here and then setup the environment for the different VMs
// This allows us to run them in each environment
const shouldRunConditionals = () => {

    let engine: ConditionalDeterminer;

    describe('when passed an empty array', () => {
        it('returns the empty array', () => {
            expect(new ConditionalDeterminer([]).determine([])).to.deep.equal([]);
        });
    });
    describe('with must', () => {
        beforeEach(() => {
            engine = new ConditionalDeterminer([SIMPLE_CHECK, FALSE_CHECK]);
        });
        it('returns the correct conditional', () => {
            expect(engine.determine([MUST_TRUE, MUST_TRUE_FALSE])).to.have.length(1);
            expect(engine.determine([MUST_TRUE, MUST_TRUE_FALSE])).to.deep.equal([MUST_TRUE]);

            expect(engine.determine([MUST_FALSE])).to.have.length(0);
        });
        describe("and should", () => {
            it('returns the correct conditional', () => {
                expect(engine.determine([MUST_FALSE, MUST_TRUE_SHOULD_TRUE_FALSE])).to.have.length(1);
                expect(engine.determine([MUST_FALSE, MUST_TRUE_SHOULD_TRUE_FALSE])).to.deep.equal([MUST_TRUE_SHOULD_TRUE_FALSE]);
            });
        });
    });
    describe("with just should", () => {
        it('returns the correct conditional', () => {
            expect(engine.determine([SHOULD_TRUE])).to.have.length(1);
            expect(engine.determine([SHOULD_TRUE, SHOULD_FALSE])).to.have.length(1);
            expect(engine.determine([SHOULD_TRUE, SHOULD_FALSE])).to.deep.equal([SHOULD_TRUE]);
        });
    });
    describe("with a string conditional", () => {
        // This is becoming the primary condition method 
        it('returns the correct result', () => {
            expect(new ConditionalDeterminer([]).determine([STRING_TRUE_AND_TRUE])).to.have.length(1);
            expect(new ConditionalDeterminer([]).determine([STRING_TRUE_AND_TRUE])).to.deep.equal([STRING_TRUE_AND_TRUE]);
            expect(new ConditionalDeterminer([]).determine([{ conditions: "false || false" }])).to.deep.equal([]);

            expect(new ConditionalDeterminer([SIMPLE_CHECK]).determine([{
                conditions: "tellMe(true) || false"
            }])).to.have.length(1);

            expect(new ConditionalDeterminer([SIMPLE_CHECK]).determine([{
                // on tellMeTwice, if the second one is provided it uses that one
                conditions: "tellMe(false) || false || tellMeTwice(true, false)"
            }])).to.have.length(0);
            expect(new ConditionalDeterminer([SIMPLE_CHECK]).determine([{
                conditions: "tellMe(true) && tellMeBounded()"
            }])).to.have.length(1);
        });
        describe('with a bad function', () => {
            it('returns the correct result', () => {
                expect(() => {
                    new ConditionalDeterminer([]).determine([{
                        conditions: "tellMe(true) || false"
                    }]);
                }).not.to.throw();
                expect(new ConditionalDeterminer([]).determine([{
                    conditions: "tellMe(true) || false"
                }])).to.have.length(0);
            });
        });
    });
}

describe(`${ConditionalDeterminer.name}`, () => {
    describe(`#${ConditionalDeterminer.prototype.determine.name}()`, () => {
        describe('using default VM', () => {
            before(() => {
                process.env.SKIP_VM2 = "true";
                process.env.SKIP_IVM = "true";
            });
            after(() => {
                delete process.env.SKIP_VM2;
                delete process.env.SKIP_IVM;
            });
            shouldRunConditionals();
        })
        describe(`using VM2`, () => {
            before(() => {
                // process.env.SKIP_VM2 = "true";
                process.env.SKIP_IVM = "true";
            });
            after(() => {
                delete process.env.SKIP_VM2;
                delete process.env.SKIP_IVM;
            });
            shouldRunConditionals();
        });
        describe("using isolated VM", () => {
            before(() => {
                process.env.SKIP_VM2 = "true";
                // process.env.SKIP_IVM = "true";
            });
            after(() => {
                delete process.env.SKIP_VM2;
                delete process.env.SKIP_IVM;
            });
            shouldRunConditionals();
        });
    });
});
