/*! Copyright (c) 2025, XAPP AI */
import { expect } from "chai";

import { tokenize } from "../tokenize";

describe(`#${tokenize.name}()`, () => {
  it("returns empty array for undefined message", () => {
    const result = tokenize(undefined);
    expect(result).to.deep.equal([]);
  });

  it("splits words and removes punctuation", () => {
    const input = "hi, need a quote for some hail damage  ⛈️ hoping to get help";
    const result = tokenize(input);
    expect(result).to.include("hi");
    expect(result).to.include("damage");
    expect(result).to.include("⛈️");
    expect(result).to.not.include("hi,");
  });

  it("removes stop words when requested", () => {
    const input = "The quick brown fox jumps over the lazy dog";
    const result = tokenize(input, { removeStopWords: true });
    expect(result).to.not.include("the");
    expect(result).to.include("quick");
    expect(result).to.include("brown");
  });

  it("removes stop words with apostrophes", () => {
    // notice the two types of apostrophes here
    const input = "I'm and I´m not sure if it's working";
    const result = tokenize(input, { removeStopWords: true });
    expect(result).to.not.include("I'm");
    expect(result).to.not.include("it's");
    expect(result).to.not.include("i'm");
    expect(result).to.include("sure");
    expect(result).to.include("working");
  });

  it("normalizes fancy Mac OS/iOS style quotes and apostrophes", () => {
    // Test fancy apostrophes: ' (U+2019) and ` (U+0060)
    // Test fancy quotes: " " (U+201C, U+201D) and ' ' (U+2018, U+2019)
    const input = `I\u2019m working \u201csmart quotes\u201d and \u2018fancy apostrophes\u2019 here`;
    const result = tokenize(input, { removeStopWords: true });

    // Should normalize and remove stop words ("i'm", "and", "here" are stop words)
    expect(result).to.not.include("i'm"); // normalized and removed as stop word
    expect(result).to.include("working");
    expect(result).to.include("smart");
    expect(result).to.include("quotes");
    expect(result).to.include("fancy");
    expect(result).to.include("apostrophes");

    // Verify quotes are removed from tokens
    expect(result).to.not.include("\u201csmart");
    expect(result).to.not.include("quotes\u201d");
    expect(result).to.not.include("\u2018fancy");
    expect(result).to.not.include("apostrophes\u2019");
  });

  it("handles trailing punctuation", () => {
    const input = "paperwork? thanks.";
    const result = tokenize(input);
    expect(result).to.include("paperwork");
    expect(result).to.include("thanks");
    expect(result).to.not.include("paperwork?");
    expect(result).to.not.include("thanks.");
  });

  it("removes ampersands and titles", () => {
    const input = "Mr. Smith & Mrs. Jones visited Dr. Brown";
    const result = tokenize(input, { removeStopWords: true });
    expect(result).to.not.include("&");
    expect(result).to.not.include("mr");
    expect(result).to.not.include("mrs");
    expect(result).to.not.include("dr");
    expect(result).to.include("smith");
    expect(result).to.include("jones");
    expect(result).to.include("visited");
    expect(result).to.include("brown");
  });
});
