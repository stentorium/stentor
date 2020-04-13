/*! Copyright (c) 2020, XAPPmedia */
import { ChannelData } from "../Channel";
import { NLUData } from "./NLUData";
import { NLUService } from "./NLUService";

/**
 * Tests and gets an NLUService based on ChannelData or NLUData
 */
export interface NLUServiceGetter {
    /**
     * Tests the provided data to see if it is
     * the proper type for the NLUService that is 
     * returned by the get() method.
     * 
     * This can be a guard.
     * 
     * @param obj
     * @returns True if the provided data is for setting up the NLUService
     */
    test(obj: ChannelData | NLUData): boolean;
    /**
     * Based on the provided data it will generate 
     * an NLUService for use.
     * 
     * @param obj 
     * @returns 
     */
    get(obj: ChannelData | NLUData): NLUService;
}
