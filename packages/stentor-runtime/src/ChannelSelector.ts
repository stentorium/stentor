/*! Copyright (c) 2019, XAPPmedia */
import { Channel, RuntimeContext } from "stentor-models";
import { existsAndNotEmpty, uniq } from "stentor-utils";

export class ChannelSelector {
    /**
     * Selects a channel from one of the provided based on the request body and infrastructure context.
     *
     * @param channels Array of possible channels
     * @param request The request body.
     * @param lambdaContext
     */
    public from(channels: Channel[], request: object, lambdaContext?: RuntimeContext): Channel {
        if (!existsAndNotEmpty(channels)) {
            throw new TypeError(
                "Invalid properties passed to ChannelSelector.from().  The channels were either undefined or empty."
            );
        }

        if (typeof request !== "object") {
            throw new TypeError(
                "Invalid properties passed to ChannelSelector.from().  The request was either undefined or not an object."
            );
        }

        let platform: string;

        if (lambdaContext) {
            platform = lambdaContext.ovai ? lambdaContext.ovai.platform : undefined;
            if (lambdaContext.studio) {
                // override the deprecated if it exists
                platform = lambdaContext.studio ? lambdaContext.studio.platform : platform;
            }
        }

        let possibleChannels: Channel[] = [];

        channels.forEach(channel => {
            // First try the platform string
            if (typeof channel.name === "string") {
                if (platform === channel.name) {
                    possibleChannels.push(channel);
                }
            }
            // Next, try the test function
            if (typeof channel.test === "function") {
                if (channel.test(request)) {
                    possibleChannels.push(channel);
                }
            }
        });

        // dedupe.
        possibleChannels = uniq(possibleChannels);

        if (possibleChannels.length === 0) {
            let errorMessage = `Unable to select channel.`;

            const requestKeys = Object.keys(request);
            if (requestKeys.length > 0) {
                errorMessage += `  Request contains the top level keys: ${requestKeys}.`;
            }

            if (platform) {
                errorMessage += `  Estimated channel from context: "${platform}".`;
            }

            throw new Error(errorMessage);
        }

        // If we have more than one match, throw an error.
        if (possibleChannels.length > 1) {
            const matches: string = possibleChannels.reduce((accumulator, current, index) => {
                return index === 0 ? `${current.name}` : `${accumulator}, ${current.name}`;
            }, "");
            throw new Error(`Request matched to more than one possible channel: ${matches}`);
        }

        return possibleChannels[0];
    }
}
