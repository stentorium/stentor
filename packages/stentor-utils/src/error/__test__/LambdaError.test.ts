/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVICE_ERROR } from "stentor-constants";
import { LambdaError } from "../LambdaError";

describe("LambdaError", () => {
    describe("constructor", () => {
        it("sets the error message", () => {
            expect(new LambdaError("Foo").message).to.equal("Foo");
        });
        it("sets the status code", () => {
            expect(new LambdaError("Bar", HTTP_400_BAD_REQUEST).statusCode).to.equal(HTTP_400_BAD_REQUEST);
        });
        it("defaults to a 500 status code when not provided", () => {
            expect(new LambdaError("Foo").statusCode).to.equal(HTTP_500_INTERNAL_SERVICE_ERROR);
        });
    });
});
