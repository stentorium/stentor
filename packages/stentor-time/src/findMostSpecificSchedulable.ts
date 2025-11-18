/*! Copyright (c) 2025, XAPP AI */
import { isScheduled } from "stentor-guards";
import { Scheduled } from "stentor-models";

export interface ScheduleFormatScore {
  score: number;
  description?: string;
}

export interface ScheduleFormatScores {
  [format: string]: ScheduleFormatScore;
}

export const SCHEDULE_FORMAT_SCORES: ScheduleFormatScores = {
  YYYY: { score: 1 }, // moment
  YY: { score: 1 }, // moment
  yyyy: { score: 1 }, // luxon
  M: { score: 1 },
  MM: { score: 1 },
  D: { score: 1 },
  DD: { score: 1 },
  dd: { score: 1 },
  DDD: { score: 2 },
  H: { score: 2 },
  HH: { score: 2 },
  h: { score: 1 },
  hh: { score: 1 },
  a: { score: 1 },
  A: { score: 1 },
  m: { score: 1 },
  mm: { score: 1 },
};

export function determineSpecificityScore<T extends object>(scheduled: Scheduled<T> | undefined): number {
  if (!scheduled || !scheduled.schedule) {
    return 0;
  }

  const schedule = scheduled.schedule;
  const start = schedule.start;
  const format = start.format ?? "yyyy-MM-dd'T'HH:mm:ssZZ";

  const tokenRegex = /Y{2,4}|M{1,2}|D{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|a|A|Z{1,2}/g;

  const tokens = format.match(tokenRegex) ?? [];

  let score = 0;

  if (start.dayOfWeek) {
    score += 1;
  }

  for (const token of tokens) {
    const tokenScore = SCHEDULE_FORMAT_SCORES[token];
    if (tokenScore) {
      score += tokenScore.score;
    }
  }

  return score;
}

export function findMostSpecificSchedulable<T extends object>(
  schedules: (T | Scheduled<T>)[] | undefined
): Scheduled<T> | undefined {
  if (!Array.isArray(schedules) || schedules.length === 0) return undefined;

  let mostSpecific: Scheduled<T> | undefined;
  let currentScore = 0;

  for (const scheduled of schedules) {
    if (!isScheduled(scheduled)) continue;
    const score = determineSpecificityScore(scheduled);
    if (score > currentScore) {
      mostSpecific = scheduled;
      currentScore = score;
    }
  }

  return mostSpecific;
}
