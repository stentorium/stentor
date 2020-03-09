/*! Copyright (c) 2020, XAPPmedia */
import { log } from "stentor-logger";
import { Contexts, ConditionalCheck, Conditioned } from "stentor-models";
import { VM } from "vm2";

/**
 * 
 */
export class ConditionalDeterminer {

    private timeout = 500;

    private checks: ConditionalCheck[];

    public constructor(checks: ConditionalCheck[]) {
        this.checks = checks;

    }

    public determine(conditionals: Conditioned[]): Conditioned[] {

        if (!Array.isArray(conditionals)) {
            return [];
        }

        if (conditionals.length === 0) {
            return [];
        }

        const possible: Conditioned[] = [];

        // For each of the conditionals
        conditionals.forEach((conditional) => {
            if (typeof conditional.conditions === "string") {
                // Get all the function and add them to the sandbox.
                const sandboxFunctions: { [name: string]: ((input: any) => boolean) } = {};

                if (Array.isArray(this.checks)) {
                    this.checks.forEach((check) => {
                        if (Array.isArray(check.functions)) {
                            check.functions.forEach((func) => {
                                sandboxFunctions[func.name] = func;
                            })
                        }
                    });
                }
                const vm = new VM({
                    timeout: this.timeout,
                    sandbox: {
                        ...sandboxFunctions
                    }
                });
                let result: boolean;
                try {
                    result = vm.run(conditional.conditions);
                } catch (e) {
                    log().error(`Error evaluating conditions "${conditional.conditions}": ${e}`);
                    result = false;
                }
                // It should be a boolean but need to double check
                if (typeof result === "boolean" && result) {
                    possible.push(conditional)
                }
            } else if (typeof conditional.conditions === "object") {
                const { must, should } = conditional.conditions;
                let mustsPassed = false;
                let mustsFailed = false;

                if (Array.isArray(must) && must.length > 0) {
                    must.forEach((obj) => {
                        if (this.pass(obj)) {
                            mustsPassed = true;
                        } else {
                            mustsFailed = true;
                        }
                    });
                } else {
                    mustsPassed = true;
                }

                if (mustsPassed && !mustsFailed) {
                    // Just need one to pass
                    let shouldsPassed = false;
                    // First, see if we have shoulds
                    if (Array.isArray(should) && should.length > 0) {
                        should.forEach((obj) => {
                            if (this.pass(obj)) {
                                shouldsPassed = true;
                            }
                        });
                    } else {
                        // No shoulds, pass
                        shouldsPassed = true;
                    }

                    if (shouldsPassed) {
                        possible.push(conditional);
                    }
                }
            }


        });

        return possible;
    }

    private pass(obj: (Contexts | object)): boolean {

        let passed = false;
        let failed = false;

        this.checks.forEach((check) => {
            // Make sure the check applies to this object
            // and it hasn't already passed
            if (check.test(obj)) {
                if (check.check(obj)) {
                    passed = true;
                } else {
                    failed = true;
                }
            }
        });

        if (failed) {
            return false;
        }

        return passed;
    }
}