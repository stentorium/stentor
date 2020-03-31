/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";

import { DynamoUserStorage } from "../DynamoUserStorage";

describe(`${DynamoUserStorage.name}`, () => {
    describe(`#constructor()`, () => {
        it('returns an instance', () => {
            expect(new DynamoUserStorage()).to.be.instanceOf(DynamoUserStorage);
        });
    });
});