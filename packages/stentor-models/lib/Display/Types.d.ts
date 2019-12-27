/*! Copyright (c) 2019, XAPPmedia */
import { GoogleActionsV2RichResponseItem, GoogleActionsV2UiElementsCarouselSelect, GoogleActionsV2UiElementsListSelect } from "actions-on-google";
import { interfaces, ui } from "ask-sdk-model";
import AlexaCard = ui.Card;
import RenderTemplateDirective = interfaces.display.RenderTemplateDirective;
import Template = interfaces.display.Template;
import { Card } from "./Card";
import { List } from "./List";
import { SimpleDisplay } from "./SimpleDisplay";
export { AlexaCard, RenderTemplateDirective };
export declare type BasicCardItem = Pick<GoogleActionsV2RichResponseItem, "basicCard">;
export interface NativeTemplateDirective {
    type: "NativeTemplate";
    template: Template;
}
export interface ListSelectData {
    "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec";
    listSelect: GoogleActionsV2UiElementsListSelect;
}
export interface CarouselSelectData {
    "@type": "type.googleapis.com/google.actions.v2.OptionValueSpec";
    carouselSelect: GoogleActionsV2UiElementsCarouselSelect;
}
export declare type Display = AlexaCard | BasicCardItem | Card | CarouselSelectData | List | ListSelectData | NativeTemplateDirective | RenderTemplateDirective | SimpleDisplay | object;
