/*! Copyright (c) 2019, XAPPmedia */
import { Card } from "./Card";
import { List } from "./List";
import { SimpleDisplay } from "./SimpleDisplay";

export interface BaseDisplay {
    type: string;
    token?: string;
    title?: string;
}

export type Display =
    | Card
    | List
    | SimpleDisplay
    | object;
