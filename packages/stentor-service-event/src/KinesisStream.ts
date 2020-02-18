/*! Copyright (c) 2019, XAPPmedia */
/* eslint-disable no-console */
import { Event } from "stentor-models";
import { randomString } from "stentor-utils";
import { Kinesis } from "aws-sdk";
import { AbstractEventStream } from "./AbstractEventStream";

const globalKinesis = new Kinesis({ apiVersion: "2013-12-02" });

export type PartitionKeyGenerator = () => string;

export function staticPartitionGenerator(partition: string): PartitionKeyGenerator {
    return (): string => partition;
}

export function randomPartitionKeyGenerator(stringSize = 5): PartitionKeyGenerator {
    return (): string => randomString(stringSize);
}

function generateRecords(
    events: Event<any>[] = [],
    partitionGenerator: PartitionKeyGenerator = randomPartitionKeyGenerator()
): Kinesis.PutRecordsRequestEntry[] {
    return events.map(event => ({
        Data: JSON.stringify(event),
        PartitionKey: partitionGenerator()
    }));
}

export interface KinesisStreamProps {
    streamName: string;
    partitionKey?: string | PartitionKeyGenerator;
    kinesis?: Kinesis;
}

export class KinesisStream extends AbstractEventStream {
    private readonly streamName: string;
    private readonly kinesis: Kinesis;
    private readonly partitionGenerator: PartitionKeyGenerator;

    public constructor(props: KinesisStreamProps) {
        super();
        if (!props.streamName) {
            throw new Error("Stream name must be provided for Kinesis event streaming.");
        }
        this.streamName = props.streamName;
        this.kinesis = props.kinesis || globalKinesis;
        if (props.partitionKey) {
            if (typeof props.partitionKey === "string") {
                this.partitionGenerator = staticPartitionGenerator(props.partitionKey);
            } else {
                this.partitionGenerator = props.partitionKey;
            }
        }
    }

    public flushEvents(events: Event<any>[]): Promise<void> {
        console.time("Kinesis Flush");
        const StreamName = this.streamName;
        return Promise.resolve(events)
            .then(events => generateRecords(events, this.partitionGenerator))
            .then(Records => this.kinesis.putRecords({ StreamName, Records }).promise())
            .catch(e => {
                console.error("Error generating kinesis records.", e);
                throw e;
            })
            .then(() => console.timeEnd("Kinesis Flush"));
    }
}


