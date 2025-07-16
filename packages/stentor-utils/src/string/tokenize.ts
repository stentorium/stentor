/*! Copyright (c) 2025, XAPP AI */

export interface TokenizeOptions {
  /**
   * If true, removes common stop words from the tokenized output.
   * Default is false.
   */
  removeStopWords?: boolean;
}

const defaultStopWords = new Set(["a", "an", "the", "and", "or", "of", "to", "for", "with", "on", "in"]);

/**
 * Tokenizes a message into an array of words, optionally removing stop words.
 *
 * Will lowercase the message, trim whitespace, and remove common punctuation.
 *
 * @param {string} [message] - The message to tokenize.
 * @param {TokenizeOptions} [options] - Options for tokenization.
 * @returns {string[]} An array of tokens (words).
 */
export function tokenize(message?: string, options: TokenizeOptions = {}): string[] {
  if (!message) return [];

  const trimmed = message.trim().toLowerCase();

  // remove punctuation commonly found at word edges
  const cleaned = trimmed.replace(/[.,!?;:()[\]{}"']/g, "");

  // split on whitespace
  let tokens = cleaned.split(/\s+/).filter((t) => t.length > 0);

  // optionally remove stop words
  if (options.removeStopWords) {
    tokens = tokens.filter((t) => !defaultStopWords.has(t));
  }

  return tokens;
}
