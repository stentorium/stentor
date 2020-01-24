/*! Copyright (c) 2019, XAPPmedia */
import { Data } from "stentor-models";
/**
 *
 */
export interface DelegatingData extends Data {
    delegateTo: string;
    delegateData: any;
}
