/*! Copyright (c) 2019, XAPPmedia */
import { Device } from "stentor-models";

export type StentorPlatform = "stentor-platform";

/**
 * The object has a device key that describes it's capabilities.
 */
export type Deviceable = Record<string, unknown> & { device: Device };
