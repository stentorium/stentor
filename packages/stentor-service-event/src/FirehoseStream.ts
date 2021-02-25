/*! Copyright (c) 2019, XAPPmedia */
import { Event } from "stentor-models";
import { Firehose } from "aws-sdk";
import { AbstractEventStream } from "./AbstractEventStream";

const globalFirehouse = new Firehose({ apiVersion: "2015-08-04" });

function generateRecords(events: Event<any>[] = []): Promise<Firehose.Record[]> {
    return new Promise((resolve) => {
        resolve(
            events.map(
                (event): Firehose.Record => {
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
    private readonly firehose: Firehose;

    public constructor(deliveryStreamName: string, injectedFirehouse: Firehose = globalFirehouse) {
        super();
        this.deliveryStreamName = deliveryStreamName;
        this.firehose = injectedFirehouse;
    }

    public flushEvents(events: Event<any>[]): Promise<void> {
        return validateRecords(events).then((events) => {
            return generateRecords(events);
        }).catch(e => {
            console.error("Error generating records.");
            console.error(e);
            throw e;
        }).then((Records: Firehose.Record[]) => {
            return this.firehose
                .putRecordBatch({
                    DeliveryStreamName: this.deliveryStreamName,
                    Records
                })
                .promise();
        }).then((): void => { return; }); // It returns Void according to interface;
    }
}


