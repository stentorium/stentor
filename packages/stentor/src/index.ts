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
};

import { determine } from "stentor-determiner";
export { determine };

import {
    isAnonymousUser,
    isInputUnknownRequest,
    isIntentRequest,
    isLaunchRequest,
    isNotificationPermissionRequest,
    isOptionSelectRequest,
    isPermissionRequest,
    isSessionEndedRequest,
    isSignInRequest,
    isSurfaceRequest,
    isTransactionRequirementCheckRequest,
    isTransactionDecisionRequest,
    isDeliveryAddressRequest
} from "stentor-guards";
export {
    isAnonymousUser,
    isInputUnknownRequest,
    isIntentRequest,
    isLaunchRequest,
    isNotificationPermissionRequest,
    isOptionSelectRequest,
    isPermissionRequest,
    isSessionEndedRequest,
    isSignInRequest,
    isSurfaceRequest,
    isTransactionRequirementCheckRequest,
    isTransactionDecisionRequest,
    isDeliveryAddressRequest
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
    Data,
    DateTime,
    DateTimeRange,
    Device,
    Forward,
    Handler,
    Intent,
    IntentRequest,
    KnowledgeBaseDocument,
    KnowledgeBaseFAQ,
    KnowledgeBaseResult,
    KnowledgeBaseSuggested,
    List,
    ListButton,
    ListItem,
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
    UserStorageService
} from "stentor-models";
export {
    Channel,
    Content,
    Context,
    Data,
    DateTime,
    DateTimeRange,
    Device,
    Forward,
    Handler,
    Intent,
    IntentRequest,
    KnowledgeBaseFAQ,
    KnowledgeBaseResult,
    KnowledgeBaseSuggested,
    KnowledgeBaseDocument,
    List,
    ListItem,
    ListButton,
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
    UserStorageService
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
    getSlots,
    keyFromRequest,
    isDateTime,
    isDateTimeRange,
    listisize,
    numberToWord,
    pruneEmpty,
    random,
    ssmlify
} from "stentor-utils";
export {
    dessmlify,
    estimateSize,
    existsAndNotEmpty,
    findValueForKey,
    formatNumberForDisplay,
    getSlots,
    keyFromRequest,
    isDateTime,
    isDateTimeRange,
    listisize,
    numberToWord,
    pruneEmpty,
    random,
    ssmlify,
};

import { FetchService, WithTimeout, TimeoutError } from "stentor-service-fetch";
export { FetchService, WithTimeout, TimeoutError };

export * from "./services/Secrets";
export * from "./Assistant";
