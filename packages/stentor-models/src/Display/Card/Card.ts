/*! Copyright (c) 2019, XAPPmedia */
import { BaseDisplay } from "../Types";

export interface Card extends BaseDisplay {
    type: "CARD";
    title: string;
    content: string;
    smallImageUrl?: string;
    largeImageUrl?: string;
    /**
     * When present, if the image is clicked the provided website will open.
     * 
     * @beta Not yet fully supported.
     */
    imageActionUrl?: string;
    accessibilityText?: string;
    buttons?: CardButton[];
}

export interface CardButton {
    title: string;
    openUrlAction: string;
}
