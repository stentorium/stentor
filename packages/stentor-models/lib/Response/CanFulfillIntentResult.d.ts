/*! Copyright (c) 2019, XAPPmedia */
export declare enum ThreeChoices {
    Yes = "YES",
    No = "NO",
    Maybe = "MAYBE"
}
export interface CanFulfillIntentSlotResult {
    canUnderstand?: ThreeChoices;
    canFulfill?: ThreeChoices;
}
export interface CanFulfillIntentResult {
    canFulfill: ThreeChoices;
    slots: {
        [slotName: string]: CanFulfillIntentSlotResult;
    };
}
