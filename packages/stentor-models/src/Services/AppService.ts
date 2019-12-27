/*! Copyright (c) 2019, XAPPmedia */
import { App } from "../App";

export interface AppService {
    get(appId: string): Promise<App | undefined>;
}
