/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import * as sinon from "sinon";

import {
    dateTimeToString,
    getDateTimeFrom,
    getDateTimeRangeFrom,
    isDateTime,
    isDateTimeRange,
    isDateTimeRangeString,
    isISO8601,
    isISO8601Range,
    parseDate,
    parseRelativeDate
} from "../dateTime";

describe(`#${dateTimeToString.name}()`, () => {
    describe("when passed undefined", () => {
        it("returns an empty string", () => {
            expect(dateTimeToString(undefined)).to.deep.equal("");
        });
    });
    describe("when passed invalid input", () => {
        it("returns an empty string", () => {
            const badInput: any = { date: { name: 'date', value: { date: '2019-09-11' } } };
            expect(dateTimeToString(badInput)).to.deep.equal("");
        });
    });
    describe("when passed just a date time", () => {
        it("returns the correct result", () => {
            expect(
                dateTimeToString({
                    date: "2020-07-19",
                    time: "23:59:59"
                })
            ).to.deep.equal("2020-07-19T23:59:59");
            expect(
                dateTimeToString({
                    time: "23:59:59"
                })
            ).to.deep.equal("23:59:59");
            expect(
                dateTimeToString({
                    date: "2020-07-19"
                })
            ).to.deep.equal("2020-07-19");
            expect(
                dateTimeToString({
                    date: "2020-7-4"
                })
            ).to.deep.equal("2020-07-04");
        });
        describe('with date not formatted yyyy-MM-dd', () => {
            it("returns the correct result", () => {
                expect(
                    dateTimeToString({
                        date: "2020-7-4"
                    })
                ).to.deep.equal("2020-07-04");
            });
        });
    });
    describe("when passed a range", () => {
        it("returns the correct value", () => {
            expect(
                dateTimeToString({
                    start: {
                        date: "2019-07-19",
                        time: "00:00:00"
                    },
                    end: {
                        date: "2020-07-19",
                        time: "23:59:59"
                    }
                })
            ).to.deep.equal("2019-07-19T00:00:00 --> 2020-07-19T23:59:59");
            // This one is odd.  Not really accurate representation
            expect(
                dateTimeToString({
                    start: {
                        time: "00:00:00"
                    },
                    end: {
                        date: "2020-07-19",
                        time: "23:59:59"
                    }
                })
            ).to.deep.equal("00:00:00 --> 2020-07-19T23:59:59");
            expect(
                dateTimeToString({
                    start: {
                        time: "00:00:00"
                    },
                    end: undefined
                })
            ).to.deep.equal("00:00:00");
            expect(
                dateTimeToString({
                    start: undefined,
                    end: {
                        date: "2020-07-19",
                        time: "23:59:59"
                    }
                })
            ).to.deep.equal("2020-07-19T23:59:59");
        });
        describe('with dates not formatted yyyy-MM-dd', () => {
            it("returns the correct result", () => {
                expect(
                    dateTimeToString(
                        {
                            start: {
                                date: "2020-7-4"
                            },
                            end: {
                                date: "2020-7-10"
                            }
                        }
                    )
                ).to.deep.equal("2020-07-04 --> 2020-07-10");
            });
        });
    });
});

describe(`#${getDateTimeRangeFrom.name}()`, () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(getDateTimeRangeFrom(undefined)).to.be.undefined;
        });
    });
    describe("when passed a normal string", () => {
        it("returns undefined", () => {
            expect(getDateTimeRangeFrom("foo")).to.be.undefined;
        });
    });
    describe("when passed an ISO-8601 range", () => {
        it("returns the correct result", () => {
            expect(getDateTimeRangeFrom("2019-09-11 --> 2019-09-12")).to.deep.equal({
                start: { date: "2019-09-11" },
                end: { date: "2019-09-12" }
            });
            expect(getDateTimeRangeFrom("2019-09-11/2019-09-12")).to.deep.equal({
                start: { date: "2019-09-11" },
                end: { date: "2019-09-12" }
            });
            expect(getDateTimeRangeFrom("2019-09-11T12:00:00 --> 2019-09-12T13:00:00")).to.deep.equal({
                start: { date: "2019-09-11", time: "12:00:00" },
                end: { date: "2019-09-12", time: "13:00:00" }
            });
            expect(getDateTimeRangeFrom("2019-09-11T12:00:00/2019-09-12T13:00:00")).to.deep.equal({
                start: { date: "2019-09-11", time: "12:00:00" },
                end: { date: "2019-09-12", time: "13:00:00" }
            });
        });
    });
});

describe(`#${getDateTimeFrom.name}()`, () => {
    describe("when passed undefined", () => {
        it("returns undefined", () => {
            expect(getDateTimeFrom(undefined)).to.be.undefined;
        });
    });
    describe("when passed a Date", () => {
        it("returns the correct result", () => {
            const date = new Date("2019-09-11T18:25:05-04:00");
            expect(getDateTimeFrom(date)).to.deep.equal({
                date: "2019-09-11",
                // Remember, these tests are running in UTC,
                // see package.json "test":"TZ=UTC mocha..."
                time: "22:25:05",
                tz: "Z"
            });
        });
    });
    describe("when passed a date string", () => {
        it("returns the correct output", () => {
            expect(getDateTimeFrom("2019-06-02T00:00:00-04:00")).to.deep.equal({
                date: "2019-06-02",
                time: "00:00:00",
                tz: "-04:00"
            });
        });
        describe("with includeOnly set to date", () => {
            it("returns the correct output", () => {
                expect(getDateTimeFrom("2019-06-02T00:00:00-04:00", "date")).to.deep.equal({
                    date: "2019-06-02"
                });
            });
        });
        describe("with includeOnly set to time", () => {
            it("returns the correct output", () => {
                expect(getDateTimeFrom("2019-06-02T00:00:00-04:00", "time")).to.deep.equal({
                    time: "00:00:00",
                    tz: "-04:00"
                });
            });
        });
        describe("without a timezone", () => {
            it("returns the correct output", () => {
                expect(getDateTimeFrom("2019-06-02T00:00:00")).to.deep.equal({
                    date: "2019-06-02",
                    time: "00:00:00"
                });
            });
        });
        describe("when passed just a date", () => {
            it("returns the correct output", () => {
                expect(getDateTimeFrom("2019-06-02")).to.deep.equal({
                    date: "2019-06-02"
                });
            });
        });
        describe("when passed just a time", () => {
            it("returns the correct output", () => {
                expect(getDateTimeFrom("00:00:00")).to.deep.equal({
                    time: "00:00:00"
                });
                expect(getDateTimeFrom("00:00:00-04:00")).to.deep.equal({
                    time: "00:00:00",
                    tz: "-04:00"
                });
            });
        });
    });
    describe("when passed a phrase string", () => {
        it("returns the string", () => {
            expect(getDateTimeFrom("this is a normal response")).to.be.undefined;
        });
    });
});

describe(`#${isISO8601.name}()`, () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(isISO8601(undefined)).to.be.false;
        });
    });
    describe("when passed an empty string", () => {
        it("returns false", () => {
            expect(isISO8601("")).to.be.false;
        });
    });
    describe("when passed a normal string", () => {
        it("returns false", () => {
            expect(isISO8601("foo")).to.be.false;
        });
    });
    describe("when passed a ISO-8601 string", () => {
        it("returns true", () => {
            expect(isISO8601("2019-06-05")).to.be.true;
            expect(isISO8601("12:00:00-04:00")).to.be.true;
            expect(isISO8601("12:00:00")).to.be.true;
            expect(isISO8601("2019-06-05T12:00:00-04:00")).to.be.true;
        });
    });
});

describe(`#${isDateTimeRangeString.name}()`, () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(isDateTimeRangeString(undefined)).to.be.false;
        });
    });
    describe("when passed a normal string", () => {
        it("returns false", () => {
            expect(isDateTimeRangeString("foo")).to.be.false;
        });
    });
    describe("when passed a date time range string", () => {
        it("returns true", () => {
            expect(isDateTimeRangeString("2019-06-05 --> 2019-06-05")).to.be.true;
            expect(isDateTimeRangeString("2019-06-05T12:00:00-04:00 --> 2019-06-05T14:00:00-04:00")).to.be.true;
        });
    });
});

describe(`#${isISO8601Range.name}()`, () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(isISO8601Range(undefined)).to.be.false;
        });
    });
    describe("when passed a normal string", () => {
        it("returns false", () => {
            expect(isISO8601Range("foo")).to.be.false;
        });
    });
    describe("when passed a ISO-8601 range string", () => {
        it("returns true", () => {
            expect(isISO8601Range("2019-06-05/2019-06-05")).to.be.true;
            expect(isISO8601Range("2019-06-05T12:00:00-04:00/2019-06-05T14:00:00-04:00")).to.be.true;
        });
    });
});

describe(`#${parseRelativeDate.name}`, () => {
    describe("when passed a valid relative date", () => {
        let clock: sinon.SinonFakeTimers;
        beforeEach(() => {
            const date = new Date("2019-09-11T18:25:04Z");
            clock = sinon.useFakeTimers(date.getTime());
        });
        afterEach(() => {
            clock.restore();
        });
        it("converts to a date", () => {
            const lastSaturday = parseRelativeDate("LAST_SATURDAY");
            expect(lastSaturday).to.exist;
            expect(isDateTime(lastSaturday)).to.be.true;
            if (isDateTime(lastSaturday)) {
                expect(lastSaturday.date).to.equal("2019-09-07");
                expect(lastSaturday.time).to.be.undefined;
            }

            const lastSunday = parseRelativeDate("LAST_SUNDAY");
            expect(lastSunday).to.exist;
            expect(isDateTime(lastSunday)).to.be.true;
            if (isDateTime(lastSunday)) {
                expect(lastSunday.date).to.equal("2019-09-08");
                expect(lastSunday.time).to.be.undefined;
            }

            const lastWeek = parseRelativeDate("LAST_WEEK");
            expect(lastWeek).to.exist;
            expect(isDateTimeRange(lastWeek)).to.be.true;
            if (isDateTimeRange(lastWeek)) {
                expect(lastWeek).to.deep.equal({
                    start: {
                        date: "2019-09-01"
                    },
                    end: {
                        date: "2019-09-07"
                    }
                });
            }

            const thisWeek = parseRelativeDate("THIS_WEEK");
            expect(thisWeek).to.exist;
            expect(isDateTimeRange(thisWeek)).to.be.true;
            if (isDateTimeRange(thisWeek)) {
                expect(thisWeek).to.deep.equal({
                    start: {
                        date: "2019-09-08"
                    },
                    end: {
                        date: "2019-09-14"
                    }
                });
            }

            const nextWeek = parseRelativeDate("NEXT_WEEK");
            expect(nextWeek).to.exist;
            expect(isDateTimeRange(nextWeek)).to.be.true;
            if (isDateTimeRange(nextWeek)) {
                expect(nextWeek).to.deep.equal({
                    start: {
                        date: "2019-09-15"
                    },
                    end: {
                        date: "2019-09-21"
                    }
                });
            }

            const nextMonth = parseRelativeDate("NEXT_MONTH");
            expect(nextMonth).to.exist;
            expect(isDateTimeRange(nextMonth)).to.be.true;
            if (isDateTimeRange(nextMonth)) {
                expect(nextMonth).to.deep.equal({
                    start: {
                        date: "2019-10-01"
                    },
                    end: {
                        date: "2019-10-31"
                    }
                });
            }

            const nextTwoMonths = parseRelativeDate("NEXT_TWO_MONTHS");
            expect(nextTwoMonths).to.exist;
            expect(isDateTimeRange(nextTwoMonths)).to.be.true;
            if (isDateTimeRange(nextTwoMonths)) {
                expect(nextTwoMonths).to.deep.equal({
                    start: {
                        date: "2019-10-01"
                    },
                    end: {
                        date: "2019-11-30"
                    }
                });
            }

            const lastYear = parseRelativeDate("LAST_YEAR");
            expect(lastYear).to.exist;
            expect(isDateTimeRange(lastYear)).to.be.true;
            if (isDateTimeRange(lastYear)) {
                expect(lastYear).to.deep.equal({
                    start: {
                        date: "2018-01-01"
                    },
                    end: {
                        date: "2018-12-31"
                    }
                });
            }

            const lastWeekend = parseRelativeDate("LAST_WEEKEND");
            expect(lastWeekend).to.exist;
            expect(isDateTimeRange(lastWeekend)).to.be.true;
            if (isDateTimeRange(lastWeekend)) {
                expect(lastWeekend).to.deep.equal({
                    start: {
                        date: "2019-09-07"
                    },
                    end: {
                        date: "2019-09-08"
                    }
                });
            }

            const thisWeekend = parseRelativeDate("THIS_WEEKEND");
            expect(thisWeekend).to.exist;
            expect(isDateTimeRange(thisWeekend)).to.be.true;
            if (isDateTimeRange(thisWeekend)) {
                expect(thisWeekend).to.deep.equal({
                    start: {
                        date: "2019-09-14"
                    },
                    end: {
                        date: "2019-09-15"
                    }
                });
            }
        });
        describe("with ES6 literal notation", () => {
            it("converts to a date", () => {
                const lastSaturday = parseRelativeDate("${LAST_SATURDAY}");
                expect(lastSaturday).to.exist;
                expect(isDateTime(lastSaturday)).to.be.true;
                if (isDateTime(lastSaturday)) {
                    expect(lastSaturday.date).to.equal("2019-09-07");
                    expect(lastSaturday.time).to.be.undefined;
                }

                const lastSunday = parseRelativeDate("${LAST_SUNDAY}");
                expect(lastSunday).to.exist;
                expect(isDateTime(lastSunday)).to.be.true;
                if (isDateTime(lastSunday)) {
                    expect(lastSunday.date).to.equal("2019-09-08");
                    expect(lastSunday.time).to.be.undefined;
                }

                const lastWeek = parseRelativeDate("${LAST_WEEK}");
                expect(lastWeek).to.exist;
                expect(isDateTimeRange(lastWeek)).to.be.true;
                if (isDateTimeRange(lastWeek)) {
                    expect(lastWeek).to.deep.equal({
                        start: {
                            date: "2019-09-01"
                        },
                        end: {
                            date: "2019-09-07"
                        }
                    });
                }

                const lastTwoWeeks = parseRelativeDate("${LAST_TWO_WEEK}");
                expect(lastTwoWeeks).to.exist;
                expect(isDateTimeRange(lastTwoWeeks)).to.be.true;
                if (isDateTimeRange(lastTwoWeeks)) {
                    expect(lastTwoWeeks).to.deep.equal({
                        start: {
                            date: "2019-08-25"
                        },
                        end: {
                            date: "2019-09-07"
                        }
                    });
                }

                const nextTwoWeeks = parseRelativeDate("${NEXT_TWO_WEEKS}");
                expect(nextTwoWeeks).to.exist;
                expect(isDateTimeRange(nextTwoWeeks)).to.be.true;
                if (isDateTimeRange(nextTwoWeeks)) {
                    expect(nextTwoWeeks).to.deep.equal({
                        start: {
                            date: "2019-09-15"
                        },
                        end: {
                            date: "2019-09-28"
                        }
                    });
                }

                const thisWeek = parseRelativeDate("${THIS_WEEK}");
                expect(thisWeek).to.exist;
                expect(isDateTimeRange(thisWeek)).to.be.true;
                if (isDateTimeRange(thisWeek)) {
                    expect(thisWeek).to.deep.equal({
                        start: {
                            date: "2019-09-08"
                        },
                        end: {
                            date: "2019-09-14"
                        }
                    });
                }

                const nextWeek = parseRelativeDate("${NEXT_WEEK}");
                expect(nextWeek).to.exist;
                expect(isDateTimeRange(nextWeek)).to.be.true;
                if (isDateTimeRange(nextWeek)) {
                    expect(nextWeek).to.deep.equal({
                        start: {
                            date: "2019-09-15"
                        },
                        end: {
                            date: "2019-09-21"
                        }
                    });
                }

                const nextMonth = parseRelativeDate("${NEXT_MONTH}");
                expect(nextMonth).to.exist;
                expect(isDateTimeRange(nextMonth)).to.be.true;
                if (isDateTimeRange(nextMonth)) {
                    expect(nextMonth).to.deep.equal({
                        start: {
                            date: "2019-10-01"
                        },
                        end: {
                            date: "2019-10-31"
                        }
                    });
                }

                const lastYear = parseRelativeDate("${LAST_YEAR}");
                expect(lastYear).to.exist;
                expect(isDateTimeRange(lastYear)).to.be.true;
                if (isDateTimeRange(lastYear)) {
                    expect(lastYear).to.deep.equal({
                        start: {
                            date: "2018-01-01"
                        },
                        end: {
                            date: "2018-12-31"
                        }
                    });
                }

                const lastTwoYear = parseRelativeDate("${LAST_TWO_YEAR}");
                expect(lastTwoYear).to.exist;
                expect(isDateTimeRange(lastTwoYear)).to.be.true;
                if (isDateTimeRange(lastTwoYear)) {
                    expect(lastTwoYear).to.deep.equal({
                        start: {
                            date: "2017-01-01"
                        },
                        end: {
                            date: "2018-12-31"
                        }
                    });
                }

                const lastWeekend = parseRelativeDate("${LAST_WEEKEND}");
                expect(lastWeekend).to.exist;
                expect(isDateTimeRange(lastWeekend)).to.be.true;
                if (isDateTimeRange(lastWeekend)) {
                    expect(lastWeekend).to.deep.equal({
                        start: {
                            date: "2019-09-07"
                        },
                        end: {
                            date: "2019-09-08"
                        }
                    });
                }

                const thisWeekend = parseRelativeDate("${THIS_WEEKEND}");
                expect(thisWeekend).to.exist;
                expect(isDateTimeRange(thisWeekend)).to.be.true;
                if (isDateTimeRange(thisWeekend)) {
                    expect(thisWeekend).to.deep.equal({
                        start: {
                            date: "2019-09-14"
                        },
                        end: {
                            date: "2019-09-15"
                        }
                    });
                }
            });
        });
    });
    describe("for a date on the weekend", () => {
        describe("on Sunday", () => {
            let clock: sinon.SinonFakeTimers;
            beforeEach(() => {
                const date = new Date("2019-09-15T18:25:03Z");
                clock = sinon.useFakeTimers(date.getTime());
            });
            afterEach(() => {
                clock.restore();
            });
            it("returns the correct date", () => {
                const thisWeekend = parseRelativeDate("THIS_WEEKEND");
                expect(thisWeekend).to.exist;
                expect(isDateTimeRange(thisWeekend)).to.be.true;
                if (isDateTimeRange(thisWeekend)) {
                    expect(thisWeekend).to.deep.equal({
                        start: {
                            date: "2019-09-14"
                        },
                        end: {
                            date: "2019-09-15"
                        }
                    });
                }
            });
        });
        describe("on Saturday", () => {
            let clock: sinon.SinonFakeTimers;
            beforeEach(() => {
                const date = new Date("2019-09-14T18:25:02Z");
                clock = sinon.useFakeTimers(date.getTime());
            });
            afterEach(() => {
                clock.restore();
            });
            it("returns the correct date", () => {
                const thisWeekend = parseRelativeDate("THIS_WEEKEND");
                expect(thisWeekend).to.exist;
                expect(isDateTimeRange(thisWeekend)).to.be.true;
                if (isDateTimeRange(thisWeekend)) {
                    expect(thisWeekend).to.deep.equal({
                        start: {
                            date: "2019-09-14"
                        },
                        end: {
                            date: "2019-09-15"
                        }
                    });
                }
            });
        });
    });
    describe("with mixed relative date & time", () => {
        let clock: sinon.SinonFakeTimers;
        beforeEach(() => {
            const date = new Date("2019-09-11T18:25:04Z");
            clock = sinon.useFakeTimers(date.getTime());
        });
        afterEach(() => {
            clock.restore();
        });
        it("converts correctly", () => {
            const lastSunday = parseRelativeDate("${LAST_SUNDAY}T12:00:00 --> ${LAST_SUNDAY}T14:00:00");
            expect(lastSunday).to.exist;
            expect(isDateTimeRange(lastSunday)).to.be.true;
            if (isDateTimeRange(lastSunday)) {
                expect(lastSunday.start.date).to.equal("2019-09-08");
                expect(lastSunday.start.time).to.equal("12:00:00");
                expect(lastSunday.end.date).to.equal("2019-09-08");
                expect(lastSunday.end.time).to.equal("14:00:00");
            }

            const mixed = parseRelativeDate("${LAST_THURSDAY}T12:00:00 --> ${LAST_FRIDAY}T14:00:00");
            expect(mixed).to.exist;
            expect(isDateTimeRange(mixed)).to.be.true;
            if (isDateTimeRange(mixed)) {
                expect(mixed.start.date).to.equal("2019-09-05");
                expect(mixed.start.time).to.equal("12:00:00");
                expect(mixed.end.date).to.equal("2019-09-06");
                expect(mixed.end.time).to.equal("14:00:00");
            }
        });
    });
});

describe(`#${parseDate.name}()`, () => {
    let clock: sinon.SinonFakeTimers;
    beforeEach(() => {
        const date = new Date("2019-09-11T18:25:01Z");
        clock = sinon.useFakeTimers(date.getTime());
    });
    afterEach(() => {
        clock.restore();
    });
    it("converts to a date", () => {
        expect(parseDate("today").date).to.equal("2019-09-11");
        expect(parseDate("last friday").date).to.equal("2019-09-06");
        expect(parseDate("yesterday").date).to.equal("2019-09-10");
        expect(parseDate("saturday").date).to.equal("2019-09-14");
        expect(parseDate("five weeks ago").date).to.equal("2019-08-07");
    });
});

describe(`#${isDateTime.name}()`, () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(isDateTime(undefined)).to.be.false;
        });
    });
    describe("when passed a date time", () => {
        it("returns true", () => {
            expect(isDateTime({ date: "2017-03-17", time: "" })).to.be.true;
        });
    });
    describe("when passed a date time range", () => {
        it("returns false", () => {
            expect(
                isDateTime({
                    start: { date: "2017-03-17", time: "" },
                    end: { date: "2017-03-17", time: "" }
                })
            ).to.be.false;
        });
    });
});

describe(`#${isDateTimeRange.name}()`, () => {
    describe("when passed undefined", () => {
        it("returns false", () => {
            expect(isDateTimeRange(undefined)).to.be.false;
        });
    });
    describe("when passed a date time", () => {
        it("returns false", () => {
            expect(isDateTimeRange({ date: "2017-03-17", time: "" })).to.be.false;
        });
    });
    describe("when passed a date time range", () => {
        it("returns true", () => {
            expect(
                isDateTimeRange({
                    start: { date: "2017-03-17", time: "" },
                    end: { date: "2017-03-17", time: "" }
                })
            ).to.be.true;
        });
    });
});
