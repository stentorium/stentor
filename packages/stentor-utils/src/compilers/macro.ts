/*! Copyright (c) 2021, XAPPmedia */
export type ResponseMacro = (...args: any[]) => string | boolean;

export interface MacroMap {
    [key: string]: ResponseMacro
}
