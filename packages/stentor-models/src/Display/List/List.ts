/*! Copyright (c) 2019, XAPPmedia */
import { BaseDisplay } from "../Types";

/**
 * List style display items.
 *
 * Can either be vertical style list or a carousel.
 *
 * This translates to a List/Carousel on the Google Assistant and ListTemplate1/ListTemplate2 on Amazon Alexa
 *
 * See {@link https://developers.google.com/actions/assistant/responses#list} and
 * {@link https://developer.amazon.com/docs/custom-skills/display-template-reference.html#listtemplate1}
 *
 */
export interface List extends BaseDisplay {
    /**
     * Type of list.
     *
     * LIST is vertical, translates to a List on Google and ListTemplate1 on Alexa
     * CAROUSEL is horizontal, translates to a Carousel on Google and ListTemplate2 on Alexa
     */
    type: "LIST" | "CAROUSEL";
    /**
     * Token is a reference to the list, required by Alexa
     */
    token?: string;
    /**
     * Title of the list, not required for Carousels on Google
     */
    title?: string;
    /**
     * The list items.
     */
    items: ListItem[];
    /**
     * Used when templating the list for automatic generation.
     * 
     * @beta This is not yet fully supported
     */
    itemsObject?: string;
    /**
     * When itemsObject is provided, this is the amount of list items to display
     * along with the offset within the list.
     * 
     * @beta This is not yet fully supported
     */
    range?: {
        length: number;
        from: number;
    }
}

export interface ListItem {
    /**
     * Title of the list item, referred to as PrimaryText on Alexa.
     */
    title: string;
    /**
     * Used as a reference for when the list item is selected.
     *
     * This is the same as a key on Google.
     */
    token: string;
    /**
     * Synonyms can be added so the user can speak the selection instead of touching the screen.
     *
     * Only supported on Google.
     */
    synonyms?: string[];
    /**
     * Description text of the list item, referred to as SecondaryText on Alexa.
     */
    description?: string;
    /**
     * The image for the list item.
     */
    image?: ListImage;
    /**
     * Optional list of buttons that will be displayed on the list item.
     */
    buttons?: ListButton[];
}

export interface ListImage {
    /**
     * The location of the image, publicly accessible.
     */
    url: string;
    /**
     * The optional height of the image
     */
    height?: number;
    /**
     * The optional width of the image
     */
    width?: number;
    /**
     * The optional location of the smaller version of the image (icon?), publicly accessible.
     */
    urlIcon?: string;
    /**
     * Describes the image for screen readers, referred to as ContentDescription on Alexa.
     */
    accessibilityText: string;
}

export interface ListButton {
    /**
     * Text to be displayed, also needs to be included in the interaction model
     */
    title: string;
}
