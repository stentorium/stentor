/*! Copyright (c) 2020, XAPPmedia */

import {
    CancelIntent,
    FirstIntent,
    HelpIntent,
    InputUnknown,
    LangCodeEnUs,
    LatestIntent,
    LoopOffIntent,
    LoopOnIntent,
    NextIntent,
    NoIntent,
    PauseIntent,
    PlayIntent,
    PlayPodcastTitle,
    PlayTitleIntent,
    PlayTopicIntent,
    PreviousIntent,
    RepeatIntent,
    ResumeIntent,
    ShuffleOffIntent,
    ShuffleOnIntent,
    StartOverIntent,
    StopIntent,
    YesIntent
} from "stentor-models";

export const LANG_CODE_EN_US: LangCodeEnUs = "en-US";

export const CANCEL_INTENT: CancelIntent = "CancelIntent";
export const FIRST_INTENT: FirstIntent = "FirstIntent"; // Media specific
export const HELP_INTENT: HelpIntent = "HelpIntent";
export const LATEST_INTENT: LatestIntent = "LatestIntent"; // Media specific
export const LOOP_OFF_INTENT: LoopOffIntent = "LoopOffIntent";
export const LOOP_ON_INTENT: LoopOnIntent = "LoopOnIntent";
export const NEXT_INTENT: NextIntent = "NextIntent";
export const NO_INTENT: NoIntent = "NoIntent";
export const PAUSE_INTENT: PauseIntent = "PauseIntent";
export const PREVIOUS_INTENT: PreviousIntent = "PreviousIntent";
export const REPEAT_INTENT: RepeatIntent = "RepeatIntent";
export const RESUME_INTENT: ResumeIntent = "ResumeIntent";
export const SHUFFLE_OFF_INTENT: ShuffleOffIntent = "ShuffleOffIntent";
export const SHUFFLE_ON_INTENT: ShuffleOnIntent = "ShuffleOnIntent";
export const START_OVER_INTENT: StartOverIntent = "StartOverIntent";
export const STOP_INTENT: StopIntent = "StopIntent";
export const YES_INTENT: YesIntent = "YesIntent";

// This one is special
export const INPUT_UNKNOWN: InputUnknown = "InputUnknown";

// RSS Feed Search Intents
export const PLAY_INTENT: PlayIntent = "PlayIntent";
export const PLAY_PODCAST_TITLE: PlayPodcastTitle = "PlayPodcastTitleIntent";
export const PLAY_TOPIC_INTENT: PlayTopicIntent = "PlayTopicIntent";
export const PLAY_TITLE_INTENT: PlayTitleIntent = "PlayTitleIntent";