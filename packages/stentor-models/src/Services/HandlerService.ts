/*! Copyright (c) 2019, XAPPmedia */
import { Handler } from "../Handler";

export interface HandlerService {
    get(id: string | { intentId: string }): Promise<Handler>;
}
