/*! Copyright (c) 2019, XAPPmedia */
/* tslint:disable:no-magic-numbers */
import { expect } from "chai";
import { HandlerGraph } from "../HandlerGraph";
import { toNodesAndConnections } from "../toNodesAndConnections";

import { handlersSmaller } from "./assets/handlers-smaller";

const graph = new HandlerGraph(handlersSmaller);

describe("#toNodesAndConnections()", () => {
    describe("for valid input", () => {
        it("translates the graph", () => {
            const result = toNodesAndConnections(graph);
            expect(result).to.exist;
            expect(Object.keys(result.nodes)).to.have.length(7);
            expect(Object.keys(result.connections)).to.have.length(5);
        });
    });
});
