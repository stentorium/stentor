/*! Copyright (c) 2020, XAPPmedia */
import { log } from "stentor-logger";
import { Contexts, ConditionalCheck, Conditional } from "stentor-models";
import { VM } from "vm2";

/**
 * ConditionalDeterminer is first configured with a set of conditional 
 * checks it can perform and then determines which is the best match.
 */
export class ConditionalDeterminer {

    private timeout = 500;

    private checks: ConditionalCheck[] = [];

    public constructor(checks?: ConditionalCheck[]) {
        if (Array.isArray(checks)) {
            this.checks = checks;
        }
    }

    /**
     * Determine the best conditional matches
     * 
     * @param conditionals 
     * @returns All matching conditionals based on the available checks
     */
    public determine<T>(conditionals: Conditional<T>[]): Conditional<T>[] {

        if (!Array.isArray(conditionals)) {
            return [];
        }

        if (conditionals.length === 0) {
            return [];
        }

        const possible: Conditional<T>[] = [];

        // For each of the conditionals
        conditionals.forEach((conditional) => {
            if (typeof conditional.conditions === "string") {
                // Get all the function and add them to the sandbox.
                const sandboxFunctions: { [name: string]: ((input: any) => boolean) } = {};

                if (Array.isArray(this.checks)) {
                    this.checks.forEach((check) => {
                        if (Array.isArray(check.functions)) {
                            check.functions.forEach((func) => {
                                // Function might be bounded, in which case we need to clean off
                                // the "bound " in front of it
                                let name = func.name;
                                if (name.startsWith("bound ")) {
                                    name = name.replace("bound ", "");
                                }
                                sandboxFunctions[name] = func;
                            });
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

                if (Array.isArray(must) && must.length > 0) {
                    // All the musts must pass
                    for (const obj of must) {
                        if (this.pass(obj)) {
                            mustsPassed = true;
                        } else {
                            // Break on a failure.
                            mustsPassed = false;
                            break;
                        }
                    };
                } else {
                    mustsPassed = true;
                }

                if (mustsPassed) {
                    // Just need one to pass
                    let shouldsPassed = false;
                    // First, see if we have shoulds
                    if (Array.isArray(should) && should.length > 0) {
                        for (const obj of should) {
                            if (this.pass(obj)) {
                                // We just need one to pass, break;
                                shouldsPassed = true;
                                break;
                            }
                        }
                    } else {
                        // No shoulds, auto pass
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

    /**
     * Determine if the object passes.
     * @param obj 
     */
    private pass(obj: (Contexts | object)): boolean {
        for (const check of this.checks) {
            // If it passes the test and then fails the check
            if (check.test(obj) && !check.check(obj)) {
                // fast fail
                return false;
            }
        }
        return true;
    }
}