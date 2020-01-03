/*! Copyright (c) 2019, XAPPmedia */
import { UserDataValue } from "../Context";
import { CommFieldType, Pii } from "../Pii";
import { UserDataType } from "../UserData";

export interface PIIService {
    pii: Pii;
    loadPii(token: string): Promise<Pii>;
    savePii(pii: Pii): Promise<void>;
    updatePii(pii: Pii): Promise<void>;
    getPiiForField(field: CommFieldType, value: string): Promise<Pii[]>;
    removePii(token?: string): Promise<void>;
    redeem(userDataType: UserDataType, accessToken: string): Promise<UserDataValue>;
}
