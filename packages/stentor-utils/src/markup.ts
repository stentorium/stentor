/*! Copyright (c) 2019, XAPPmedia */

const markupTags = [".+"]; // ["b", "u", "i", "br", "font", "action", "img", "div"];

export function hasMarkup(speech: string): boolean {
    if (!speech) {
        return false;
    }

    let hasTags = false;
    markupTags.some(tag => {
       hasTags = hasTags || hasTag(speech, tag);
       return hasTags;
    });

    return hasTags;
}

function hasTag(speech: string, tag: string): boolean {
    const regex1 = new RegExp("(<" + tag + "([^>]+)>)", "ig");  //     /(<xxx([^>]+)>)/ig;
    const regex2 = new RegExp("(<\/" + tag + "([ ]*)>)", "ig"); //     /(<\/xxx([ ]*)>)/ig;
    return regex1.test(speech) || regex2.test(speech);
}
