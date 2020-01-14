/*! Copyright (c) 2019, XAPPmedia */
import {
    CommFieldType,
    HandlerService,
    Pii,
    PIIService,
    UserDataType,
    UserDataValue,
    UserStorageService
} from "stentor-models";

export class MockHandlerService implements HandlerService {
    get() {
        return {} as any;
    }
}

export class MockUserStorageService implements UserStorageService {
    get() {
        return {} as any;
    }
    create() {
        return {} as any;
    }
    update() {
        return {} as any;
    }
}

export class MockPIIService implements PIIService {
    pii: Pii;
    async loadPii(token: string): Promise<Pii> {
        return {} as Pii;
    }
    async savePii(pii: Pii): Promise<void> {
        return;
    }
    async updatePii(pii: Pii): Promise<void> {
        return;
    }
    async getPiiForField(field: CommFieldType, value: string): Promise<Pii[]> {
        return [];
    }
    async removePii(token?: string): Promise<void> {
        return;
    }
    async redeem(userDataType: UserDataType, accessToken: string): Promise<UserDataValue> {
        return {} as UserDataValue;
    }
}
