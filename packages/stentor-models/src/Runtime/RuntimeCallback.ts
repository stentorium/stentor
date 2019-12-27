/*! Copyright (c) 2019, XAPPmedia */
import { Request } from "../Request";
import { Response } from "../Response";

export type RuntimeCallback<Result extends object = object> = (
    error?: Error | null | string,
    result?: Result,
    request?: Request,
    response?: Response
) => void;
