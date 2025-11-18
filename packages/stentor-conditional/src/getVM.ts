/*! Copyright (c) 2022, XAPP AI */

import { runInNewContext, createContext } from "node:vm";

export interface VMable {
    run(code: string): boolean;

    type: string;
}

export type SandboxFunctions = { [name: string]: ((input: any) => boolean | string | number) }

export interface VMProps {
    timeout: number;
    sandbox: SandboxFunctions;
}

/**
 * Returns a VM, defaults to Node's VM.
 * 
 * @param props 
 * @returns 
 */
export function getVM(props: VMProps): VMable {

    let vm: VMable = {
        run: (code: string): boolean => {
            const context = createContext(props.sandbox);
            return runInNewContext(code, context);
        },
        type: "VM"
    }

    if (!process.env.SKIP_VM2) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const { VM } = require('vm2');
            vm = new VM(props);
            vm.type = "VM2";
        } catch (e) {
            // vm2 doesn't exist
        }
    }

    if (!process.env.SKIP_IVM) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const ivm = require('isolated-vm');
            const isolate = new ivm.Isolate({ memoryLimit: 128 });
            vm = {
                run: (code: string): boolean => {

                    const context = isolate.createContextSync();

                    const jail = context.global;

                    Object.keys(props.sandbox).forEach((fnc) => {
                        const value = props.sandbox[fnc];
                        jail.setSync(fnc, (...args: any) => {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            return value(...args);
                        });
                    });

                    return context.evalSync(code);
                },
                type: "IVM"
            }

        } catch (e) {

        }
    }

    return vm;

}