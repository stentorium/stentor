/*! Copyright (c) 2026, XAPPmedia */
/*
 * Marks the esm/ output as ES modules.
 *
 * The package root has no "type" field, so it defaults to commonjs and Node
 * would treat esm/*.js as CommonJS too — the ESM entry would fail to load with
 * a syntax error on its first `import`. A nested package.json scopes the type
 * to that directory only, leaving lib/ as CommonJS.
 *
 * Deliberately NOT setting "type": "module" at the package root: that would
 * reinterpret lib/*.js as ESM and break every CJS consumer, which is the exact
 * failure mode the xmldoc incident caused across every Lambda.
 */
const fs = require("fs");
const path = require("path");

const esmDir = path.join(__dirname, "..", "esm");

if (!fs.existsSync(esmDir)) {
    console.error("finalize-esm: esm/ not found — did the ESM build run?");
    process.exit(1);
}

fs.writeFileSync(path.join(esmDir, "package.json"), `${JSON.stringify({ type: "module" }, null, 2)}\n`);
