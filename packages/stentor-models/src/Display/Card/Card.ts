/*! Copyright (c) 2019, XAPPmedia */
import { BaseDisplay } from "../Types";

export interface Card extends BaseDisplay {
    type: "CARD";
    title: string;
    content: string;
    smallImageUrl?: string;
    largeImageUrl?: string;
    accessibilityText?: string;
    buttons?: CardButton[];
}

export interface CardButton {
    title: string;
    openUrlAction: string;
}
