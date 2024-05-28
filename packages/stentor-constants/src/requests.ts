/*! Copyright (c) 2020, XAPPmedia */
import {
    AttachmentRequestID,
    AudioPlayerPlaybackFailedEvent,
    AudioPlayerPlaybackFinishedEvent,
    AudioPlayerPlaybackNearlyFinishedEvent,
    AudioPlayerPlaybackStartedEvent,
    AudioPlayerPlaybackStoppedEvent,
    AudioPlayerRequestType,
    AudioPlayerSystemExceptionEvent,
    ChannelActionRequestType,
    InputUnknownID,
    InputUnknownRequestType,
    IntentRequestType,
    KnowledgeAnswerID,
    LaunchRequestID,
    LaunchRequestType,
    NotificationPermissionRequestType,
    OptionSelectID,
    OptionSelectRequestType,
    PermissionGrantID,
    PermissionRequestType,
    PlaybackControlNextEvent,
    PlaybackControlPauseEvent,
    PlaybackControlPlayEvent,
    PlaybackControlPreviousEvent,
    PlaybackControlRequestType,
    RawQueryRequestType,
    SessionEndedRequestType,
    SignInID,
    SignInRequestType,
    SurfaceChangeRequestType,
    TransactionDecisionType,
    TransactionDeliveryAddressType,
    TransactionRequirementCheckType
} from "stentor-models";

export const LAUNCH_REQUEST_ID: LaunchRequestID = "LaunchRequest";
export const INPUT_UNKNOWN_ID: InputUnknownID = "InputUnknown";

export const PERMISSION_GRANT_ID: PermissionGrantID = "PermissionGrant";
export const OPTION_SELECT_ID: OptionSelectID = "OptionSelect";
export const SIGN_IN_ID: SignInID = "SignIn";
export const KNOWLEDGE_ANSWER_ID: KnowledgeAnswerID = "KnowledgeAnswer";
export const ATTACHMENT_REQUEST_ID: AttachmentRequestID = "AttachmentRequest";

// Standard Request Types
export const AUDIO_PLAYER_REQUEST_TYPE: AudioPlayerRequestType = "AUDIO_PLAYER_REQUEST";
export const CHANNEL_ACTION_REQUEST_TYPE: ChannelActionRequestType = "CHANNEL_ACTION_REQUEST";
export const INPUT_UNKNOWN_REQUEST_TYPE: InputUnknownRequestType = "INPUT_UNKNOWN_REQUEST";
export const INTENT_REQUEST_TYPE: IntentRequestType = "INTENT_REQUEST";
export const LAUNCH_REQUEST_TYPE: LaunchRequestType = "LAUNCH_REQUEST";
export const RAW_QUERY_REQUEST_TYPE: RawQueryRequestType = "RAW_QUERY_REQUEST";
export const NOTIFICATION_PERMISSION_REQUEST_TYPE: NotificationPermissionRequestType = "NOTIFICATION_PERMISSION_REQUEST_TYPE";
export const OPTION_SELECT_REQUEST_TYPE: OptionSelectRequestType = "OPTION_SELECT_REQUEST";
export const PERMISSION_REQUEST_TYPE: PermissionRequestType = "PERMISSION_GRANT";
export const PLAYBACK_CONTROL_REQUEST_TYPE: PlaybackControlRequestType = "PLAYBACK_CONTROL_REQUEST";
export const SESSION_ENDED_REQUEST_TYPE: SessionEndedRequestType = "SESSION_ENDED_REQUEST";
export const SIGN_IN_REQUEST_TYPE: SignInRequestType = "SIGN_IN_REQUEST";
export const SURFACE_CHANGE_REQUEST_TYPE: SurfaceChangeRequestType = "SURFACE_CHANGE_REQUEST";

// Transaction related requests
export const TRANSACTION_REQUIREMENT_CHECK_REQUEST_TYPE: TransactionRequirementCheckType = "TRANSACTION_REQUIREMENT_CHECK_REQUEST";
export const TRANSACTION_DECISION_REQUEST_TYPE: TransactionDecisionType = "TRANSACTION_DECISION_REQUEST";
export const TRANSACTION_DELIVERY_ADDRESS_REQUEST_TYPE: TransactionDeliveryAddressType = "TRANSACTION_DELIVERY_ADDRESS_REQUEST";

// Audio Player Requests
export const AUDIO_PLAYER_PLAYBACK_STARTED_EVENT: AudioPlayerPlaybackStartedEvent = "AudioPlayerPlaybackStarted";
export const AUDIO_PLAYER_PLAYBACK_FINISHED_EVENT: AudioPlayerPlaybackFinishedEvent = "AudioPlayerPlaybackFinished";
export const AUDIO_PLAYER_PLAYBACK_STOPPED_EVENT: AudioPlayerPlaybackStoppedEvent = "AudioPlayerPlaybackStopped";
export const AUDIO_PLAYER_PLAYBACK_NEARLY_FINISHED_EVENT: AudioPlayerPlaybackNearlyFinishedEvent = "AudioPlayerPlaybackNearlyFinished";
export const AUDIO_PLAYER_PLAYBACK_FAILED_EVENT: AudioPlayerPlaybackFailedEvent = "AudioPlayerPlaybackFailed";
export const AUDIO_PLAYER_SYSTEM_EXCEPTION_EVENT: AudioPlayerSystemExceptionEvent = "AudioPlayerSystemException";

// Playback Control Requests
export const PLAYBACK_CONTROL_PAUSE_EVENT: PlaybackControlPauseEvent = "PlaybackControlPauseEvent";
export const PLAYBACK_CONTROL_PLAY_EVENT: PlaybackControlPlayEvent = "PlaybackControlPlayEvent";
export const PLAYBACK_CONTROL_NEXT_EVENT: PlaybackControlNextEvent = "PlaybackControlNextEvent";
export const PLAYBACK_CONTROL_PREVIOUS_EVENT: PlaybackControlPreviousEvent = "PlaybackControlPreviousEvent";
