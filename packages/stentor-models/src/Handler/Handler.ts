/*! Copyright (c) 2019, XAPPmedia */
import { Intent } from "../Intent";
import { UserDataType } from "../UserData";
import { Content } from "./Content";
import { Data } from "./Data";
import { Forward } from "./Forward";
import { Redirect } from "./Redirect";

export interface Handler<
    C extends Content = Content,
    D extends Data = Data,
    F extends Forward = Forward,
    R extends Redirect = Redirect
    > extends Omit<Intent, "utterancePatterns"> {
    type: string;
    content: C;
    data?: D;
    forward?: F;
    redirect?: R;
    permissions?: UserDataType[];
    utterancePatterns?: string[];
}
