/*! Copyright (c) 2019, XAPPmedia */
import {
    HandlerService,
    Pii,
    PIIService,
    UserDataValue,
    UserStorageService
} from "stentor-models";

export class MockHandlerService implements HandlerService {
    public get(): any {
        return {} as any;
    }
}

export class MockUserStorageService implements UserStorageService {
    public get(): any {
        return {} as any;
    }
    public create(): any {
        return {} as any;
    }
    public update(): any {
        return {} as any;
    }
}

export class MockPIIService implements PIIService {
    public pii: Pii;
    public async loadPii(): Promise<Pii> {
        return {} as Pii;
    }
    public async savePii(): Promise<void> {
        return;
    }
    public async updatePii(): Promise<void> {
        return;
    }
    public async getPiiForField(): Promise<Pii[]> {
        return [];
    }
    public async removePii(): Promise<void> {
        return;
    }
    public async redeem(): Promise<UserDataValue> {
        return {} as UserDataValue;
    }
}
