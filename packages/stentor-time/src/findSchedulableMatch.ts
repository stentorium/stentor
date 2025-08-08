/*! Copyright (c) 2025, XAPP AI */
import { DateTime, Duration } from "luxon";
import { isScheduled } from "stentor-guards";
import { Scheduled } from "stentor-models";
import { findMostSpecificSchedulable } from "./findMostSpecificSchedulable";
import { log } from "stentor-logger";

function normalizeDurationUnit(unit: string): string {
  switch (unit.toLowerCase()) {
    case "ms":
    case "millisecond":
    case "milliseconds":
      return "milliseconds";
    case "s":
    case "second":
    case "seconds":
      return "seconds";
    case "m":
    case "minute":
    case "minutes":
      return "minutes";
    case "h":
    case "hour":
    case "hours":
      return "hours";
    case "d":
    case "day":
    case "days":
      return "days";
    default:
      throw new Error(`Invalid unit ${unit}`);
  }
}

/**
 * Within a list of Schedulables, find a match for the provided time
 * or current time if no time is provided.
 */
export function findSchedulableMatch<T extends object>(
  schedules: (T | Scheduled<T>)[] | undefined,
  baseNowInput: DateTime = DateTime.now().toUTC()
): Scheduled<T> | undefined {
  if (!Array.isArray(schedules)) {
    return undefined;
  }

  const baseNow = baseNowInput ?? DateTime.now().toUTC();

  const matches: Scheduled<T>[] = [];

  for (const item of schedules) {
    if (!isScheduled(item)) {
      log().debug(`Item is not scheduled: ${JSON.stringify(item)}, skipping`);
      continue;
    }

    const { time, format, timeZone, dayOfWeek } = item.schedule.start;

    const now = timeZone ? baseNow.setZone(timeZone) : baseNow;

    let start: DateTime;

    if (format) {
      let patchedFormat = format;
      const patchedTime = time;

      // Legacy format handling: H:mm Z D
      if (format === "H:mm Z D") {
        const match = time.match(/^(\d{1,2}:\d{2}) ([+-]\d{4}) (\d)$/);
        if (match) {
          const [, timePart, offset, legacyDayOfWeek] = match;

          // Legacy format day mapping: directly map to the target date in March 2017
          // The 'D' token represents day-of-month, not day-of-week
          const legacyDay = parseInt(legacyDayOfWeek);
          const targetDate = DateTime.fromObject(
            { year: 2017, month: 3, day: legacyDay, hour: 0 },
            { zone: "America/New_York" }
          );

          const fullDate = targetDate.toFormat("yyyy-MM-dd");

          const [h, m] = timePart.split(":");
          const normalizedTime = `${h.padStart(2, "0")}:${m}`;
          const fullTime = `${fullDate} ${normalizedTime} ${offset}`;

          const parsed = DateTime.fromFormat(fullTime, "yyyy-MM-dd HH:mm ZZZ", {
            setZone: true,
            locale: "en",
          });

          start = parsed;
        }
      } else {
        // Normal format-based parsing
        if (format?.includes("Z") && /\bZ\b/.test(time)) {
          patchedFormat = format.replace("Z", "'Z'");
        }

        start = DateTime.fromFormat(patchedTime, patchedFormat, {
          zone: timeZone || baseNow.zone,
        });
      }
    } else {
      start = DateTime.fromISO(time, { zone: timeZone || baseNow.zone });
    }

    if (!start.isValid) {
      log().debug(
        `Invalid start date for schedule: time=${time}, format=${format}`,
        start.invalidReason,
        start.invalidExplanation
      );
      continue;
    }

    // Patch missing date parts like moment-timezone
    if (format) {
      const hasYear = format.includes("y") || format.includes("Y");
      const hasMonth = format.includes("M");
      const hasDay = format.includes("d") || format.includes("D");
      const hasDayOfYear = format.includes("o") || format.includes("D"); // luxon uses `o` for day-of-year

      if (!(hasYear && hasMonth && hasDay)) {
        if (!hasYear) {
          start = start.set({ year: now.year });
        }
        if (!hasDayOfYear) {
          if (!hasMonth) {
            start = start.set({ month: now.month });
          }
          if (!hasDay) {
            start = start.set({ day: now.day });
          }
        }
      }
    }

    // Compute end time
    const durationAmount = item.schedule.duration.amount;
    const durationFormat = item.schedule.duration.format;

    let duration: Duration;
    try {
      const normalized = normalizeDurationUnit(durationFormat);
      duration = Duration.fromObject({ [normalized]: durationAmount });
    } catch (err) {
      log().debug(`Unsupported duration format: ${durationFormat}`);
      continue;
    }

    const end = start.plus(duration);

    // Check day of week if applicable (skip for legacy format since it's already encoded in start time)
    let correctDayOfWeek = true;
    if (dayOfWeek && format !== "H:mm Z D") {
      const currentDow = now.weekday % 7; // 0 (Sun) – 6 (Sat)
      if (!dayOfWeek.includes(currentDow.toString())) {
        correctDayOfWeek = false;
      }
    }

    // Match if now is within [start, end)
    if (correctDayOfWeek) {
      if (now >= start && now < end) {
        matches.push(item);
      } else {
        log().debug(
          `Schedule starting ${time}, with format ${format}, and duration ${durationAmount} ${durationFormat} was NOT in-between ${start.toISO()} --> ${end.toISO()}`
        );
      }
    } else {
      log().debug(
        `Incorrect day of the week for schedule starting ${time}, with format ${format}, and duration ${durationAmount} ${durationFormat}`
      );
    }
  }

  return findMostSpecificSchedulable(matches);
}
