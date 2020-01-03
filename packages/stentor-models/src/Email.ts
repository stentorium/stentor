/*! Copyright (c) 2019, XAPPmedia */
/**
 *
 */
export interface EmailDescription {
    subject: string;
    sender: string;
    templateUrl: string;
    recipient?: string; // override. the use case is sending it to a middle man, like customer service.
}
