/*! Copyright (c) 2019, XAPPmedia */
import { Context } from "../Context";
import { Content, Data } from "../Handler";
import { Request } from "../Request";

export type DelegatedHandlerMethod = (
    request: Request,
    context: Context,
    content: Content,
    data: Data
) => Promise<void>;
