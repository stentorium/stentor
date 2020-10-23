/*! Copyright (c) 2020, XAPPmedia */
import { Duration, DurationFormat } from "stentor-models";
import { existsAndNotEmpty } from "../array";
import { toNumber } from "../string";
import { DURATION_FORMAT_TO_MS_MULTIPLIER } from "./durationFormatGreaterThan"

/**
 * Add durations together, combining to the provided format. 
 * 
 * @param durations 
 * @param format 
 */
export function addDurations(durations: Duration[], format: DurationFormat, round = false): Duration {

    if (!existsAndNotEmpty(durations)) {
        return {
            amount: 0,
            format
        }
    }

    // Fast exit conditions
    if (durations.length === 1 && DURATION_FORMAT_TO_MS_MULTIPLIER[durations[0].format] === DURATION_FORMAT_TO_MS_MULTIPLIER[format]) {
        return { amount: durations[0].amount, format };
    }

    // Ok, now the calculation, create 
    const ref = Date.now();
    // copy it
    let date = ref;
    // The idea here is to convert everything to MS, add it to the date and the subtract it
    // from the ref, then convert it back to the desired units.
    let asMS = 0;
    // Go through each
    durations.forEach((duration) => {
        asMS = asMS + DURATION_FORMAT_TO_MS_MULTIPLIER[duration.format] * duration.amount;
    });
    // Add it to the date
    date += asMS;
    // Get the multiplier and divide it!
    let amount = (date - ref) / DURATION_FORMAT_TO_MS_MULTIPLIER[format];
    // Optional rounding
    if (round) {
        amount = toNumber(amount.toFixed(2));
    }
    return {
        amount,
        format
    };
}