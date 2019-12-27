/*! Copyright (c) 2019, XAPPmedia */
export declare type SystemConditionType = "!ACCOUNT_LINKED" | "ACCOUNT_LINKED" | "!HEALTH_CHECK" | "HEALTH_CHECK" | "!BARGE_IN" | "BARGE_IN" | "OPTION_SELECT" | "!OPTION_SELECT" | "PERMISSION_GRANTED" | "!PERMISSION_GRANTED" | "SURFACE_CHANGED" | "!SURFACE_CHANGED" | "NOTIFICATION_PERMISSION_GRANTED" | "!NOTIFICATION_PERMISSION_GRANTED";
export interface SystemDependent {
    /**
     * "System state". This is something that is not in slots, session or perm. data.
     */
    systemCondition: SystemConditionType;
}
export declare type SystemDependable<T> = T & SystemDependent;
