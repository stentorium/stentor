/*! Copyright (c) 2019, XAPPmedia */
import { Request } from "stentor-models";
import { isAudioPlayerRequest } from "stentor-request";

import {
    Content,
    Data
} from "stentor-models";

import { AbstractHandler } from "stentor-handler";


export class TestHandler extends AbstractHandler {
    public start(): Promise<void> {
        return;
    }
}

export interface TestAudioData extends Data {
    url: string;
}

export class TestAudioHandler extends AbstractHandler<Content, TestAudioData> {
    public start(): Promise<void> {
        return;
    }

    public canHandleRequest(request: Request): boolean {
        if (isAudioPlayerRequest(request)) {
            return true;
        }

        return false;
    }
}