/*! Copyright (c) 2019, XAPPmedia */
import { BaseDisplay } from "../Types";

export interface Card extends BaseDisplay {
    type: "CARD";
    /**
     * Card title
     */
    title: string;
    /**
     * Card secondary title, if available it is smaller font below title
     */
    subTitle?: string;
    /**
     * Description, typically used in the body of the card
     */
    content: string;
    /**
     * Small image, used on smaller form factors.
     */
    smallImageUrl?: string;
    /**
     * Large image, used on larger form factors
     */
    largeImageUrl?: string;
    /**
     * When present, if the image is clicked the provided website will open.
     *
     * @beta Not yet fully supported.
     */
    imageActionUrl?: string;
    /**
     * Used when available as the accessibility text for the image, if provided.
     */
    accessibilityText?: string;
    /**
     * Buttons for the card which typically appear below the body of the card near the bottom.
     */
    buttons?: CardButton[];
}

export interface CardButton {
    title: string;
    openUrlAction: string;
}
