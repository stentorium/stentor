/*! Copyright (c) 2019, XAPPmedia */
import { Intent } from "../Intent";
import { UserDataType } from "../UserData";
import { Content } from "./Content";
import { Data } from "./Data";
import { Forward } from "./Forward";
import { Redirect } from "./Redirect";

// TODO: remove this extending from Intents & instead make a GlobalHandler that combines the two

/**
 * A handler defines the necessary information to handle incoming requests and return a response.
 */
export interface Handler<
    C extends Content = Content,
    D extends Data = Data,
    F extends Forward = Forward,
    R extends Redirect = Redirect
    > extends Intent {
    type: string;
    content?: C;
    data?: D;
    forward?: F;
    redirect?: R;
    permissions?: UserDataType[];
}
