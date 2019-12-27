/*! Copyright (c) 2019, XAPPmedia */
/**
 * List style display items.
 *
 * Can either be vertical style list or a carousel.
 *
 * This translates to a List/Carousel on the Google Assistant and ListTemplate1/ListTemplate2 on Amazon Alexa
 *
 * @see https://developers.google.com/actions/assistant/responses#list
 * @see https://developer.amazon.com/docs/custom-skills/display-template-reference.html#listtemplate1
 *
 */
export interface List {
    /**
     * Type of list.
     *
     * LIST is vertical, translates to a List on Google and ListTemplate1 on Alexa
     * CAROUSEL is horizontal, translates to a Carousel on Google and ListTemplate2 on Alexa
     *
     * @type {("LIST" | "CAROUSEL")}
     * @memberof List
     */
    type: "LIST" | "CAROUSEL";
    /**
     * Token is a reference to the list, required by Alexa
     *
     * @type {string}
     * @memberof List
     */
    token?: string;
    /**
     * Title of the list, not required for Carousels on Google
     *
     * @type {string}
     * @memberof List
     */
    title?: string;
    /**
     * The list items.
     *
     * @type {ListItem[]}
     * @memberof List
     */
    items: ListItem[];
}
export interface ListItem {
    /**
     * Title of the list item, referred to as PrimaryText on Alexa.
     *
     * @type {string}
     * @memberof ListItem
     */
    title: string;
    /**
     * Used as a reference for when the list item is selected.
     *
     * This is the same as a key on Google.
     *
     * @type {string}
     * @memberof ListItem
     */
    token: string;
    /**
     * Synonyms can be added so the user can speak the selection instead of touching the screen.
     *
     * Only supported on Google.
     *
     * @type {string[]}
     * @memberof ListItem
     */
    synonyms?: string[];
    /**
     * Description text of the list item, referred to as SecondaryText on Alexa.
     *
     * @type {string}
     * @memberof ListItem
     */
    description?: string;
    /**
     * The image for the list item.
     *
     * @type {ListImage}
     * @memberof ListItem
     */
    image?: ListImage;
}
export interface ListImage {
    /**
     * The location of the image, publicly accessible.
     *
     * @type {string}
     * @memberof ListImage
     */
    url: string;
    /**
     * The optional height of the image
     *
     * @type {number}
     * @memberof ListImage
     */
    height?: number;
    /**
     * The optional width of the image
     *
     * @type {number}
     * @memberof ListImage
     */
    width?: number;
    /**
     * The optional location of the smaller version of the image (icon?), publicly accessible.
     *
     * @type {string}
     * @memberof ListImage
     */
    urlIcon?: string;
    /**
     * Describes the image for screen readers, referred to as ContentDescription on Alexa.
     *
     * @type {string}
     * @memberof ListImage
     */
    accessibilityText: string;
}
