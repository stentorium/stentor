/*! Copyright (c) 2019, XAPPmedia */
import { Event } from "stentor-models";
import { AbstractEventStream } from "./AbstractEventStream";

// AWS SDK v3 only
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

// Default region can be overridden by AWS_DEFAULT_REGION or AWS_REGION environment variables
const defaultRegion = process.env.AWS_DEFAULT_REGION || process.env.AWS_REGION || "us-east-1";

const globalSNS = new SNSClient({ region: defaultRegion });

function eventsToString(events: Event<any>[]): Promise<string> {
    return Promise.resolve(JSON.stringify(events));
}

export class SNSStream extends AbstractEventStream {
    private readonly topicArn: string;
    private readonly sns: SNSClient;

    public constructor(topicArn: string, sns: SNSClient = globalSNS) {
        super();
        this.topicArn = topicArn;
        this.sns = sns;
    }

    public async flushEvents(events: Event<any>[]): Promise<void> {
        try {
            const Message = await eventsToString(events);
            
            const command = new PublishCommand({ TopicArn: this.topicArn, Message });
            await this.sns.send(command);
        } catch (e) {
            console.error("Error converting events to a string.", e);
            throw e;
        }
    }
}


