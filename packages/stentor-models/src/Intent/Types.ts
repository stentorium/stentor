/*! Copyright (c) 2019, XAPPmedia */

// Language Codes
export type LangCodeEnUs = "en-US";
export type LangCode = LangCodeEnUs;

// Supported built-in
export type CancelIntent = "CancelIntent";
export type FirstIntent = "FirstIntent";
export type HelpIntent = "HelpIntent";
export type LatestIntent = "LatestIntent";
export type LoopOffIntent = "LoopOffIntent";
export type LoopOnIntent = "LoopOnIntent";
export type NextIntent = "NextIntent";
export type NoIntent = "NoIntent";
export type PauseIntent = "PauseIntent";
export type PlayIntent = "PlayIntent";
export type PreviousIntent = "PreviousIntent";
export type RepeatIntent = "RepeatIntent";
export type ResumeIntent = "ResumeIntent";
export type ShuffleOffIntent = "ShuffleOffIntent";
export type ShuffleOnIntent = "ShuffleOnIntent";
export type StartOverIntent = "StartOverIntent";
export type StopIntent = "StopIntent";
export type YesIntent = "YesIntent";

// This one is special
export type InputUnknown = "InputUnknown";

export type BuiltInIntents =
  | CancelIntent
  | FirstIntent
  | HelpIntent
  | LatestIntent
  | InputUnknown
  | LoopOffIntent
  | LoopOnIntent
  | NextIntent
  | NoIntent
  | PauseIntent
  | PlayIntent
  | PreviousIntent
  | RepeatIntent
  | ResumeIntent
  | ShuffleOffIntent
  | ShuffleOnIntent
  | StartOverIntent
  | StopIntent
  | YesIntent;
