/*! Copyright (c) 2019, XAPPmedia */
import { Event } from "stentor-models";
import { SNS } from "aws-sdk";
import { AbstractEventStream } from "./AbstractEventStream";

const globalSNS: SNS = new SNS({ apiVersion: "2010-03-31", region: "us-east-1" });

function eventsToString(events: Event<any>[]): Promise<string> {
    return new Promise((resolve) => {
        resolve(JSON.stringify(events));
    });
}

export class SNSStream extends AbstractEventStream {
    private readonly topicArn: string;
    private readonly sns: SNS;

    public constructor(topicArn: string, sns: SNS = globalSNS) {
        super();
        this.topicArn = topicArn;
        this.sns = sns;
    }

    public flushEvents(events: Event<any>[]): Promise<void> {
        return eventsToString(events)
            .catch(e => {
                console.error("Error converting events to a string.");
                console.error(e);
                throw e;
            })
            .then((Message: string) => {
                return this.sns.publish({ TopicArn: this.topicArn, Message }).promise();
            })
            .then(() => {
                return;
            });
    }
}


