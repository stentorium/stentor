/*! Copyright (c) 2026, XAPP AI */
import { expect } from "chai";

import { CompletionPrompt, LLMService, LLMServiceResponse, isCompletionPrompt } from "../LLMService";
// Imported through the package entry point rather than the module, so a type dropped from a
// barrel file fails here instead of silently leaving the published surface.
import { Context, LLMService as ExportedLLMService } from "../../index";

/** Minimal stand-in for whatever the runtime wires in. */
class StubLLMService implements LLMService {
    public lastPrompt?: CompletionPrompt;
    public lastOptions?: { timeout?: number };

    public async generate(
        prompt: CompletionPrompt,
        options?: { timeout?: number }
    ): Promise<LLMServiceResponse> {
        this.lastPrompt = prompt;
        this.lastOptions = options;
        return { text: '{"trade":"Roofing - Asphalt Install or Replace"}' };
    }
}

function completionPrompt(): CompletionPrompt {
    return {
        type: "completions",
        messages: [{ role: "user", content: "my roof is leaking" }],
        model: "us.anthropic.claude-haiku-4-5-20251001-v1:0",
        response_format: { type: "json_object" },
        max_tokens: 256,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    };
}

describe("LLMService", () => {
    it("is reachable from the package entry point", () => {
        const service: ExportedLLMService = new StubLLMService();

        expect(service).to.exist;
    });

    it("returns the generated text", async () => {
        const response = await new StubLLMService().generate(completionPrompt());

        expect(response.text).to.contain("Roofing");
    });

    it("accepts an options object with a timeout", async () => {
        const service = new StubLLMService();

        await service.generate(completionPrompt(), { timeout: 5000 });

        expect(service.lastPrompt?.type).to.equal("completions");
        expect(service.lastOptions?.timeout).to.equal(5000);
    });

    describe("#isCompletionPrompt()", () => {
        it("narrows a completion prompt", () => {
            const prompt = completionPrompt();

            expect(isCompletionPrompt(prompt)).to.be.true;
        });

        it("rejects anything else, including undefined", () => {
            expect(isCompletionPrompt(undefined)).to.be.false;
            expect(isCompletionPrompt({ type: "something-else" } as never)).to.be.false;
        });
    });
});

describe("ContextServices.llmService", () => {
    it("is optional, so a runtime that wires nothing still satisfies the type", () => {
        const services: Context["services"] = {};

        expect(services.llmService).to.be.undefined;
    });

    it("is populated when the runtime provides one", () => {
        const services: Context["services"] = { llmService: new StubLLMService() };

        expect(services.llmService).to.exist;
    });

    it("sits alongside the existing handler-facing services", () => {
        // Guards against the new field displacing or narrowing what handlers already rely on.
        const services: Context["services"] = {
            llmService: new StubLLMService(),
            crmService: undefined,
            smsService: undefined,
            eventService: undefined
        };

        expect(services.llmService).to.exist;
    });
});
