/*! Copyright (c) 2019, XAPPmedia */
/* eslint-disable no-console */
import { Event } from "stentor-models";
import { randomString } from "stentor-utils";
import { AbstractEventStream } from "./AbstractEventStream";

// AWS SDK v3 only
import { KinesisClient, PutRecordsCommand } from "@aws-sdk/client-kinesis";

const globalKinesis = new KinesisClient({});

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
): any[] {
    return events.map(event => ({
        Data: JSON.stringify(event),
        PartitionKey: partitionGenerator()
    }));
}

export interface KinesisStreamProps {
    streamName: string;
    partitionKey?: string | PartitionKeyGenerator;
    kinesis?: KinesisClient;
}

export class KinesisStream extends AbstractEventStream {
    private readonly streamName: string;
    private readonly kinesis: KinesisClient;
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

    public async flushEvents(events: Event<any>[]): Promise<void> {
        console.time("Kinesis Flush");
        const StreamName = this.streamName;
        
        try {
            const records = generateRecords(events, this.partitionGenerator);
            
            const command = new PutRecordsCommand({ StreamName, Records: records });
            await this.kinesis.send(command);
            
            console.timeEnd("Kinesis Flush");
        } catch (e) {
            console.error("Error generating kinesis records.", e);
            throw e;
        }
    }
}


