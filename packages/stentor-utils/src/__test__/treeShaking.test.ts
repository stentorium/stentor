/*! Copyright (c) 2026, XAPPmedia */
import { expect } from "chai";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

/*
 * Guards the premise of the dependency-slimming effort.
 *
 * stentor-utils is a barrel over 33 modules with 18 runtime deps behind it, and 196 files
 * across 6 repos import that barrel. Adding a helper here is only cheap for those consumers
 * if a bundler can drop the modules they do not use - so this proves it rather than assuming it.
 *
 * Two configurations are checked, because they answer different questions:
 *
 *   1. `sideEffects` honoured (moduleSideEffects: false) - what webpack does for the browser
 *      consumers, given the `"sideEffects": false` we declare in package.json. Nothing but the
 *      one imported helper should survive.
 *   2. Default treeshaking - a bundler that ignores the flag and assumes every external has
 *      side effects. Our own unused modules still drop, but the bare dep imports are retained.
 *      This is the pessimistic case and is recorded so a regression in (1) is not mistaken
 *      for it.
 *
 * Skipped when esm/ has not been built, so `yarn test` still works before a build.
 */
const pkgRoot = path.resolve(__dirname, "..", "..");
const esmEntry = path.join(pkgRoot, "esm", "index.js");
const built = fs.existsSync(esmEntry);

// The deps that make the barrel expensive. None of these should reach a consumer that only
// wants a string helper.
const HEAVY_DEPS = [
    "marked",
    "marked-xhtml",
    "sanitize-html",
    "fuse.js",
    "numeral",
    "xmldoc",
    "jsonpath-plus",
    "html-entities",
    "slugify"
];

// Generous enough not to be brittle, tight enough that pulling in a heavy module fails it.
const MAX_BUNDLE_BYTES = 5000;

async function bundle(treeshake: unknown): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { rollup } = require("rollup");

    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "stentor-utils-shake-"));
    const input = path.join(dir, "entry.mjs");
    // One trivial, dependency-free export - the cheapest thing a consumer can ask for.
    fs.writeFileSync(
        input,
        `import { existsAndNotEmpty } from ${JSON.stringify(esmEntry)};\nconsole.log(existsAndNotEmpty("x"));\n`
    );

    try {
        const build = await rollup({ input, treeshake, onwarn: (): void => undefined });
        const { output } = await build.generate({ format: "es" });
        await build.close();
        return output[0].code;
    } finally {
        fs.rmSync(dir, { recursive: true, force: true });
    }
}

(built ? describe : describe.skip)("tree shaking", () => {
    describe("when the sideEffects flag is honoured", () => {
        let code: string;

        before(async function (): Promise<void> {
            this.timeout(60000);
            code = await bundle({ moduleSideEffects: false });
        });

        it("drops every heavy dependency", () => {
            const retained = HEAVY_DEPS.filter((dep) => code.includes(`"${dep}"`) || code.includes(`'${dep}'`));
            expect(retained, `these deps survived: ${retained.join(", ")}`).to.be.empty;
        });

        it("keeps the bundle to the imported helper", () => {
            expect(code).to.contain("existsAndNotEmpty");
            expect(Buffer.byteLength(code)).to.be.lessThan(MAX_BUNDLE_BYTES);
        });
    });

    describe("when the bundler assumes every external has side effects", () => {
        let code: string;

        before(async function (): Promise<void> {
            this.timeout(60000);
            code = await bundle(true);
        });

        it("still drops our own unused modules", () => {
            // toHTML pulls marked + sanitize-html; getJSONPath pulls jsonpath-plus.
            expect(code).to.not.contain("export { toHTML");
            expect(code).to.not.contain("function toHTML");
            expect(code).to.not.contain("function getJSONPath");
        });

        it("retains the bare dependency imports", () => {
            // Documents the pessimistic case: without the flag the deps stay in the graph.
            // If this ever starts passing as "no imports", the flag is being honoured by
            // default and the first describe is the one that matters.
            expect(code).to.match(/import ['"](marked|sanitize-html|xmldoc)['"]/);
        });
    });
});
