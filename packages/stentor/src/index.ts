/*! Copyright (c) 2019, XAPPmedia */
import { ContextBuilder, ContextFactory } from "stentor-context";
export { ContextBuilder, ContextFactory };

import {
    INPUT_UNKNOWN_ID,
    INPUT_UNKNOWN_REQUEST_TYPE,
    INPUT_UNKNOWN,
    INTENT_REQUEST_TYPE,
    LAUNCH_REQUEST_ID,
    LAUNCH_REQUEST_TYPE,
    OPTION_SELECT_ID,
    OPTION_SELECT_REQUEST_TYPE,
    SESSION_STORAGE_CURRENT_HANDLER,
    SESSION_STORAGE_PREVIOUS_HANDLER,
    SESSION_STORAGE_NEW_USER
} from "stentor-constants";
export {
    INPUT_UNKNOWN_ID,
    INPUT_UNKNOWN_REQUEST_TYPE,
    INPUT_UNKNOWN,
    INTENT_REQUEST_TYPE,
    LAUNCH_REQUEST_ID,
    LAUNCH_REQUEST_TYPE,
    OPTION_SELECT_ID,
    OPTION_SELECT_REQUEST_TYPE,
    SESSION_STORAGE_CURRENT_HANDLER,
    SESSION_STORAGE_PREVIOUS_HANDLER,
    SESSION_STORAGE_NEW_USER
};

import { determine } from "stentor-determiner";
export { determine };

import {
    hasSessionId,
    isAnonymousUser,
    isDeliveryAddressRequest,
    isInputUnknownRequest,
    isIntentRequest,
    isChannelActionRequest,
    isLaunchRequest,
    isNotificationPermissionRequest,
    isOptionSelectRequest,
    isPermissionRequest,
    isSessionEndedRequest,
    isSignInRequest,
    isSurfaceRequest,
    isTransactionDecisionRequest,
    isTransactionRequirementCheckRequest,
} from "stentor-guards";
export {
    hasSessionId,
    isAnonymousUser,
    isDeliveryAddressRequest,
    isInputUnknownRequest,
    isIntentRequest,
    isChannelActionRequest,
    isLaunchRequest,
    isNotificationPermissionRequest,
    isOptionSelectRequest,
    isPermissionRequest,
    isSessionEndedRequest,
    isSignInRequest,
    isSurfaceRequest,
    isTransactionDecisionRequest,
    isTransactionRequirementCheckRequest,
};

import {
    AbstractHandler,
    ConversationHandler,
    determinePath,
    getMatchedSlotData,
    getSlotType
} from "stentor-handler";
export {
    AbstractHandler,
    ConversationHandler,
    determinePath,
    getMatchedSlotData,
    getSlotType
};

import {
    HandlerFactory,
    HandlersArray,
    HandlersKeyValue,
    HandlersMap
} from "stentor-handler-factory";
export {
    HandlerFactory,
    HandlersArray,
    HandlersKeyValue,
    HandlersMap
};

import {
    log
} from "stentor-logger";
export { log };

import {
    Channel,
    Content,
    Context,
    CrmService,
    Data,
    DateTime,
    DateTimeRange,
    Device,
    ErrorService,
    Forward,
    Handler,
    Intent,
    IntentRequest,
    KnowledgeBaseDocument,
    KnowledgeBaseFAQ,
    KnowledgeBaseResult,
    KnowledgeBaseSuggested,
    KnowledgeBaseGenerated,
    LeadFormField,
    List,
    ListButton,
    ListItem,
    Message,
    OptionSelectRequest,
    Redirect,
    Request,
    RequestSlot,
    RequestSlotMap,
    Response,
    ResponseOutput,
    RuntimeCallback,
    RuntimeContext,
    Storage,
    UserStorageService,
} from "stentor-models";
export {
    Channel,
    Content,
    Context,
    CrmService,
    Data,
    DateTime,
    DateTimeRange,
    Device,
    ErrorService,
    Forward,
    Handler,
    Intent,
    IntentRequest,
    KnowledgeBaseDocument,
    KnowledgeBaseFAQ,
    KnowledgeBaseResult,
    KnowledgeBaseSuggested,
    KnowledgeBaseGenerated,
    LeadFormField,
    List,
    ListButton,
    ListItem,
    Message,
    OptionSelectRequest,
    Redirect,
    Request,
    RequestSlot,
    RequestSlotMap,
    Response,
    ResponseOutput,
    RuntimeCallback,
    RuntimeContext,
    Storage,
    UserStorageService,
};

import {
    InputUnknownRequestBuilder,
    IntentRequestBuilder,
    LaunchRequestBuilder,
    SessionEndedRequestBuilder
} from "stentor-request";
export {
    InputUnknownRequestBuilder,
    IntentRequestBuilder,
    LaunchRequestBuilder,
    SessionEndedRequestBuilder
};

import {
    compileResponse,
    concatResponseOutput,
    determineResponse,
    determineSegment,
    getResponse,
    ResponseBuilder
} from "stentor-response";
export {
    compileResponse,
    concatResponseOutput,
    determineResponse,
    determineSegment,
    getResponse,
    ResponseBuilder
};

import {
    dessmlify,
    estimateSize,
    existsAndNotEmpty,
    findValueForKey,
    formatNumberForDisplay,
    getResponseByTag,
    getSlots,
    isDateTime,
    isDateTimeRange,
    keyFromRequest,
    listisize,
    numberToWord,
    pruneEmpty,
    random,
    requestSlotsToString,
    requestSlotValueToString,
    responseToMessage,
    ssmlify,
    toResponseOutput
} from "stentor-utils";
export {
    dessmlify,
    estimateSize,
    existsAndNotEmpty,
    findValueForKey,
    formatNumberForDisplay,
    getResponseByTag,
    getSlots,
    isDateTime,
    isDateTimeRange,
    keyFromRequest,
    listisize,
    numberToWord,
    pruneEmpty,
    random,
    requestSlotsToString,
    requestSlotValueToString,
    responseToMessage,
    ssmlify,
    toResponseOutput
};

import { FetchService, WithTimeout, TimeoutError } from "stentor-service-fetch";
export { FetchService, WithTimeout, TimeoutError };

import { LexServiceV2, LexV2Config } from "stentor-service-lex";
export { LexServiceV2, LexV2Config };

export * from "./services/Secrets";
export * from "./Assistant";
