/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";

import { DynamoUserStorage } from "../DynamoUserStorage";

describe(`${DynamoUserStorage.name}`, () => {
    describe(`#constructor()`, () => {
        it('returns an instance', () => {
            expect(new DynamoUserStorage({
                tableName: "foo",
                appId: "bar"
            })).to.be.instanceOf(DynamoUserStorage);
        });
        describe('when environment variables are not available', () => {
            let appId: string | undefined;
            let tableName: string | undefined;
            before(() => {
                tableName = process.env.USER_STORAGE_TABLE;
                appId = process.env.STUDIO_APP_ID;
                delete process.env.USER_STORAGE_TABLE;
                delete process.env.STUDIO_APP_ID;
            });
            after(() => {
                process.env.USER_STORAGE_TABLE = tableName;
                process.env.STUDIO_APP_ID = appId;
            });
            describe('and tableName not provided', () => {
                it('throws an error', () => {
                    expect(() => {
                        new DynamoUserStorage({
                            appId: "foo"
                        })
                    }).to.throw("Constructor property tableName or environment variable USER_STORAGE_TABLE is required for the DynamoUserStorage.");
                });
            });
            describe('and appId not provided', () => {
                it('throws an error', () => {
                    expect(() => {
                        new DynamoUserStorage({
                            tableName: "foo"
                        })
                    }).to.throw("Constructor property appId or environment variable STUDIO_APP_ID is required for the DynamoUserStorage.");
                });
            });
        });
        describe('when environment variables are provided', () => {

            before(() => {
                process.env.USER_STORAGE_TABLE = "foo";
                process.env.STUDIO_APP_ID = "bar";
            });
            after(() => {
                delete process.env.USER_STORAGE_TABLE;
                delete process.env.STUDIO_APP_ID;
            });
            it(`doesn't throw an error`, () => {
                expect(new DynamoUserStorage()).to.be.instanceOf(DynamoUserStorage);
            });
        });
    });
});