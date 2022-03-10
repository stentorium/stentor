/*! Copyright (c) 2019, XAPPmedia */
import { format, isSameDay, parse } from "date-fns";
import { DateTime, Duration, DurationFormat, ResponseOutput, DateTimeRange, RequestSlotValues } from "stentor-models";
import { dateTimeToString, isDateTime, isDateTimeRange } from "./dateTime";
import { dessmlify, ssmlify } from "./ssml";
import { listisize, ListDelimiter } from "./speech";
import { isDuration, DURATION_FORMAT_TO_MS_MULTIPLIER } from "./date-time";

/**
 * Ensures that an outputSpeech or reprompt, either string or ResponseOutput,
 * is a ResponseOutput.
 *
 * @param input Either a string or ResponseOutput to convert to a ResponseOutput
 */
export function toResponseOutput(input: string | ResponseOutput): ResponseOutput {
    if (typeof input === "undefined") {
        return input;
    }

    let responseOutput: ResponseOutput;

    if (typeof input === "string") {
        responseOutput = {
            ssml: ssmlify(input),
            displayText: dessmlify(input)
        };
    } else if (typeof input === "object") {
        responseOutput = {
            ...input,
            ssml: ssmlify(input.ssml),
            displayText: dessmlify(input.displayText)
        };
    }

    return responseOutput;
}

/**
 * Converts a date time object to a string that can be used in either SSML or display text.
 * 
 * @privateRemarks
 * We will want to consider how we tackle localization of dates.  date-fns
 * can handle it we just need to pass in the locale.  Additionally, when generating
 * a response for display, we may want to support a short and long form.
 * 
 * @beta 
 * @param value 
 * @param type 
 */
export function dateTimeToSpeech(value: DateTime, type: "ssml" | "displayText" = "ssml"): string {

    if (!value) {
        return "";
    }

    // If it is a time only, we need to just add the 
    // current date for parsing.  It won't be spoken 
    // back to the user, just for parsing.
    const toParse = { ...value };

    if (!toParse.date) {
        toParse.date = format(new Date(), "yyyy-MM-dd");
    }
    const date = Date.parse(dateTimeToString(toParse));
    let speech = "";
    if (value.date) {
        if (type === "ssml") {
            speech += `<say-as interpret-as="date" format="ymd">${format(date, "yyyy-MM-dd")}</say-as>`;
        } else {
            speech += `${format(date, "M-d-yyyy")}`
        }
    }

    if (value.time) {
        if (type === "ssml") {
            speech += `<say-as interpret-as="time">${format(date, "h:mm aa")}</say-as>`;
        } else {
            if (speech.length > 0) {
                speech += " ";
            }
            speech += `${format(date, "h:mm aa")}`
        }
    }

    return speech;
}

/**
 * Converts a date time range to speech to be added to a response.
 * 
 * In the case where the date is the same for the start and the end, the date
 * will only be mentioned once.  For example "on July 4th 2019 from 1:00 PM to 2:00PM"
 * 
 * 
 * @param value - DateTimeRange slot value
 * @param type - Optional type, defaults to "ssml".
 */
export function dateTimeRangeToSpeech(value: DateTimeRange, type: "ssml" | "displayText" = "ssml"): string {

    if (!value) {
        return "";
    }

    const start = value.start;
    const end = value.end;

    const refDate = new Date();

    // The default value
    let speech = `${dateTimeToSpeech(start, type)} to ${dateTimeToSpeech(end, type)}`;

    // We want to shorten this down if we can before
    // defaulting to {startDate} to {endDate}, which 
    // can be verbose.  
    //
    // Case 1: If it is the same date, just communicate the time difference
    // "on {date} from {time} to {time}"
    if (isSameDay(parse(start.date, "y-M-d", refDate), parse(end.date, "y-M-d", refDate))) {
        speech = `on ${dateTimeToSpeech({ date: start.date }, type)} from ${dateTimeToSpeech({ time: start.time }, type)} to ${dateTimeToSpeech({ time: end.time }, type)}`
    }

    return speech;
}

/**
 * Converts a duration to speech with appropriate pluralization.
 * 
 * @param duration 
 * @param type 
 */
export function durationToSpeech(duration: Duration, type: "ssml" | "displayText" = "ssml"): string {

    if (!duration) {
        return "";
    }

    const plural: boolean = duration.amount > 1;
    const amount = type === "ssml" ? `<say-as interpret-as="cardinal">${duration.amount}</say-as>` : duration.amount;

    // We need to get the singular, long form version of the format.
    const multiplier = DURATION_FORMAT_TO_MS_MULTIPLIER[duration.format];

    let rawFormat = duration.format;

    // Now find the one the doesn't end in "s" and the length is greater than 1
    Object.keys(DURATION_FORMAT_TO_MS_MULTIPLIER).forEach((key: DurationFormat) => {
        if (DURATION_FORMAT_TO_MS_MULTIPLIER[key] === multiplier) {
            if (key.length > rawFormat.length && !key.endsWith("s")) {
                rawFormat = key;
            }
        }
    });

    const format = plural ? `${rawFormat}s` : rawFormat;

    return `${amount} ${format}`;
}


/**
 * Based on the provided slot value, it will return the appropriate <say-as> tag.
 * 
 * {@link https://cloud.google.com/text-to-speech/docs/ssml#say%E2%80%91as}
 * {@link https://developer.amazon.com/en-US/docs/alexa/custom-skills/speech-synthesis-markup-language-ssml-reference.html#say-as}
 * {@link https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html#say-as-tag}
 * 
 * @param value 
 * @returns
 */
export function slotValueToSpeech(value: RequestSlotValues, type: "ssml" | "displayText" = "ssml"): string {

    let speech: string;

    switch (typeof value) {
        case "string":
            speech = value;
            break;
        case "number":
            speech = `${value}`;
            break;
        default:
        // let it remain undefined
    }

    if (isDateTime(value)) {
        speech = dateTimeToSpeech(value, type);
    }

    if (isDateTimeRange(value)) {
        speech = dateTimeRangeToSpeech(value, type);
    }

    if (isDuration(value)) {
        speech = durationToSpeech(value, type);
    }

    if (Array.isArray(value)) {
        // We have an array, listisize
        // Not sure how we let them decide if it is an AND or and OR situation
        // Right now we are using AND
        speech = listisize(value, ListDelimiter.and);
    }

    return speech;
}
