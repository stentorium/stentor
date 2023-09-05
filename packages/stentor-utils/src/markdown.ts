/*! Copyright (c) 2021, XAPPmedia */
import { decode } from "html-entities";
import { marked } from "marked";
import { markedXhtml } from "marked-xhtml";
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

    // https://www.npmjs.com/package/marked-xhtml 
    marked.use(markedXhtml());

    // From https://github.com/markedjs/marked/issues/655#issuecomment-383226346
    const renderer = new marked.Renderer();
    // copy the existing link renderer for use later
    const linkRenderer = renderer.link;
    // override it by calling the original then changing it out to use target _blank
    renderer.link = (href, title, text): string => {
        const html = linkRenderer.call(renderer, href, title, text);
        return html.replace(/^<a /, `<a target="_blank" rel="nofollow" `);
    };
    // Just disable it by passing it through.  It messes with the formatting too much
    renderer.code = (code): string => {
        return code;
    }
    const dirty = marked(linked, { renderer, breaks: true });

    const clean = sanitize(dirty, props);
    return clean;
}