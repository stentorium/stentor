/*! Copyright (c) 2021, XAPPmedia */
import { decode } from "html-entities";
import * as marked from "marked";
import sanitize = require('sanitize-html');
import { linkify } from "./net";

/**
 * Converts a markdown string to HTML.
 * 
 * Supported markdown is Github
 * 
 * It also decodes HTML entities and cleans dirty dangerous tags.
 * 
 * All <a> hyperlink tags have `target="_blank"` added to open the URLs in a new window.
 * 
 * @param input String with markdown
 * @param props Optional props to pass that influence the behavior.  
 * @returns String with HTML, wrapped with <p></p> tags.
 */
export function toHTML(input: string, props?: { allowedTags?: string[] }): string {

    if (!input) {
        return input;
    }

    const decoded = decode(input);

    const linked = linkify(decoded);

    // From https://github.com/markedjs/marked/issues/655#issuecomment-383226346
    const renderer = new marked.Renderer();
    const linkRenderer = renderer.link;
    renderer.link = (href, title, text): string => {
        const html = linkRenderer.call(renderer, href, title, text);
        return html.replace(/^<a /, `<a target="_blank" rel="nofollow" `);
    };
    const dirty = marked(linked, { renderer, breaks: true, xhtml: true });

    const clean = sanitize(dirty, props);
    return clean;
}