/*! Copyright (c) 2020, XAPPmedia */
import { Storage, UserStorageService } from "stentor-models";
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { DynamoService } from '@xapp/dynamo-service/dist/service/DynamoService';
import {
    AWS_COLUMN_REGEX,
    TableService
} from '@xapp/dynamo-service/dist/service/TableService';
import { DynamoDB } from 'aws-sdk';

import { UserStorageRow, UserTableSchema } from "./UserStorageTableSchema";

export interface DynamoUserStorageProps {
    /**
     * Application ID
     * 
     * If none is provided, it will look for environment variable STUDIO_APP_ID
     */
    appId?: string;
    /**
     * Name of the AWS DynamoDB table
     * 
     * If none is provided, it will look for environment variable USER_STORAGE_TABLE
     */
    tableName?: string;
    /**
     * DynamoDB instance, optional.  If one isn't provided it will be created for you based on the provided table name.
     */
    dynamo?: DynamoDB | DynamoDB.DocumentClient;
}

/**
 * User storage service that uses with AWS DynamoDB.
 */
export class DynamoUserStorage implements UserStorageService {

    private readonly appId: string;

    private readonly service: TableService<UserStorageRow>;

    public constructor(props?: DynamoUserStorageProps) {

        let tableName: string = process.env.USER_STORAGE_TABLE;
        this.appId = process.env.STUDIO_APP_ID;

        if (props) {
            tableName = props.tableName;
            this.appId = props.appId ? props.appId : this.appId;
        }

        if (!tableName) {
            throw new Error(`Constructor property tableName or environment variable USER_STORAGE_TABLE is required for the DynamoUserStorage.`);
        }

        if (!this.appId) {
            throw new Error(`Constructor property appId or environment variable STUDIO_APP_ID is required for the DynamoUserStorage.`);
        }

        const dynamo = new DocumentClient();

        this.service = new TableService(tableName, new DynamoService(dynamo), UserTableSchema, {
            trimColumnsInGet: [AWS_COLUMN_REGEX],
            trimConstants: true,
            trimUnknown: false,
        });
    }

    public async create(userId: string, storage: Storage): Promise<Storage> {
        return this.service.put({
            ...storage,
            userId,
            appId: this.appId,
        });
    }

    public async get(userId: string): Promise<Storage | undefined> {
        return this.service.get({ userId, appId: this.appId });
    }

    public async update(userId: string, storage: Partial<Storage>): Promise<Storage> {
        return this.service.update({ userId, appId: this.appId }, { set: storage }, 'ALL_NEW');
    }
}

