/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { DateTimeRange, DateTime, SuggestionTypes } from "stentor-models";

import {
    dateTimeRangeToSpeech,
    toResponseOutput,
    dateTimeToSpeech,
    durationToSpeech,
    mergeSuggestions,
    slotValueToSpeech
} from "../response";

describe(`#${toResponseOutput.name}()`, () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(toResponseOutput(undefined)).to.be.undefined;
        });
    });
    describe("when a string", () => {
        it("converts it to a ResponseOutput", () => {
            expect(toResponseOutput("Hello world!")).to.deep.equal({
                ssml: "<speak>Hello world!</speak>",
                displayText: "Hello world!"
            });
        });
    });
    describe("when passed a ResponseOutput", () => {
        it("passes it through", () => {
            expect(
                toResponseOutput({
                    ssml: "<speak>Hello world!</speak>",
                    displayText: "Hello world!"
                })
            ).to.deep.equal({
                ssml: "<speak>Hello world!</speak>",
                displayText: "Hello world!"
            });
        });
    });
});

describe(`#${dateTimeToSpeech.name}()`, () => {
    describe("when passed undefined", () => {
        it("returns an empty string", () => {
            expect(dateTimeToSpeech(undefined)).to.deep.equal("");
        });
    });
    describe("when passed a date time", () => {
        it("returns the correct response", () => {
            const date: DateTime = {
                date: "2018-7-4",
                time: "16:00:00"
            }
            expect(dateTimeToSpeech(date, "ssml")).to.equal('<say-as interpret-as="date" format="ymd">2018-07-04</say-as><say-as interpret-as="time">4:00 PM</say-as>')
            expect(dateTimeToSpeech(date, "displayText")).to.equal("7-4-2018 4:00 PM")
        });
    });
    describe("when passed just a date", () => {
        it("returns the correct response", () => {
            const date: DateTime = {
                date: "2018-7-4"
            }
            expect(dateTimeToSpeech(date, "ssml")).to.equal('<say-as interpret-as="date" format="ymd">2018-07-04</say-as>')
            expect(dateTimeToSpeech(date, "displayText")).to.equal("7-4-2018")
        });
    });
    describe("when passed just a time", () => {
        it("returns the correct response", () => {
            const date: DateTime = {
                time: "10:00:00"
            }
            expect(dateTimeToSpeech(date, "ssml")).to.equal('<say-as interpret-as="time">10:00 AM</say-as>')
            expect(dateTimeToSpeech(date, "displayText")).to.equal("10:00 AM")
        });
    });
});

describe(`#${dateTimeRangeToSpeech.name}()`, () => {
    describe("when passed undefined", () => {
        it("returns an empty string", () => {
            expect(dateTimeRangeToSpeech(undefined)).to.deep.equal("");
        });
    });
    describe("when passed two days in the same month", () => {
        it("returns the correct response", () => {
            const range: DateTimeRange = {
                start: {
                    date: "2020-07-04",
                    time: "08:00:00"
                },
                end: {
                    date: "2020-7-4",
                    time: "10:30:00"
                }
            };
            expect(dateTimeRangeToSpeech(range, "ssml")).to.equal('on <say-as interpret-as="date" format="ymd">2020-07-04</say-as> from <say-as interpret-as="time">8:00 AM</say-as> to <say-as interpret-as="time">10:30 AM</say-as>');
        });
    });
});


describe(`#${slotValueToSpeech.name}()`, () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(slotValueToSpeech(undefined)).to.be.undefined;
        });
    });
    describe("when passed a string", () => {
        it("passes through the value", () => {
            expect(slotValueToSpeech("foo")).to.equal("foo");
        });
    });
    describe("when passed a number", () => {
        it("converts it to a string", () => {
            expect(slotValueToSpeech(5)).to.equal("5");
        });
    });
    describe("when passed a date", () => {
        it("converts it to a say-as", () => {
            expect(slotValueToSpeech({
                date: "2019-09-11",
                time: "18:30:00"
            })).to.equal(`<say-as interpret-as="date" format="ymd">2019-09-11</say-as><say-as interpret-as="time">6:30 PM</say-as>`)
        });
        describe('with date only', () => {
            it("converts it to a say-as", () => {
                expect(slotValueToSpeech({
                    date: "2019-09-11"
                })).to.equal(`<say-as interpret-as="date" format="ymd">2019-09-11</say-as>`)
            });
        });
        describe('with date only', () => {
            it("converts it to a say-as", () => {
                expect(slotValueToSpeech({
                    time: "18:30:00"
                })).to.equal(`<say-as interpret-as="time">6:30 PM</say-as>`)
            });
        });
    });
    describe('with a date range', () => {
        it("converts it to a say-as", () => {
            expect(slotValueToSpeech({
                start: {
                    date: "2019-09-11",
                    time: "16:00:00"
                },
                end: {
                    date: "2019-09-11",
                    time: "18:30:00"
                }
            })).to.equal(`on <say-as interpret-as="date" format="ymd">2019-09-11</say-as> from <say-as interpret-as="time">4:00 PM</say-as> to <say-as interpret-as="time">6:30 PM</say-as>`)
        });
    });
    describe('with a list of strings', () => {
        it("converts it to a list", () => {
            expect(slotValueToSpeech(["one", "two", "three"])).to.deep.equal("one, two and three");
        });
    });
    describe('when passed a duration', () => {
        it("converts it properly", () => {
            expect(slotValueToSpeech({ amount: 4, format: "y" })).to.equal(`<say-as interpret-as="cardinal">4</say-as> years`);
            expect(slotValueToSpeech({ amount: 4, format: "y" }, "displayText")).to.equal(`4 years`);
        });
    });
});

describe(`#${durationToSpeech.name}()`, () => {
    describe('when passed undefined', () => {
        it('returns an empty string', () => {
            expect(durationToSpeech(undefined)).to.equal("");
        });
    });
    describe("when passed a duration", () => {
        it('returns the correct speech', () => {
            expect(durationToSpeech({ amount: 1, format: "s" })).equal('<say-as interpret-as="cardinal">1</say-as> second');
            expect(durationToSpeech({ amount: 1, format: "s" }, "displayText")).equal('1 second');

            expect(durationToSpeech({ amount: 2, format: "minute" })).equal('<say-as interpret-as="cardinal">2</say-as> minutes');
            expect(durationToSpeech({ amount: 2, format: "minute" }, "displayText")).equal('2 minutes');
        });
    });
});

describe(`#${mergeSuggestions.name}()`, () => {
    describe("when passed undefined", () => {
        it("returns an empty array", () => {
            const result = mergeSuggestions(undefined, undefined);
            expect(result).to.deep.equal([]);
        });
    });
    describe("when existing suggestions is empty", () => {
        it("returns the incoming suggestions", () => {
            const incoming: SuggestionTypes[] = ["suggestion1", "suggestion2"];
            const result = mergeSuggestions([], incoming);
            expect(result).to.deep.equal(incoming);
        });
    });

    describe("when incoming suggestions is empty", () => {
        it("returns the existing suggestions", () => {
            const existing: SuggestionTypes[] = ["suggestion1", "suggestion2"];
            const result = mergeSuggestions(existing, []);
            expect(result).to.deep.equal(existing);
        });
    });

    describe("when both existing and incoming suggestions are empty", () => {
        it("returns an empty array", () => {
            const result = mergeSuggestions([], []);
            expect(result).to.deep.equal([]);
        });
    });

    describe("when there are no duplicate suggestions", () => {
        it("returns the merged suggestions", () => {
            const existing: SuggestionTypes[] = ["suggestion1", "suggestion2"];
            const incoming: SuggestionTypes[] = ["suggestion3", "suggestion4"];
            const result = mergeSuggestions(existing, incoming);
            expect(result).to.deep.equal([...existing, ...incoming]);
        });
    });

    describe("when there are duplicate suggestions", () => {
        it("replaces the existing suggestions with the incoming suggestions", () => {
            const existing: SuggestionTypes[] = ["suggestion1", "suggestion2"];
            const incoming: SuggestionTypes[] = ["suggestion2", "suggestion3"];
            const result = mergeSuggestions(existing, incoming);
            expect(result).to.deep.equal(["suggestion1", "suggestion2", "suggestion3"]);
        });
    });

    describe("when suggestions contain objects", () => {
        it("compares the 'title' property for duplicates", () => {
            const existing: SuggestionTypes[] = [{ title: "suggestion1" }, { title: "suggestion2" }];
            const incoming: SuggestionTypes[] = [{ title: "suggestion2" }, { title: "suggestion3" }];
            const result = mergeSuggestions(existing, incoming);
            expect(result).to.deep.equal([{ title: "suggestion1" }, { title: "suggestion2" }, { title: "suggestion3" }]);
        });
    });

    describe("when suggestions contain a mix of strings and objects", () => {
        it("compares the 'title' property for duplicates", () => {
            const existing: SuggestionTypes[] = [{ title: "suggestion1" }, "suggestion2"];
            const incoming: SuggestionTypes[] = [{ title: "suggestion2" }, { title: "suggestion3" }];
            const result = mergeSuggestions(existing, incoming);
            expect(result).to.deep.equal([{ title: "suggestion1" }, { title: "suggestion2" }, { title: "suggestion3" }]);
        });
        describe("and the incoming has a URL and existing does not", () => {
            it("replaces the existing with the incoming", () => {
                const existing: SuggestionTypes[] = ["suggestion1", "Contact Us"];
                const incoming: SuggestionTypes[] = [{ title: "contact us", url: "https://www.example.com" }, { title: "suggestion3" }];
                const result = mergeSuggestions(existing, incoming);
                expect(result).to.deep.equal(["suggestion1", { title: "contact us", url: "https://www.example.com" }, { title: "suggestion3" }]);
            });
        })
    });
});