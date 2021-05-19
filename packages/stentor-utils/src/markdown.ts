/*! Copyright (c) 2021, XAPPmedia */
import { decode } from "html-entities";
import * as marked from "marked";
import sanitize = require('sanitize-html');

/**
 * Converts a markdown string to HTML.
 * 
 * Supported markdown is Github
 * 
 * It also decodes HTML entities and cleans dirty dangerous tags.
 * 
 * @param input String with markdown
 * @returns String with HTML, wrapped with <p></p> tags.
 */
export function toHTML(input: string): string {

    if (!input) {
        return input;
    }

    const dirty = marked(input);

    const decoded = decode(dirty);

    const clean = sanitize(decoded);

    return clean;
}