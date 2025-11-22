/*! Copyright (c) 2019, XAPPmedia */
import { hasSessionId } from "stentor-guards";
import { log } from "stentor-logger";
import { AbstractResponseBuilder, Channel, Device, NLUService, Request, Storage } from "stentor-models";
import { existsAndNotEmpty } from "stentor-utils";

import { DEFAULT_DEVICE, STENTOR_PLATFORM } from "./Constants";
import { isDeviceable, isStentorRequest } from "./Guards";
import { TranslateStentorRequest, TranslateStentorResponse } from "./Translators";

/**
 * Returns the capabilities of the device.
 *
 * If the request coming in has a device key, it will return that as the device capabilities otherwise
 * it defaults to a web based chat widget.
 * @param body
 * @returns
 */
export function capabilities(body: Record<string, unknown>): Device {
  if (isDeviceable(body)) {
    return body.device;
  }

  return DEFAULT_DEVICE;
}

export const STENTOR_CHANNEL: Channel = {
  name: STENTOR_PLATFORM,
  test: isStentorRequest,
  request: new TranslateStentorRequest(),
  response: new TranslateStentorResponse(),
  capabilities,
};

export function Stentor(nlu?: NLUService): Channel {
  const channel: Channel = {
    ...STENTOR_CHANNEL,
    nlu,
  };

  if (!!nlu && typeof nlu.setContext === "function") {
    // Add the preResponseTranslationHook
    log().debug(`Adding preResponseTranslation hook for setting context`);
    const preResponseTranslation = async (
      request: Request,
      response: AbstractResponseBuilder,
      storage: Storage
    ): Promise<{ request: Request; response: AbstractResponseBuilder; storage: Storage }> => {
      if (hasSessionId(request)) {
        const resp = response.response;
        const sessionId = request.sessionId;

        if (existsAndNotEmpty(resp.context?.active) && typeof nlu?.setContext === "function") {
          const debug: string = resp.context.active.reduce((prev, current) => {
            return `${prev}\n${current.name} turns: ${current.timeToLive.turnsToLive}`;
          }, "");
          log().debug(`Sending active context for session ${sessionId}: ${debug}`);

          try {
            await nlu.setContext({
              userId: request.userId,
              sessionId,
              activeContext: resp.context?.active,
            });
          } catch (e) {
            const errorDetails = {
              message: 'Error setting context',
              userId: request.userId,
              sessionId: sessionId,
              nluService: nlu.constructor?.name || 'Unknown',
              platform: request.platform,
              requestType: request.type,
              activeContextCount: resp.context?.active?.length || 0,
              error: e instanceof Error ? {
                message: e.message,
                name: e.name,
                stack: e.stack
              } : e
            };
            
            log().error('Context setting failed', errorDetails);
            
            // Log active context details for debugging (but not in production to avoid noise)
            if (process.env.NODE_ENV !== 'production') {
              log().debug(`Active Context Details: ${JSON.stringify(resp.context?.active, null, 2)}`);
            }
          }
        }
      }

      return { request, response, storage };
    };

    channel.hooks = {
      preResponseTranslation,
    };
  }

  return channel;
}
