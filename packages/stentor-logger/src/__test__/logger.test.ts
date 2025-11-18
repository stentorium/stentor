/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { log, redact, set } from "../logger";

chai.use(sinonChai);
const expect = chai.expect;

let logLevel: string;
let logPii: string;
let maskPartial: string;


beforeEach(() => {
    logLevel = process.env.STENTOR_LOG_LEVEL;
    logPii = process.env.OVAI_LOG_PII;
    maskPartial = process.env.OVAI_LOG_PII_MASK_PARTIAL;
    process.env.STENTOR_LOG_LEVEL = "debug";
});
afterEach(() => {
    process.env.STENTOR_LOG_LEVEL = logLevel;
    process.env.OVAI_LOG_PII = logPii;
    process.env.OVAI_LOG_PII_MASK_PARTIAL = maskPartial;
    // Reset the logger instance
    set(undefined);
});
describe("#log()", () => {
    it("returns a logger", () => {
        expect(log()).to.exist;
    });
    it("doesn't crash", () => {
        expect(() => {
            log().debug("foo");
            log().info("bar");
            log().warn("warn");
            log().debug("foo %o", { bar: true });
            log().debug({ bar: true });
            log().error(new Error("foo"));
            log().debug("my number is 800-888-8888");
            log().debug({
                number: "8008888888"
            });
            log().debug({
                email: "foo@xappmedia.com",
                phone: "800.888.8888",
                bar: true,
                foo: {
                    baz: 6
                }
            });
        }).to.not.throw();
    });
    describe("when on lambda", () => {
        beforeEach(() => {
            process.env.AWS_LAMBDA_FUNCTION_NAME = "debug-func";
        });
        afterEach(() => {
            delete process.env.AWS_LAMBDA_FUNCTION_NAME;
        });
        it("prints correctly", () => {
            expect(() => {
                log().debug("foo");
                log().info("bar");
                log().warn("warn");
                log().debug("foo %o", { bar: true });
                log().debug({ bar: true });
                log().error(new Error("foo"));
                log().debug("my number is 800-888-8888");
                log().debug({
                    number: "8008888888"
                });
                log().debug({
                    email: "foo@xappmedia.com",
                    phone: "800.888.8888",
                    bar: true,
                    foo: {
                        baz: 6
                    }
                });
            }).to.not.throw();
        });
    });
});
describe("#set()", () => {
    afterEach(() => {
        // reset it
        set(undefined);
    });
    it("sets a new logger", () => {
        const stub = sinon.stub();
        set({
            info: stub,
            debug: stub,
            warn: stub,
            error: stub
        });
        log().debug("foo");
        expect(stub).to.have.been.calledOnce;
        expect(stub).to.have.been.calledWith("foo");
    });
});
describe("#redact()", () => {
    it("redacts the logs", () => {
        const redacted = redact({
            level: "debug",
            message: "My number is 800-888-8888"
        });
        expect(redacted.message).to.equal("My number is ###-###-####");
    });
    it("does not modify the original", () => {
        const original = {
            level: "debug",
            message: "My number is 800-888-8888"
        };
        const redacted = redact(original);
        expect(original.message).to.equal("My number is 800-888-8888");
        expect(redacted.message).to.equal("My number is ###-###-####");
    });
    describe("with OVAI_LOG_PII set to true", () => {
        const original = process.env.OVAI_LOG_PII
        beforeEach(() => {
            process.env.OVAI_LOG_PII = "true";
        });
        after(() => {
            process.env.OVAI_LOG_PII = original;
        });
        it("passes through PII!", () => {
            expect(
                redact({
                    level: "debug",
                    message: "My number is 800-888-8888"
                })
            ).to.deep.equal({
                level: "debug",
                message: "My number is 800-888-8888"
            });
        });
    });
    describe("when OVAI_LOG_PII_MASK_PARTIAL is set to true", () => {
        beforeEach(() => {
            process.env.OVAI_LOG_PII_MASK_PARTIAL = "true";
        });
        it("masks part of the PII", () => {
            expect(
                redact({
                    level: "debug",
                    message: "My email is foo@xappmedia.com and number is 8008888888"
                })
            ).to.deep.equal({
                level: "debug",
                message: "My email is f*o@xappmedia.com and number is ######8888"
            });
        });
    });
});
