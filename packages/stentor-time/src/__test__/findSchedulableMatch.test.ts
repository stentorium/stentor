/*! Copyright (c) 2019, XAPPmedia */
/* tslint:disable:no-magic-numbers */
import { Schedulable } from "stentor-models";
import { expect } from "chai";
import * as moment from "moment-timezone";
import * as sinon from "sinon";
import { SCHEDULE_DEBUG_FORMAT } from "../Constants";
import { findSchedulableMatch } from "../findSchedulableMatch";

let now: moment.Moment;
let fiveHoursInTheFuture: Schedulable;
let today: Schedulable;
let tomorrow: Schedulable;
let nowForFiveSeconds: Schedulable;
let nowWithinHour: Schedulable;
const badData = {} as Schedulable;
let centralNow: Schedulable;
let keithIntro: Schedulable;
let jimAndDebIntro: Schedulable;
let specificDateAndTime: Schedulable;

describe("#findSchedulableMatch()", () => {
    before(() => {
        // Base all the tests off the same now
        now = moment();
        today = {
            schedule: {
                start: {
                    time: moment(now).format(),
                    dayOfWeek: moment(now)
                        .weekday()
                        .toString()
                },
                duration: {
                    amount: 5,
                    format: "s"
                }
            }
        };
        tomorrow = {
            schedule: {
                start: {
                    time: moment(now).format(),
                    dayOfWeek: (moment(now).weekday() + 1).toString()
                },
                duration: {
                    amount: 5,
                    format: "s"
                }
            }
        };
        nowForFiveSeconds = {
            schedule: {
                start: {
                    time: moment(now).format()
                },
                duration: {
                    amount: 5,
                    format: "s"
                }
            }
        };
        nowWithinHour = {
            schedule: {
                start: {
                    time: moment(now).format("HH:mm"),
                    format: "HH:mm"
                },
                duration: {
                    amount: 1,
                    format: "h"
                }
            }
        };
        fiveHoursInTheFuture = {
            schedule: {
                start: {
                    time: moment(now)
                        .add(5, "h")
                        .format()
                },
                duration: {
                    amount: 5,
                    format: "h"
                }
            }
        };

        specificDateAndTime = {
            schedule: {
                start: {
                    time: "2018-02-14 06:55",
                    format: "YYYY-MM-DD hh:mm",
                    timeZone: "America/New_York"
                },
                duration: {
                    amount: 155,
                    format: "minutes"
                }
            }
        };

        /* Time Zone Data */

        // Central: America/Chicago
        // Eastern: America/New_York

        centralNow = {
            schedule: {
                start: {
                    time: moment(now).format("HH:mm:ss ZZ"),
                    format: "HH:mm:ss ZZ",
                    timeZone: "America/Chicago"
                },
                duration: {
                    amount: 5,
                    format: "s"
                }
            }
        };
        // "Keith Intro 12:00 AM - 6:00 AM"
        keithIntro = {
            schedule: {
                start: {
                    time: "4:00 Z",
                    format: "H:mm Z",
                    timeZone: "America/New_York"
                },
                duration: {
                    amount: 6,
                    format: "h"
                }
            }
        };
        // "Jim and Deb Intro 6:00 AM - 10:00 AM"
        jimAndDebIntro = {
            schedule: {
                start: {
                    time: "10:00 Z",
                    format: "H:mm Z",
                    timeZone: "America/New_York"
                },
                duration: {
                    amount: 4,
                    format: "h"
                }
            }
        };
        // These are helpful when testing
        // console.info("\tRunning schedule tests with ");
        // console.info("\tnow as second ago " + now.format(SCHEDULE_DEBUG_FORMAT));
        // console.info("\tand actual now    " + moment().format(SCHEDULE_DEBUG_FORMAT));
    });
    it("returns undefined for an empty list", () => {
        expect(findSchedulableMatch([])).to.be.undefined;
    });
    it("returns undefined when it can't find a match", () => {
        expect(findSchedulableMatch([fiveHoursInTheFuture])).to.be.undefined;
    });
    it("uses the current time when no time is passed in", () => {
        expect(findSchedulableMatch([nowForFiveSeconds])).to.equal(nowForFiveSeconds);
    });
    it("doesn't crash with bad data", () => {
        expect(findSchedulableMatch).to.not.throw();
    });
    it("returns undefined when passed undefined", () => {
        expect(findSchedulableMatch(undefined)).to.be.undefined;
    });
    it("returns undefined when passed an object", () => {
        expect(findSchedulableMatch({} as any[])).to.be.undefined;
    });
    it("returns undefined for bad data", () => {
        expect(findSchedulableMatch([badData])).to.be.undefined;
    });
    it("does not match if incorrect day of week", () => {
        expect(findSchedulableMatch([tomorrow])).to.be.undefined;
    });
    it("matches with correct day of week", () => {
        expect(findSchedulableMatch([tomorrow, today])).to.equal(today);
    });
    describe("with time zones", () => {
        it("matches for the correct time zone", () => {
            // time in central
            const forMoment = moment(now).tz("America/Chicago");
            expect(findSchedulableMatch([centralNow], forMoment)).to.equal(centralNow);
        });
        describe("with a day light savings time moment", () => {
            describe("in the same timezone", () => {
                const forMoment = moment("2017-07-19 6:00 AM -04:00", "YYYY-MM-DD h:mm A ZZ").tz("America/New_York");
                let clock: sinon.SinonFakeTimers;
                beforeEach(() => {
                    clock = sinon.useFakeTimers(forMoment.valueOf());
                });
                afterEach(() => {
                    clock.restore();
                });
                it("matches correctly", () => {
                    expect(findSchedulableMatch([keithIntro, jimAndDebIntro], forMoment)).to.equal(jimAndDebIntro);
                });
            });
            describe("in a different timezone", () => {
                // Same time as above but now in central time, which is an hour back and -05 UTC offset
                const forMoment = moment("2017-07-19 4:59 AM -05:00", "YYYY-MM-DD h:mm A ZZ");
                let clock: sinon.SinonFakeTimers;
                beforeEach(() => {
                    clock = sinon.useFakeTimers(forMoment.valueOf());
                });
                afterEach(() => {
                    clock.restore();
                });
                it("matches correctly", () => {
                    expect(findSchedulableMatch([keithIntro, jimAndDebIntro], forMoment)).to.equal(keithIntro);
                });
            });
        });
        describe("with GMT", () => {
            describe("using days of week and GMT has already gone to the next day", () => {
                const forMoment = moment("4/01/2019 00:37:04 +00:00", SCHEDULE_DEBUG_FORMAT);
                let clock: sinon.SinonFakeTimers;
                beforeEach(() => {
                    clock = sinon.useFakeTimers(forMoment.valueOf());
                });
                afterEach(() => {
                    clock.restore();
                });

                const scheduleOne: Schedulable = {
                    schedule: {
                        duration: {
                            format: "minutes",
                            amount: 630
                        },
                        start: {
                            format: "HH:mm",
                            timeZone: "America/New_York",
                            dayOfWeek: "0",
                            time: "09:30"
                        }
                    }
                };

                const scheduleTwo: Schedulable = {
                    schedule: {
                        duration: {
                            format: "minutes",
                            amount: 90
                        },
                        start: {
                            format: "HH:mm:ss",
                            timeZone: "America/New_York",
                            dayOfWeek: "0",
                            time: "20:00:01"
                        }
                    }
                };
                it("picks the correct schedule", () => {
                    expect(findSchedulableMatch([scheduleOne, scheduleTwo])).to.equal(scheduleTwo);
                });
            });
            describe("within the same day", () => {
                // This replicates conditions that fail in production
                // We could not get the scheduling right due to the fact
                // the lambdas were running off of GMT and the timezone
                // conversion was not working
                const forMoment = moment("7/25/2017 17:06:05 +00:00", SCHEDULE_DEBUG_FORMAT);
                let clock: sinon.SinonFakeTimers;
                beforeEach(() => {
                    clock = sinon.useFakeTimers(forMoment.valueOf());
                });
                afterEach(() => {
                    clock.restore();
                });

                const schedule1: Schedulable = {
                    schedule: {
                        start: {
                            time: "13:00",
                            format: "H:mm",
                            timeZone: "America/New_York"
                        },
                        duration: {
                            amount: 1,
                            format: "h"
                        }
                    }
                };
                const schedule2: Schedulable = {
                    schedule: {
                        start: {
                            time: "14:00",
                            format: "H:mm",
                            timeZone: "America/New_York"
                        },
                        duration: {
                            amount: 1,
                            format: "h"
                        }
                    }
                };
                it("matches correctly", () => {
                    expect(findSchedulableMatch([schedule1, schedule2])).to.equal(schedule1);
                });
            });
            describe("on the next day", () => {
                // This case replicates a bug where GMT is already on the next day
                // and when we set the start time that is expected to be on the previous day
                // it still goes back to the previous day.
                const forMoment = moment("8/2/2017 00:00:05 +00:00", SCHEDULE_DEBUG_FORMAT);
                let clock: sinon.SinonFakeTimers;
                beforeEach(() => {
                    clock = sinon.useFakeTimers(forMoment.valueOf());
                });
                afterEach(() => {
                    clock.restore();
                });
                const schedule1: Schedulable = {
                    schedule: {
                        start: {
                            time: "00:00",
                            format: "H:mm",
                            timeZone: "America/New_York"
                        },
                        duration: {
                            amount: 1,
                            format: "h"
                        }
                    }
                };
                const schedule2: Schedulable = {
                    schedule: {
                        start: {
                            time: "19:00",
                            format: "H:mm",
                            timeZone: "America/New_York"
                        },
                        duration: {
                            amount: 5,
                            format: "h"
                        }
                    }
                };
                it("matches correctly", () => {
                    expect(findSchedulableMatch([schedule1, schedule2])).to.equal(schedule2);
                });
            });
        });
        describe("for a specific date", () => {
            it("matches correctly on the right day", () => {
                const forMoment = moment("2/14/2018 7:05:00 -05:00", SCHEDULE_DEBUG_FORMAT);
                expect(findSchedulableMatch([specificDateAndTime], forMoment)).to.equal(specificDateAndTime);
            });
            it("matches correctly on the wrong day", () => {
                const forMoment = moment("2/13/2018 7:05:00 -05:00", SCHEDULE_DEBUG_FORMAT);
                expect(findSchedulableMatch([specificDateAndTime], forMoment)).to.be.undefined;
            });
        });
        describe("for day of week on the next day", () => {
            beforeEach(() => {
                // time in central
                const forMoment = moment(now).tz("America/New_York");
                expect(findSchedulableMatch([centralNow], forMoment)).to.equal(centralNow);
            });
        });
    });
    describe("with multiple matching", () => {
        it("it picks the most specific", () => {
            expect(findSchedulableMatch([nowForFiveSeconds, nowWithinHour])).to.equal(nowForFiveSeconds);
        });
    });
});
