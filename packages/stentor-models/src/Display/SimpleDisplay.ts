/*! Copyright (c) 2019, XAPPmedia */
import { Image } from "./Image";
import { TextContent } from "./TextContent";

export interface DisplayListItem {
    token: string;
    title: string;
    description: string;
    image: Image;
}
/**
 * The base Display structure
 */
export interface SimpleDisplay {
    type:
        | "ImageDisplay"
        | "ShortText"
        | "LongText"
        | "ImageRightDetail"
        | "ImageLeftDetail"
        | "ImageForwardList"
        | "TextForwardList";
    token: string;
    backgroundImage?: Image;
    image?: Image;
    title?: string;
    textContent?: TextContent;
    backButtonVisible?: boolean;
    listItems?: DisplayListItem[];
}
