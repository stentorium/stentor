/*! Copyright (c) 2019, XAPPmedia */
// Simple regex to detect URLs
export const URL_REGEX = /(https?:\/\/[^\s]+)/g;

// Help from this from lodash
// source: https://github.com/lodash/lodash/blob/c1f805f4972843b675056b2786f1165f7db81737/template.js#L19
export const TEMPLATE_REGEX = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

