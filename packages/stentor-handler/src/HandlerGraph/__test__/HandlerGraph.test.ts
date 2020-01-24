/*! Copyright (c) 2019, XAPPmedia */
/* tslint:disable:no-magic-numbers */
import { expect } from "chai";
import { HandlerGraph } from "../HandlerGraph";

import { handlers } from "./assets/handlers";

describe("HandlerGraph", () => {
    describe("constructor", () => {
        it("generates a graph", () => {
            const graph = new HandlerGraph(handlers);
            expect(graph).to.exist;
            expect(graph.size()).to.equal(99);
            expect(graph.relations()).to.equal(122);
        });
    });
});
