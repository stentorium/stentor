/*! Copyright (c) 2019, XAPPmedia */
import { Prefix, PrefixFunction } from "./EventService";

export function isPrefixFunction(prefix: Prefix): prefix is PrefixFunction {
    return typeof prefix === "function";
}
