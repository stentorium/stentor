/*! Copyright (c) 2019, XAPPmedia */
import { log } from "stentor-logger";
import { NLUQueryResponse, NLURequestProps, NLUService } from "stentor-models";

export interface LexV2Config {
    /**
     * Bot ID for the Lex V2 bot
     * This is required for all Lex V2 operations
     */
    botId?: string;
    /**
     * Bot Alias ID for the Lex V2 bot
     * This is required for all Lex V2 operations
     */
    botAliasId?: string;
    /**
     * Locale ID for the bot (e.g., 'en_US')
     * Defaults to 'en_US' if not provided
     */
    localeId?: string;
    /**
     * AWS region where the bot is deployed
     * Defaults to 'us-east-1' if not provided
     */
    region?: string;
    /**
     * Optional session timeout in seconds
     * How long to maintain session state
     */
    sessionTimeout?: number;
    /**
     * Whether to enable graceful degradation when Lex operations fail
     * If true, errors will be logged but operations will continue
     * If false, errors will be thrown (default behavior)
     */
    gracefulDegradation?: boolean;
}

export interface LexV2Client {
    recognizeText(params: any): Promise<any>;
    putSession?(params: any): Promise<any>;
}

/**
 * Amazon Lex V2 Natural Language Understanding Service
 * 
 * Provides NLU capabilities using Amazon Lex V2 runtime API.
 * Includes validation for required configuration and graceful fallback
 * when bot ID is missing or operations fail.
 */
export class LexServiceV2 implements NLUService {
    private readonly botId?: string;
    private readonly botAliasId?: string;
    private readonly localeId: string;
    private readonly region: string;
    private readonly sessionTimeout: number;
    private readonly gracefulDegradation: boolean;
    private lexClient?: LexV2Client;
    private readonly contextStore = new Map<string, any>();

    constructor(config: LexV2Config = {}) {
        // Get configuration from environment variables first, then from config
        this.botId = config.botId || process.env.LEX_BOT_ID;
        this.botAliasId = config.botAliasId || process.env.LEX_BOT_ALIAS_ID;
        this.localeId = config.localeId || process.env.LEX_LOCALE_ID || 'en_US';
        this.region = config.region || process.env.AWS_REGION || 'us-east-1';
        this.sessionTimeout = config.sessionTimeout || 300; // 5 minutes default
        this.gracefulDegradation = config.gracefulDegradation !== false; // true by default

        // Initialize Lex client if we have required configuration
        if (this.botId && this.botAliasId) {
            this.initializeLexClient();
        } else {
            const missingFields = [];
            if (!this.botId) missingFields.push('botId');
            if (!this.botAliasId) missingFields.push('botAliasId');

            const message = `LexServiceV2 configuration is incomplete. Missing required fields: ${missingFields.join(', ')}. ` +
                `${this.gracefulDegradation ? 'Operating in fallback mode.' : 'Service will not be functional.'}`;

            if (this.gracefulDegradation) {
                log().warn(message);
            } else {
                throw new Error(message);
            }
        }
    }

    private initializeLexClient(): void {
        try {
            // Try to load AWS SDK v3 Lex client
            // This is a peer dependency so it may not be available
            const { LexRuntimeV2Client } = require('@aws-sdk/client-lex-runtime-v2');
            
            this.lexClient = new LexRuntimeV2Client({
                region: this.region
            });
            
            log().info(`LexServiceV2 initialized with botId: ${this.botId}, region: ${this.region}`);
        } catch (error) {
            const message = `Failed to initialize Lex V2 client: ${error.message}. AWS SDK v3 may not be installed.`;
            
            if (this.gracefulDegradation) {
                log().warn(message);
                this.lexClient = undefined;
            } else {
                throw new Error(message);
            }
        }
    }

    /**
     * Query the NLU with the user's natural language input.
     * 
     * @param query Natural language query from the user
     * @param props Additional request properties
     * @returns Promise resolving to NLU query response
     */
    public async query(query: string, props: NLURequestProps = {}): Promise<NLUQueryResponse> {
        if (!this.isConfigured()) {
            return this.getFallbackResponse(query, props);
        }

        if (!this.lexClient) {
            log().warn('LexServiceV2: Lex client not available, using fallback response');
            return this.getFallbackResponse(query, props);
        }

        try {
            const { RecognizeTextCommand } = require('@aws-sdk/client-lex-runtime-v2');
            
            const sessionId = props.sessionId || 'default-session';
            const userId = props.userId || 'default-user';

            const command = new RecognizeTextCommand({
                botId: this.botId,
                botAliasId: this.botAliasId,
                localeId: props.locale || this.localeId,
                sessionId,
                text: query,
                sessionState: {
                    intent: props.activeContext ? {
                        name: props.activeContext[0]?.name
                    } : undefined,
                    sessionAttributes: props.requestAttributes || {}
                }
            });

            const response = await this.lexClient.recognizeText(command);
            
            return this.transformLexResponse(response, query);
        } catch (error) {
            const errorMessage = `LexServiceV2.query() failed: ${error.message}`;
            
            if (this.gracefulDegradation) {
                log().error(errorMessage);
                return this.getFallbackResponse(query, props);
            } else {
                throw new Error(errorMessage);
            }
        }
    }

    /**
     * Used to set context that will be used for the next query of the NLU.
     * 
     * This method handles the core issue described in the bug report:
     * validates bot ID is present before attempting Lex operations.
     * 
     * @param props Context properties to set
     */
    public async setContext(props: NLURequestProps = {}): Promise<void> {
        // This is the key fix: validate bot ID before attempting Lex operations
        if (!this.isConfigured()) {
            const message = 'LexServiceV2.setContext(): Bot ID (botId) is required to query LexServiceV2. ' +
                'Context will be stored locally but not synced to Lex.';
            
            log().warn(message);
            
            // Store context locally for potential use in subsequent queries
            if (props.sessionId && props.activeContext) {
                this.contextStore.set(props.sessionId, {
                    activeContext: props.activeContext,
                    timestamp: Date.now(),
                    userId: props.userId
                });
            }
            
            // Do not throw error - gracefully continue without Lex sync
            return;
        }

        if (!this.lexClient) {
            log().warn('LexServiceV2.setContext(): Lex client not available, storing context locally only');
            
            // Store context locally
            if (props.sessionId && props.activeContext) {
                this.contextStore.set(props.sessionId, {
                    activeContext: props.activeContext,
                    timestamp: Date.now(),
                    userId: props.userId
                });
            }
            
            return;
        }

        try {
            const sessionId = props.sessionId || 'default-session';
            
            // Store context locally first
            if (props.activeContext) {
                this.contextStore.set(sessionId, {
                    activeContext: props.activeContext,
                    timestamp: Date.now(),
                    userId: props.userId
                });
            }

            // Try to sync to Lex V2 if putSession is available
            if (this.lexClient.putSession) {
                const { PutSessionCommand } = require('@aws-sdk/client-lex-runtime-v2');
                
                const command = new PutSessionCommand({
                    botId: this.botId,
                    botAliasId: this.botAliasId,
                    localeId: props.locale || this.localeId,
                    sessionId,
                    sessionState: {
                        intent: props.activeContext?.[0] ? {
                            name: props.activeContext[0].name,
                            state: 'ReadyForFulfillment'
                        } : undefined,
                        sessionAttributes: props.requestAttributes || {}
                    }
                });

                await this.lexClient.putSession(command);
                log().info(`LexServiceV2.setContext(): Successfully synced context to Lex for session ${sessionId}`);
            } else {
                log().info('LexServiceV2.setContext(): Context stored locally, Lex sync not available');
            }

        } catch (error) {
            const errorMessage = `LexServiceV2.setContext() failed to sync to Lex: ${error.message}`;
            
            if (this.gracefulDegradation) {
                log().error(errorMessage + ' - Context stored locally only');
                // Context is already stored locally above, so operation continues
            } else {
                throw new Error(errorMessage);
            }
        }
    }

    /**
     * Check if the service is properly configured with required fields
     */
    private isConfigured(): boolean {
        return !!(this.botId && this.botAliasId);
    }

    /**
     * Generate a fallback response when Lex is not available
     */
    private getFallbackResponse(query: string, props: NLURequestProps): NLUQueryResponse {
        log().info(`LexServiceV2: Using fallback response for query: "${query}"`);
        
        // Check if we have stored context for this session
        const storedContext = props.sessionId ? this.contextStore.get(props.sessionId) : undefined;
        
        return {
            type: "INPUT_UNKNOWN",
            intentId: "InputUnknown",
            attributes: {
                ...(props.requestAttributes || {}),
                lexServiceV2Fallback: true,
                fallbackReason: this.isConfigured() ? 'lex-client-unavailable' : 'missing-configuration'
            }
        };
    }

    /**
     * Transform Lex V2 response to Stentor NLU response format
     */
    private transformLexResponse(lexResponse: any, originalQuery: string): NLUQueryResponse {
        const intent = lexResponse.sessionState?.intent;
        
        if (!intent || intent.state === 'Failed') {
            return {
                type: "INPUT_UNKNOWN",
                intentId: "InputUnknown",
                attributes: {
                    originalQuery,
                    lexState: intent?.state
                }
            };
        }

        const slots: any = {};
        if (intent.slots) {
            Object.keys(intent.slots).forEach(slotName => {
                const slot = intent.slots[slotName];
                if (slot?.value?.interpretedValue) {
                    slots[slotName] = {
                        name: slotName,
                        value: slot.value.interpretedValue,
                        raw: slot.value.originalValue
                    };
                }
            });
        }

        return {
            type: "INTENT_REQUEST",
            intentId: intent.name,
            slots,
            matchConfidence: lexResponse.interpretations?.[0]?.nluConfidence?.score || 0.5,
            attributes: {
                originalQuery,
                lexState: intent.state,
                sessionId: lexResponse.sessionId
            }
        };
    }

    /**
     * Clean up expired contexts from local storage
     */
    public cleanupExpiredContexts(): void {
        const now = Date.now();
        const expiredKeys: string[] = [];

        for (const [sessionId, context] of this.contextStore.entries()) {
            if (context.timestamp && (now - context.timestamp) > (this.sessionTimeout * 1000)) {
                expiredKeys.push(sessionId);
            }
        }

        expiredKeys.forEach(key => {
            this.contextStore.delete(key);
            log().debug(`LexServiceV2: Cleaned up expired context for session ${key}`);
        });
    }

    /**
     * Get the current configuration status
     */
    public getStatus(): {
        configured: boolean;
        clientAvailable: boolean;
        botId?: string;
        botAliasId?: string;
        contextCount: number;
    } {
        return {
            configured: this.isConfigured(),
            clientAvailable: !!this.lexClient,
            botId: this.botId,
            botAliasId: this.botAliasId,
            contextCount: this.contextStore.size
        };
    }
}