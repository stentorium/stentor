/*! Copyright (c) 2019, XAPPmedia */
import { Card, Display, List, NativeTemplateDirective, SimpleDisplay } from "stentor-models";

/**
 * Check if the display is a simple display
 *
 * @export
 * @param {Display} display
 * @returns {display is SimpleDisplay}
 */
export function isSimpleDisplay(display: Display): display is SimpleDisplay {
    if (!display || (display as SimpleDisplay).type === undefined) {
        return false;
    }

    let isSimpleDisplay: boolean = false;

    switch ((display as SimpleDisplay).type) {
        case "ImageDisplay":
        case "ShortText":
        case "LongText":
        case "ImageRightDetail":
        case "ImageLeftDetail":
        case "ImageForwardList":
        case "TextForwardList":
            isSimpleDisplay = true;
            break;
        default:
    }

    return isSimpleDisplay;
}

/* Guards */

/**
 * Checks if the display template is native
 *
 * @export
 * @param {Display} display
 * @returns {display is NativeTemplateDirective}
 */
export function isNativeTemplateDirective(display: Display): display is NativeTemplateDirective {
    return !!display && (display as NativeTemplateDirective).type === "NativeTemplate";
}

/**
 * Checks if the display is a card
 *
 * @export
 * @param {Display} display
 * @returns {display is Card}
 */
export function isCard(display: Display): display is Card {
    return !!display && (display as Card).type === "CARD";
}
/**
 * Checks if the display is a List
 *
 * @export
 * @param {Display} display
 * @returns {display is List}
 */
export function isList(display: Display): display is List {
    return !!display && ((display as List).type === "LIST" || (display as List).type === "CAROUSEL");
}

// /**
//  * Checks if the display is a list for Google
//  *
//  * @export
//  * @param {Display} display
//  * @returns {display is ListSelectData}
//  */
// export function isListSelectData(display: Display): display is ListSelectData {
//     return !!display && (display as ListSelectData).listSelect !== undefined;
// }
//
// /**
//  * Checks if the display is a carousel for Google
//  *
//  * @export
//  * @param {Display} display
//  * @returns {display is CarouselSelectData}
//  */
// export function isCarouselSelectData(display: Display): display is CarouselSelectData {
//     return !!display && (display as CarouselSelectData).carouselSelect !== undefined;
// }
//
// /**
//  * Checks if the display is a card for Google
//  *
//  * @export
//  * @param {Display} display
//  * @returns {display is BasicCardItem}
//  */
// export function isBasicCardItem(display: Display): display is BasicCardItem {
//     return !!display && (display as BasicCardItem).basicCard !== undefined;
// }
