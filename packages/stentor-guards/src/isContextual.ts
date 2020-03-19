/*! Copyright (c) 2019, XAPPmedia */
import { Contextual } from "stentor-models";

export function isContextual(item: object): item is Contextual {
    return !!item && typeof (item as Contextual).context === "object";
}