/*! Copyright (c) 2019, XAPPmedia */
import { Audio } from "./Audio";
import { Reportable } from "./Reportable";
import { Song } from "./Song";

/**
 * Song that is reportable
 */
export interface ReportableSong extends Song, Reportable { }
/**
 * Audio that is reportable
 */
export interface ReportableAudio extends Audio, Reportable { }
