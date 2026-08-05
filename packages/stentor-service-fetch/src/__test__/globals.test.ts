/*! Copyright (c) 2026, XAPPmedia */
import { expect } from "chai";

/*
 * Guards the assumption that removing the isomorphic-fetch and
 * abort-controller polyfills rests on.
 *
 * Those two packages existed only to provide `fetch` and `AbortController` on
 * older Node. Both have been built in for years — `AbortController` since Node
 * 15, `fetch` since Node 18 — so with the engines floor raised to >=18 the
 * polyfills are dead weight.
 *
 * If someone lowers the floor back below 18, this test fails immediately and
 * locally rather than as a confusing `fetch is not defined` at runtime in a
 * Lambda.
 */
describe("runtime globals required by FetchService", () => {
    it("provides fetch without a polyfill", () => {
        expect(typeof fetch).to.equal("function");
    });

    it("provides AbortController without a polyfill", () => {
        expect(typeof AbortController).to.equal("function");
    });

    it("provides an AbortController whose signal aborts", () => {
        const controller = new AbortController();
        expect(controller.signal.aborted).to.be.false;
        controller.abort();
        expect(controller.signal.aborted).to.be.true;
    });

    it("runs on a Node major at or above the declared engines floor", () => {
        const major = Number(process.versions.node.split(".")[0]);
        expect(major).to.be.at.least(18);
    });
});
