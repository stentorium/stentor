/*! Copyright (c) 2026, XAPPmedia */
import { expect } from "chai";
import { execFileSync } from "child_process";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

/*
 * Guards the dual ESM+CJS packaging.
 *
 * This exists because of a real incident: xmldoc 1.4 dropped its `require`
 * condition, and every Lambda that loaded stentor-utils started throwing
 * ERR_REQUIRE_ESM in production. Nothing in the test suite caught it, because
 * the suite runs through ts-node against src/ and never exercises the
 * published entry points.
 *
 * So these tests deliberately shell out to a clean `node` and load the BUILT
 * output the way a real consumer would. They are skipped when lib/ or esm/ is
 * absent so `yarn test` still works before a build.
 */
const pkgRoot = path.resolve(__dirname, "..", "..");
const libEntry = path.join(pkgRoot, "lib", "index.js");
const esmEntry = path.join(pkgRoot, "esm", "index.js");
const built = fs.existsSync(libEntry) && fs.existsSync(esmEntry);

// A representative spread: plain string helpers plus the modules whose deps
// are the ESM-only ones (marked, jsonpath-plus, fuse.js, html-entities).
const NAMED_EXPORTS = [
    "existsAndNotEmpty", // plain, no deps
    "toHTML", // marked + marked-xhtml + html-entities + sanitize-html
    "getJSONPath", // jsonpath-plus
    "ssmlify", // xmldoc
    "dedupe"
];

function runNode(source: string, extension: "cjs" | "mjs"): string {
    // Written to the temp dir, not the package root: a cancelled run between
    // write and unlink would otherwise leave a stray dotfile in the tree.
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "stentor-utils-dual-"));
    const file = path.join(dir, `check.${extension}`);
    fs.writeFileSync(file, source);

    try {
        return execFileSync(process.execPath, [file], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
    } finally {
        fs.rmSync(dir, { recursive: true, force: true });
    }
}

(built ? describe : describe.skip)("dual package entry points", () => {
    describe("CommonJS", () => {
        it("can be required from a plain CJS context", () => {
            // The exact shape that broke in production. A failure here is an
            // ERR_REQUIRE_ESM from a transitive dep dropping its require condition.
            const out = runNode(
                `const m = require(${JSON.stringify(libEntry)});
                 if (typeof m !== "object" || m === null) { throw new Error("no exports"); }
                 console.log("ok:" + Object.keys(m).length);`,
                "cjs"
            );
            expect(out).to.match(/^ok:\d+$/);
            expect(Number(out.split(":")[1])).to.be.greaterThan(0);
        });

        it("exposes the expected named exports as functions", () => {
            const out = runNode(
                `const m = require(${JSON.stringify(libEntry)});
                 const missing = ${JSON.stringify(NAMED_EXPORTS)}.filter((k) => typeof m[k] !== "function");
                 console.log(missing.length ? "missing:" + missing.join(",") : "ok");`,
                "cjs"
            );
            expect(out).to.equal("ok");
        });
    });

    describe("ESM", () => {
        it("can be imported from a plain ESM context", () => {
            const out = runNode(
                `import(${JSON.stringify(esmEntry)})
                    .then((m) => console.log("ok:" + Object.keys(m).length))
                    .catch((e) => { console.log("fail:" + e.code); process.exitCode = 1; });`,
                "mjs"
            );
            expect(out).to.match(/^ok:\d+$/);
        });

        it("exposes the same public API surface as the CJS entry", () => {
            const cjsKeys = runNode(
                `console.log(Object.keys(require(${JSON.stringify(libEntry)})).sort().join(","));`,
                "cjs"
            );
            const esmKeys = runNode(
                `import(${JSON.stringify(esmEntry)}).then((m) =>
                    console.log(Object.keys(m).filter((k) => k !== "default").sort().join(",")));`,
                "mjs"
            );
            expect(esmKeys).to.equal(cjsKeys);
        });
    });

    describe("packaging", () => {
        it("scopes type=module to esm/ only, never the package root", () => {
            // Setting type=module at the root would reinterpret lib/*.js as ESM
            // and break every CJS consumer.
            const rootPkg = JSON.parse(fs.readFileSync(path.join(pkgRoot, "package.json"), "utf8"));
            expect(rootPkg.type).to.be.undefined;

            const esmPkg = JSON.parse(fs.readFileSync(path.join(pkgRoot, "esm", "package.json"), "utf8"));
            expect(esmPkg.type).to.equal("module");
        });

        it("keeps a require condition on every exports subpath", () => {
            // An import-only subpath is exactly what breaks Lambda consumers.
            const rootPkg = JSON.parse(fs.readFileSync(path.join(pkgRoot, "package.json"), "utf8"));

            for (const [subpath, value] of Object.entries<never>(rootPkg.exports)) {
                if (typeof value === "string") {
                    continue;
                }
                expect(value, `${subpath} must keep a require condition`).to.have.property("require");
            }
        });

        it("keeps main pointing at the CJS build", () => {
            const rootPkg = JSON.parse(fs.readFileSync(path.join(pkgRoot, "package.json"), "utf8"));
            expect(rootPkg.main).to.match(/^lib\//);
        });
    });
});
