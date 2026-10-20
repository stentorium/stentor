/*! Copyright (c) 2026, XAPPmedia */
import { expect } from "chai";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { loadDotEnv, parseDotEnv } from "../loadDotEnv";

/**
 * The dotenv rules this package relied on, now ours: KEY=value lines, optional `export`, single,
 * double and backtick quotes, `\n` expansion only inside double quotes, `#` comments, a quoted
 * value spanning lines, and an existing environment variable never overwritten.
 */
describe("#parseDotEnv()", () => {
    it("reads plain, exported, quoted and commented lines", () => {
        const parsed = parseDotEnv([
            "# a comment",
            "PLAIN=value",
            "export EXPORTED=yes",
            "SPACED = padded value   ",
            "SINGLE='single # not a comment'",
            'DOUBLE="double \\n line"',
            "BACK=`tick`",
            "TRAILING=value # comment",
            "EMPTY=",
            "",
            "not a pair",
        ].join("\n"));
        expect(parsed).to.deep.equal({
            PLAIN: "value",
            EXPORTED: "yes",
            SPACED: "padded value",
            SINGLE: "single # not a comment",
            DOUBLE: "double \n line",
            BACK: "tick",
            TRAILING: "value",
            EMPTY: "",
        });
    });

    it("keeps a quoted value that spans lines", () => {
        const parsed = parseDotEnv('KEY="-----BEGIN-----\nabc\n-----END-----"\nNEXT=1');
        expect(parsed).to.deep.equal({ KEY: "-----BEGIN-----\nabc\n-----END-----", NEXT: "1" });
    });

    it("handles CRLF files", () => {
        expect(parseDotEnv("A=1\r\nB=2\r\n")).to.deep.equal({ A: "1", B: "2" });
    });
});

describe("#loadDotEnv()", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "stentor-dotenv-"));
    const file = path.join(dir, ".env");
    const KEY = `STENTOR_DOTENV_TEST_${process.pid}`;

    afterEach(() => {
        delete process.env[KEY];
        delete process.env[`${KEY}_SET`];
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    });

    it("puts the file's values on process.env without overwriting what is already set", () => {
        fs.writeFileSync(file, `${KEY}=from-file\n${KEY}_SET=from-file\n`);
        process.env[`${KEY}_SET`] = "already";
        loadDotEnv(file);
        expect(process.env[KEY]).to.equal("from-file");
        expect(process.env[`${KEY}_SET`]).to.equal("already");
    });

    it("does nothing, quietly, when there is no file", () => {
        expect(() => loadDotEnv(path.join(dir, "missing.env"))).to.not.throw();
        expect(process.env[KEY]).to.equal(undefined);
    });
});
