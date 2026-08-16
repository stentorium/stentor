/*! Copyright (c) 2026, XAPP AI */

/**
 * Generic LLM access for custom handlers.
 *
 * Declared here rather than imported from `@xapp/stentor-service-generative-ai` because
 * `stentor-models` cannot depend on `stentor-core` -- the same reason `CrmService` and `SMSService`
 * are declared here and implemented there.
 *
 * The surface is deliberately narrow. `stentor-service-generative-ai` also offers task-specific
 * analysis (`analyzeLead`, `analyzeEmail`, `analyzeTranscript`, ...); exposing all of that here
 * would drag every analysis result type into the models package. Handlers get the generic escape
 * hatch, and anything richer stays behind the service that owns it.
 *
 * These declarations are structurally identical to the ones in
 * `stentor-service-generative-ai/src/models`, so its implementations satisfy this interface with
 * no change on that side.
 */

export type PromptType = "completions";

export interface Prompt {
    type: PromptType;
}

export interface CompletionResponseFormatText {
    type: "text";
}

export interface CompletionResponseFormatJSONObject {
    type: "json_object";
}

export interface CompletionResponseFormatJSONSchema {
    type: "json_schema";
    /**
     * JSON schema for the response, following the JSON schema specification.
     */
    json_schema: object;
}

export type CompletionResponseFormat =
    | CompletionResponseFormatText
    | CompletionResponseFormatJSONObject
    | CompletionResponseFormatJSONSchema;

export type CompletionContentMessage = string;

export interface CompletionMessage {
    role: string;
    content: CompletionContentMessage;
}

export interface CompletionPrompt extends Prompt {
    type: "completions";
    messages: CompletionMessage[];
    model: string;
    response_format: CompletionResponseFormat;
    max_tokens: number;
    temperature: number;
    top_p: number;
    frequency_penalty: number;
    presence_penalty: number;
}

/**
 * Accepts `undefined` deliberately: these guards get called on values parsed from JSON or handed
 * over by a caller, where absent is a normal input rather than a programming error. The body has
 * always handled it -- the signature now says so.
 */
export function isCompletionPrompt(prompt: Prompt | undefined): prompt is CompletionPrompt {
    return prompt?.type === "completions";
}

export interface LLMServiceResponse {
    text: string;
}

/**
 * A service that generates text from a prompt sent to an LLM.
 *
 * The response is raw model output. Callers are responsible for parsing it, and for the fact that
 * a model can return something that does not match the shape that was asked for -- validate what
 * comes back against whatever list or schema the prompt constrained it to, rather than trusting it.
 */
export interface LLMService {
    /**
     * Generate a response for the given prompt.
     *
     * @param prompt - The prompt to send.
     * @param options - Optional parameters, such as a timeout in milliseconds.
     * @returns The model's response.
     * @throws If the underlying service is unavailable or the prompt is invalid.
     */
    generate(prompt: Prompt, options?: { timeout?: number }): Promise<LLMServiceResponse>;
}
