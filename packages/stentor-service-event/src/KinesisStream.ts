/*! Copyright (c) 2019, XAPPmedia */
/* eslint-disable no-console */
import { Event } from "stentor-models";
import { randomString } from "stentor-utils";
import { AbstractEventStream } from "./AbstractEventStream";

// Try AWS SDK v3 first, fallback to v2
let KinesisClient: any;
let PutRecordsCommand: any;
let Kinesis: any;
let globalKinesis: any;

try {
    // AWS SDK v3
    const kinesisV3 = require("@aws-sdk/client-kinesis");
    KinesisClient = kinesisV3.KinesisClient;
    PutRecordsCommand = kinesisV3.PutRecordsCommand;
    globalKinesis = new KinesisClient({});
} catch {
    // AWS SDK v2 fallback
    const awsSdk = require("aws-sdk");
    Kinesis = awsSdk.Kinesis;
    globalKinesis = new Kinesis({ apiVersion: "2013-12-02" });
}

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
    kinesis?: any; // Accept both v2 Kinesis and v3 KinesisClient
}

export class KinesisStream extends AbstractEventStream {
    private readonly streamName: string;
    private readonly kinesis: any; // Can be either v2 Kinesis or v3 KinesisClient
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
            
            if (PutRecordsCommand) {
                // AWS SDK v3
                const command = new PutRecordsCommand({ StreamName, Records: records });
                await this.kinesis.send(command);
            } else {
                // AWS SDK v2
                await this.kinesis.putRecords({ StreamName, Records: records }).promise();
            }
            
            console.timeEnd("Kinesis Flush");
        } catch (e) {
            console.error("Error generating kinesis records.", e);
            throw e;
        }
    }
}


