/*! Copyright (c) 2019, XAPPmedia */
export interface DateTime {
    /**
     * ISO-8601 for time, in the format HH:mm:ss
     */
    time?: string;
    /**
     * ISO-8601 for the date, in the format YYYY-MM-dd
     */
    date?: string;
    /**
     * ISO-8601 timezone offset string in the format -05:00 or Z
     *
     * @type {string}
     * @memberof DateTime
     */
    tz?: string;
}
export interface DateTimeRange {
    /**
     * Start of the range
     */
    start: DateTime;
    /**
     * End of the range.
     */
    end: DateTime;
}
