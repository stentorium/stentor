/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { SessionStore, Storage, StorageDependent } from "stentor-models";
import { createSessionStore } from "../createSessionStore";
import { findStorageDependentMatch, session, storage } from "../findStorageDependentMatch";

const storage1: Storage = {
    createdTimestamp: 123456
};

const storage2: Storage = {
    createdTimestamp: 123456,
    key2: "value2"
};

const storage3: Storage = {
    createdTimestamp: 123456,
    key3: 2
};

const storage4: Storage = {
    createdTimestamp: 123456,
    previousHandler: {
        appId: "appId",
        intentId: "ID",
        organizationId: "organizationId",
        type: "InSessionIntent",
        content: {}
    }
};

const path1: StorageDependent = {
    storageMatch: {
        name: "key1",
        value: "value1",
        operation: "==="
    }
};

const path2: StorageDependent = {
    storageMatch: {
        name: "key2",
        value: "value2",
        operation: "==="
    }
};

const path3WithArray: StorageDependent = {
    storageMatch: {
        name: "key3",
        /* tslint:disable:no-magic-numbers */
        value: [1, "2", 4],
        /* tslint:enable:no-magic-numbers */
        operation: "=="
    }
};

const path4WithJSONPath: StorageDependent = {
    storageMatch: {
        name: "$.previousHandler.intentId",
        value: "ID",
        operation: "=="
    }
};

describe("#findStorageDependentMatch()", () => {
    describe("when passed undefined paths", () => {
        it("returns undefined", () => {
            expect(findStorageDependentMatch(undefined, storage1)).to.be.undefined;
        });
    });
    describe("when passed undefined request", () => {
        it("returns undefined", () => {
            expect(findStorageDependentMatch([path1], undefined)).to.be.undefined;
        });
    });
    describe("when passed paths without a match", () => {
        it("returns undefined", () => {
            expect(findStorageDependentMatch([path1], storage1)).to.be.undefined;
        });
    });
    describe("when passed paths with a match", () => {
        it("returns the match", () => {
            expect(findStorageDependentMatch([path1, path2], storage2)).to.equal(path2);
        });
    });
    describe("when passed a path that has an array of values", () => {
        it("returns the match", () => {
            expect(findStorageDependentMatch([path3WithArray], storage3)).to.equal(path3WithArray);
        });
    });
    describe("when passed a potential match without matching key", () => {
        it("returns undefined", () => {
            expect(findStorageDependentMatch([path1], storage2)).to.be.undefined;
        });
    });
    describe("when passed a JSON path", () => {
        it("returns the match", () => {
            expect(findStorageDependentMatch([path4WithJSONPath], storage4)).to.equal(path4WithJSONPath);
            expect(findStorageDependentMatch([path4WithJSONPath, path1, path2], storage4)).to.equal(path4WithJSONPath);
        });
    });
});

describe(`#${storage.name}()`, () => {
    it('returns the correct result', () => {
        expect(storage(storage2, "key2")).to.equal("value2");
    });
    describe('when value is undefined', () => {
        it('returns the correct result', () => {
            expect(storage(storage1, "foo")).to.equal("");
            expect(!!storage(storage1, "foo")).to.be.false;
        });
    });
});

const emptySessionStore: SessionStore = createSessionStore({
    ...storage1,
    sessionStore: {
        id: "foo",
        data: {}
    }
});

const sampleSessionStore: SessionStore = createSessionStore({
    ...storage1,
    sessionStore: {
        id: "foo",
        data: {
            foo: "bar"
        }
    }
});

describe(`#${session.name}()`, () => {
    it('returns the correct result', () => {
        expect(session(sampleSessionStore, "foo")).to.equal("bar");
    });
    describe('when value is undefined', () => {
        it('returns the correct result', () => {
            expect(session(emptySessionStore, "foo")).to.equal("");
            expect(!!session(emptySessionStore, "foo")).to.be.false;
        });
    });
});
