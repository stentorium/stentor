/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { Handler } from "stentor-models";
import { generateHandlerTree } from "../generateHandlerTree";
import { HandlerTree } from "../HandlerTree";

const root: Handler = {
    content: {
    },
    forward: {
        A: [
            {
                intentId: "C"
            }
        ],
        B: [
            {
                intentId: "C"
            }
        ]
    },
    organizationId: "organizationId",
    intentId: "root",
    appId: "appId",
    langCode: "en-US",
    type: "HandlerIntent"
};

const handlers: Handler[] = [
    {
        content: {},
        organizationId: "organizationId",
        intentId: "C",
        appId: "appId",
        langCode: "en-US",
        type: "HandlerIntent",
        forward: {
            A: [
                {
                    intentId: "D"
                }
            ]
        }
    },
    {
        content: {},
        organizationId: "organizationId",
        intentId: "D",
        appId: "appId",
        langCode: "en-US",
        type: "HandlerIntent",
        forward: {
            A: [
                {
                    intentId: "B"
                }
            ]
        }
    },

]

describe("#generateHandlerTree()", () => {
    describe("when passed an empty array", () => {
        it("returns a tree without children", () => {
            const tree = generateHandlerTree(root, []);
            expect(tree.root.children).to.have.length(0);
        });
    });
    describe("when passed node and handlers", () => {
        let tree: HandlerTree;
        beforeEach(() => {
            tree = generateHandlerTree(root, handlers);
        });
        it("sets the root", () => {
            expect(tree.root.data).to.equal(root);
        });
        it("prints", () => {
            tree.print(handler => {
                return handler.intentId;
            });
        });
    });
});
