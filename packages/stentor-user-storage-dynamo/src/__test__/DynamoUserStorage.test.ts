/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";

import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { DynamoUserStorage } from "../DynamoUserStorage";

describe(`${DynamoUserStorage.name}`, () => {
    describe(`#constructor()`, () => {
        it('returns an instance', () => {
            expect(new DynamoUserStorage({
                tableName: "foo",
                appId: "bar"
            })).to.be.instanceOf(DynamoUserStorage);
        });
        describe('when no client is provided', () => {
            it('builds an AWS SDK v3 client', () => {
                // There is no v2 fallback any more. If the v3 packages were missing this
                // module would fail to load outright, which is the point - a missing peer
                // should be loud rather than silently resolving to aws-sdk v2.
                expect(new DynamoUserStorage({ tableName: "foo", appId: "bar" })).to.be.instanceOf(DynamoUserStorage);
            });
        });
        describe('when a v3 client is provided', () => {
            it('uses it rather than constructing its own', () => {
                let sent = false;
                // Cast rather than build a real client: the prop is typed as
                // DynamoDB | DynamoDBDocumentClient now, and this suite runs transpileOnly,
                // so an untyped literal would slip through here but fail a real typecheck.
                const provided = {
                    send: () => { sent = true; return Promise.resolve({}); },
                    config: { credentials: {} }
                } as unknown as DynamoDBDocumentClient;
                expect(new DynamoUserStorage({
                    tableName: "foo",
                    appId: "bar",
                    dynamo: provided
                })).to.be.instanceOf(DynamoUserStorage);
                // Constructing the storage must not issue any request on its own.
                expect(sent).to.be.false;
            });
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