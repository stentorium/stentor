/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";

import { translateEventAndContext } from "../translateEventAndContext";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const apiGateway = require("./assets/ExamplePayloads/lambda-api-gateway-request.json");

describe("#translateLambdaContext()", () => {
    describe("when passed an API Gateway event", () => {
        it("translates the event and context", () => {
            const { event, context } = translateEventAndContext(apiGateway, {});
            expect(event).to.exist;
            expect(context).to.exist;
        });
    });
});
