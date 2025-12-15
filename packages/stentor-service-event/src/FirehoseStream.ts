/*! Copyright (c) 2019, XAPPmedia */
import { Event } from "stentor-models";
import { AbstractEventStream } from "./AbstractEventStream";

// AWS SDK v3 only
import { FirehoseClient, PutRecordBatchCommand } from "@aws-sdk/client-firehose";

const globalFirehose = new FirehoseClient({});

function generateRecords(events: Event<any>[] = []): Promise<any[]> {
    return Promise.resolve(
        events.map(
            (event): any => {
                return {
                    Data: JSON.stringify(event)
                };
            }
        )
    );
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
    private readonly firehose: FirehoseClient;

    public constructor(deliveryStreamName: string, injectedFirehose: FirehoseClient = globalFirehose) {
        super();
        this.deliveryStreamName = deliveryStreamName;
        this.firehose = injectedFirehose;
    }

    public async flushEvents(events: Event<any>[]): Promise<void> {
        try {
            const validatedEvents = await validateRecords(events);
            const records = await generateRecords(validatedEvents);
            
            const command = new PutRecordBatchCommand({
                DeliveryStreamName: this.deliveryStreamName,
                Records: records
            });
            await this.firehose.send(command);
        } catch (e) {
            console.error("Error generating records.", e);
            throw e;
        }
    }
}


