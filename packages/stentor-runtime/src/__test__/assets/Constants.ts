/*! Copyright (c) 2019, XAPPmedia */
import { Alexa } from "@xapp/stentor-alexa";
import { Dialogflow } from "@xapp/stentor-dialogflow";

import { Channel } from "stentor-models";

export const ALEXA_APP_ID = "appId";

export const DEFAULT_CHANNELS: Channel[] = [Alexa(ALEXA_APP_ID), Dialogflow(), Dialogflow(true)];
