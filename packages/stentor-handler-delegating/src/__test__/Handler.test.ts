/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";

import { DelegatingHandler } from "../Handler";

describe(`${DelegatingHandler.name}`, () => {
    describe(`constructor()`, () => {
        it('returns an instance', () => {
            expect(new DelegatingHandler({ appId: "appId", organizationId: "organizationId", intentId: "intentId", content: {}, type: "InSessionIntent" })).to.be.instanceOf(DelegatingHandler);
        });
    })
});