/*! Copyright (c) 2019, XAPPmedia */
import { Alexa } from "@xapp/stentor-alexa";
import { Dialogflow } from "@xapp/stentor-dialogflow";

import { Channel } from "stentor-models";

export const ALEXA_APP_ID = "appId";

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore Remove after we fix the build issues
export const DEFAULT_CHANNELS: Channel[] = [Alexa(ALEXA_APP_ID), Dialogflow(), Dialogflow(true)];
