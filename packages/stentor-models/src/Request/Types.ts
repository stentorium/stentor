/*! Copyright (c) 2019, XAPPmedia */
export type AudioPlayerRequestType = "AUDIO_PLAYER_REQUEST";
export type ChannelActionRequestType = "CHANNEL_ACTION_REQUEST"
export type InputUnknownRequestType = "INPUT_UNKNOWN_REQUEST";
export type IntentRequestType = "INTENT_REQUEST";
export type LaunchRequestType = "LAUNCH_REQUEST";
export type NotificationPermissionRequestType = "NOTIFICATION_PERMISSION_REQUEST_TYPE";
export type OptionSelectRequestType = "OPTION_SELECT_REQUEST";
export type PermissionRequestType = "PERMISSION_GRANT";
export type PlaybackControlRequestType = "PLAYBACK_CONTROL_REQUEST";
export type RawQueryRequestType = "RAW_QUERY_REQUEST";
export type SessionEndedRequestType = "SESSION_ENDED_REQUEST";
export type SignInRequestType = "SIGN_IN_REQUEST";
export type SurfaceChangeRequestType = "SURFACE_CHANGE_REQUEST";
export type TransactionRequirementCheckType = "TRANSACTION_REQUIREMENT_CHECK_REQUEST";
export type TransactionDecisionType = "TRANSACTION_DECISION_REQUEST";
export type TransactionDeliveryAddressType = "TRANSACTION_DELIVERY_ADDRESS_REQUEST";

export type RequestTypes =
    | AudioPlayerRequestType
    | ChannelActionRequestType
    | InputUnknownRequestType
    | IntentRequestType
    | LaunchRequestType
    | NotificationPermissionRequestType
    | OptionSelectRequestType
    | PermissionRequestType
    | PlaybackControlRequestType
    | RawQueryRequestType
    | SessionEndedRequestType
    | SignInRequestType
    | SurfaceChangeRequestType
    | TransactionRequirementCheckType
    | TransactionDecisionType
    | TransactionDeliveryAddressType;

export type LaunchRequestID = "LaunchRequest";
export type PermissionGrantID = "PermissionGrant";
export type InputUnknownID = "InputUnknown";
export type OptionSelectID = "OptionSelect";
export type SignInID = "SignIn";
export type KnowledgeAnswerID = "KnowledgeAnswer";
export type AttachmentRequestID = "AttachmentRequest";
