/*! Copyright (c) 2019, XAPPmedia */
export type OnDemandTemplateType = "PODCAST_TEMPLATE";
export type RadioTemplateType = "RADIO_TEMPLATE";
/**
 * Used to communicate the app is custom and does not adhere to a specific
 * predefined template.
 */
export type CustomType = "CUSTOM";

export type TemplateType = RadioTemplateType | OnDemandTemplateType | CustomType;
