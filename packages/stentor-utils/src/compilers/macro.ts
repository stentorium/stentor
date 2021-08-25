/*! Copyright (c) 2021, XAPPmedia */
export type ResponseMacro = (...args: any[]) => string;

export interface MacroMap {
    [key: string]: ResponseMacro
}
