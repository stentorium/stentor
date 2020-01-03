/*! Copyright (c) 2019, XAPPmedia */
export interface SMSResponse {
    success: boolean;
}

/**
 * Service to facilitate sending an SMS (text message) to a number.
 */
export interface SMSService {
    send(from: string, to: string, text: string): Promise<SMSResponse>;
    sendImage(from: string, to: string, imageUrl: string): Promise<SMSResponse>;
}
