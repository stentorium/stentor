/*! Copyright (c) 2019, XAPPmedia */
export interface Card {
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
