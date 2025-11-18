/*! Copyright (c) 2022, XAPP AI */
import { Channelable } from "stentor-models";

/**
 * Type guard to check if the object implements Channeled.
 * 
 * @param item 
 * @returns Type checked boolean if the object implements Channeled
 */
export function isChannelable<T>(item: object): item is Channelable<T> {
    return !!item && (typeof (item as Channelable<T>).channel === "object");
}