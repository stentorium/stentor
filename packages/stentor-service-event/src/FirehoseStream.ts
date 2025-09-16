/*! Copyright (c) 2019, XAPPmedia */
import { Event } from "stentor-models";
import { AbstractEventStream } from "./AbstractEventStream";

// Try AWS SDK v3 first, fallback to v2
let FirehoseClient: any;
let PutRecordBatchCommand: any;
let Firehose: any;
let globalFirehouse: any;

try {
    // AWS SDK v3
    const firehoseV3 = require("@aws-sdk/client-firehose");
    FirehoseClient = firehoseV3.FirehoseClient;
    PutRecordBatchCommand = firehoseV3.PutRecordBatchCommand;
    globalFirehouse = new FirehoseClient({});
} catch {
    // AWS SDK v2 fallback
    const awsSdk = require("aws-sdk");
    Firehose = awsSdk.Firehose;
    globalFirehouse = new Firehose({ apiVersion: "2015-08-04" });
}

function generateRecords(events: Event<any>[] = []): Promise<any[]> {
    return new Promise((resolve) => {
        resolve(
            events.map(
                (event): any => {
                    return {
                        Data: JSON.stringify(event)
                    };
                }
            )
        );
    });
}

function validateRecords(events: Event<any>[] = []): Promise<Event<any>[]> {

    return new Promise((resolve, reject) => {
        events.forEach((event) => {
            // We require appId, platform, channel, type
            if (!event.appId) {
                reject(new Error(`appId is required to send an event to the Firehose event stream.`));
            }

            if (!event.platform) {
                reject(new Error(`platform is required to send an event to the Firehose event stream.`));
            }

            if (!event.channel) {
                reject(new Error(`channel is required to send an event to the Firehose event stream.`));
            }

            if (!event.type) {
                reject(new Error(`type is required to send an event to the Firehose event stream.`))
            }
        });

        resolve(events);
    });

}

export class FirehoseStream extends AbstractEventStream {
    private readonly deliveryStreamName: string;
    private readonly firehose: any; // Can be either v2 Firehose or v3 FirehoseClient

    public constructor(deliveryStreamName: string, injectedFirehouse: any = globalFirehouse) {
        super();
        this.deliveryStreamName = deliveryStreamName;
        this.firehose = injectedFirehouse;
    }

    public async flushEvents(events: Event<any>[]): Promise<void> {
        try {
            const validatedEvents = await validateRecords(events);
            const records = await generateRecords(validatedEvents);
            
            if (PutRecordBatchCommand) {
                // AWS SDK v3
                const command = new PutRecordBatchCommand({
                    DeliveryStreamName: this.deliveryStreamName,
                    Records: records
                });
                await this.firehose.send(command);
            } else {
                // AWS SDK v2
                await this.firehose
                    .putRecordBatch({
                        DeliveryStreamName: this.deliveryStreamName,
                        Records: records
                    })
                    .promise();
            }
        } catch (e) {
            console.error("Error generating records.");
            console.error(e);
            throw e;
        }
    }
}


