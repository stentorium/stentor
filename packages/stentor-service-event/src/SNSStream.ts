/*! Copyright (c) 2019, XAPPmedia */
import { Event } from "stentor-models";
import { AbstractEventStream } from "./AbstractEventStream";

// Try AWS SDK v3 first, fallback to v2
let SNSClient: any;
let PublishCommand: any;
let SNS: any;
let globalSNS: any;

try {
    // AWS SDK v3
    const snsV3 = require("@aws-sdk/client-sns");
    SNSClient = snsV3.SNSClient;
    PublishCommand = snsV3.PublishCommand;
    globalSNS = new SNSClient({ region: "us-east-1" });
} catch {
    // AWS SDK v2 fallback
    const awsSdk = require("aws-sdk");
    SNS = awsSdk.SNS;
    globalSNS = new SNS({ apiVersion: "2010-03-31", region: "us-east-1" });
}

function eventsToString(events: Event<any>[]): Promise<string> {
    return new Promise((resolve) => {
        resolve(JSON.stringify(events));
    });
}

export class SNSStream extends AbstractEventStream {
    private readonly topicArn: string;
    private readonly sns: any; // Can be either v2 SNS or v3 SNSClient

    public constructor(topicArn: string, sns: any = globalSNS) {
        super();
        this.topicArn = topicArn;
        this.sns = sns;
    }

    public async flushEvents(events: Event<any>[]): Promise<void> {
        try {
            const Message = await eventsToString(events);
            
            if (PublishCommand) {
                // AWS SDK v3
                const command = new PublishCommand({ TopicArn: this.topicArn, Message });
                await this.sns.send(command);
            } else {
                // AWS SDK v2
                await this.sns.publish({ TopicArn: this.topicArn, Message }).promise();
            }
        } catch (e) {
            console.error("Error converting events to a string.");
            console.error(e);
            throw e;
        }
    }
}


