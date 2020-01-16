/*! Copyright (c) 2019, XAPPmedia */
import { Card } from "./Card";
import { List } from "./List";
import { SimpleDisplay } from "./SimpleDisplay";

export type Display =
    | Card
    | List // TODO: This isn't needed. The "ImageForwardList" and the "TextForwardList" covers the list and the carousel
    | SimpleDisplay
    | object;
