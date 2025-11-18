/*! Copyright (c) 2019, XAPPmedia */
// If app status has never been set
export type AppStatusUnknown = "Unknown";
export const APP_STATUS_UNKNOWN: AppStatusUnknown = "Unknown";
// App is incomplete, the first status
export type AppStatusIncomplete = "Incomplete";
export const APP_STATUS_INCOMPLETE: AppStatusIncomplete = "Incomplete";
// App has been submitted for review
export type AppStatusSubmittedForReview = "Submitted For Review";
export const APP_STATUS_SUBMITTED_FOR_REVIEW: AppStatusSubmittedForReview = "Submitted For Review";
// App is under review
export type AppStatusUnderReview = "Under Review";
export const APP_STATUS_UNDER_REVIEW: AppStatusUnderReview = "Under Review";
// App is not live and in certification
export type AppStatusInCertification = "In Certification";
export const APP_STATUS_IN_CERTIFICATION: AppStatusInCertification = "In Certification";
// App is not live and is waiting to be published.
export type AppStatusRequiresPublish = "Needs publish";
export const APP_STATUS_REQUIRES_PUBLISH: AppStatusRequiresPublish = "Needs publish";
// App is ready for install
export type AppStatusReadyForInstall = "Ready for Install";
export const APP_STATUS_READY_FOR_INSTALL: AppStatusReadyForInstall = "Ready for Install";
// App is live
export type AppStatusLive = "Live";
export const APP_STATUS_LIVE: AppStatusLive = "Live";
// App requires attention
export type AppStatusRequiresAttention = "Requires Attention";
export const APP_STATUS_REQUIRES_ATTENTION: AppStatusRequiresAttention = "Requires Attention";
// App is no longer live or maintained.
export type AppStatusArchived = "Archived";
export const APP_STATUS_ARCHIVED: AppStatusArchived = "Archived";
// App is cancelled, ready to be cleaned up and archived
export type AppStatusCancelled = "Cancelled";
export const APP_STATUS_CANCELLED: AppStatusCancelled = "Cancelled";
// App is currently live but also has been updated so it needs re-certification.
export type AppStatusLiveRequiresCert = "Live: Requires Cert";
export const APP_STATUS_LIVE_AND_REQUIRES_CERT: AppStatusLiveRequiresCert = "Live: Requires Cert";
// App is live but has been re-submitted for certification.
export type AppStatusLiveInCert = "Live: In Certification";
export const APP_STATUS_LIVE_AND_IN_CERT: AppStatusLiveInCert = "Live: In Certification";
// app is live and has been re-certified but needs to be published.
export type AppStatusLiveAndRequiresPublish = "Live: Requires Publish";
export const APP_STATUS_LIVE_AND_REQUIRES_PUBLISH: AppStatusLiveAndRequiresPublish = "Live: Requires Publish";
// App is live and needs attention
export type AppStatusLiveAndRequiresAttention = "Live: Requires Attention";
export const APP_STATUS_LIVE_AND_REQUIRES_ATTENTION: AppStatusLiveAndRequiresAttention = "Live: Requires Attention";
// App was live but is now uninstalled
export type AppStatusUninstalled = "Uninstalled";
export const APP_STATUS_UNINSTALLED: AppStatusUninstalled = "Uninstalled";

// The different status types
export type AppStatusType =
    | AppStatusUnknown
    | AppStatusIncomplete
    | AppStatusSubmittedForReview
    | AppStatusUnderReview
    | AppStatusInCertification
    | AppStatusRequiresPublish
    | AppStatusLive
    | AppStatusRequiresAttention
    | AppStatusArchived
    | AppStatusLiveRequiresCert
    | AppStatusLiveInCert
    | AppStatusLiveAndRequiresPublish
    | AppStatusLiveAndRequiresAttention
    | AppStatusCancelled
    | AppStatusUninstalled;
/**
 * The status of the App
 */
export interface AppStatus {
    /**
     * Status type
     */
    type: AppStatusType;
    /**
     * The time when the status was set
     */
    timestamp: number;
    /**
     * The email of the user/admin who set the status
     */
    email: string;
    /**
     * Any notes set by the admin when the status was set.
     */
    notes: string;
}
