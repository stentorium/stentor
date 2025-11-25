/*! Copyright (c) 2020, XAPPmedia */
import { log } from "stentor-logger";
import { Contexts, ConditionalCheck, Conditional } from "stentor-models";
import { MacroMap } from "stentor-utils";

import { getVM, SandboxFunctions } from "./getVM";
/**
 * ConditionalDeterminer is first configured with a set of conditional 
 * checks it can perform and then determines which is the best match.
 */
export class ConditionalDeterminer {

    private macros: MacroMap = {};

    private timeout = 500;

    private checks: ConditionalCheck[] = [];

    public constructor(checks?: ConditionalCheck[], macros?: MacroMap) {
        if (Array.isArray(checks)) {
            this.checks = checks;
        }

        if (macros) {
            this.macros = macros;
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
                const sandboxFunctions: SandboxFunctions = {};

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

                const sandbox = {
                    ...sandboxFunctions,
                    ...this.macros
                };

                // Debug logging
                log().debug(`Sandbox functions available: ${Object.keys(sandbox).join(', ')}`);

                const vm = getVM({
                    timeout: this.timeout,
                    sandbox
                });

                let result: boolean;
                try {
                    result = vm.run(conditional.conditions);
                    log().debug(`${vm.type}|Condition "${conditional.conditions}" evaluated to: ${result}`);
                } catch (e) {
                    log().error(`${vm.type}|Error evaluating conditions "${conditional.conditions}": ${e}`);
                    log().error(`Stack: ${e instanceof Error ? e.stack : 'No stack trace'}`);

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
                    }
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