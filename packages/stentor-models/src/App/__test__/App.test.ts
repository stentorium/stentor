/*! Copyright (c) 2026, XAPP AI */
import { expect } from "chai";

import { App, AppKind } from "../App";
// Imported through the package entry point rather than the module, so a type dropped from a
// barrel file fails here instead of silently leaving the published surface.
import { App as ExportedApp, AppKind as ExportedAppKind } from "../../index";

describe("App.appKind", () => {
    it("is optional, so an unmarked app is still assignable", () => {
        const app: App = {
            name: "Unmarked App",
            appId: "unmarked-app"
        };

        expect(app.appKind).to.be.undefined;
    });

    it("accepts every AppKind value", () => {
        const kinds: AppKind[] = ["customer", "internal", "canary", "demo"];

        const apps: App[] = kinds.map((appKind) => ({ name: "Marked App", appId: `app-${appKind}`, appKind }));

        expect(apps.map((app) => app.appKind)).to.deep.equal(kinds);
    });

    it("rejects values outside the enum", () => {
        const app: App = {
            name: "Bad App",
            appId: "bad-app",
            // @ts-expect-error "test" is not an AppKind
            appKind: "test"
        };

        expect(app.appKind).to.equal("test");
    });

    it("is exported from the package entry point", () => {
        const appKind: ExportedAppKind = "canary";
        const app: ExportedApp = { name: "Canary", appId: "friends-hvac", appKind };

        expect(app.appKind).to.equal("canary");
    });
});
