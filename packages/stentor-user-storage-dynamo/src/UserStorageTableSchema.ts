/*! Copyright (c) 2020, XAPPmedia */
import { TableSchema } from '@xapp/dynamo-service/dist/service/KeySchema';
import { Storage} from "stentor-models";


export interface UserStorageRow extends Storage {
    userId: string;
    appId: string;
}

export type UserKey = Pick<Storage, 'userId' | 'appId'>;

export const UserTableSchema: TableSchema<Storage> = {
    userId: {
        type: 'S',
        primary: true,
    },
    appId: {
        type: 'S',
        sort: true,
    },
    createdTimestamp: {
        type: 'N',
        constant: true,
    },
    currentHandler: {
        type: 'M',
    },
    previousHandler: {
        type: 'M',
    },
    history: {
        type: 'M',
        attributes: {
            lastTrimmed: {
                type: 'N',
            },
            handler: {
                type: 'L',
            },
        },
    },
    sessionStore: {
        type: 'M',
        attributes: {
            data: {
                type: 'M',
            },
            id: {
                type: 'S',
            },
        },
    },
    unknownInputs: {
        type: 'N',
    }
};
