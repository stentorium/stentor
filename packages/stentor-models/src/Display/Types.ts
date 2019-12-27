/*! Copyright (c) 2019, XAPPmedia */
import {
    GoogleActionsV2RichResponseItem,
    GoogleActionsV2UiElementsCarouselSelect,
    GoogleActionsV2UiElementsListSelect
} from "actions-on-google";
import { interfaces, ui } from "ask-sdk-model";
import AlexaCard = ui.Card;
import RenderTemplateDirective = interfaces.display.RenderTemplateDirective;
import Template = interfaces.display.Template;
import { Card } from "./Card";
import { List } from "./List";
import { SimpleDisplay } from "./SimpleDisplay";

// Export these for easier access external the module
export { AlexaCard, RenderTemplateDirective };

export type BasicCardItem = Pick<GoogleActionsV2RichResponseItem, "basicCard">;

// TODO: We should rework this so that stentor-models doesn't need to know about Alexa & Google
export interface NativeTemplateDirective {
    type: "NativeTemplate";
    template: Template; // | interface.display.GoogleWhateverTheyComeUpWith
}

export interface ListSelectData {
    "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec";
    listSelect: GoogleActionsV2UiElementsListSelect;
}

export interface CarouselSelectData {
    "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec";
    carouselSelect: GoogleActionsV2UiElementsCarouselSelect;
}

export type Display =
    | AlexaCard
    | BasicCardItem
    | Card
    | CarouselSelectData
    | List // TODO: This isn't needed. The "ImageForwardList" and the "TextForwardList" covers the list and the carousel
    | ListSelectData
    | NativeTemplateDirective
    | RenderTemplateDirective
    | SimpleDisplay
    | object;
