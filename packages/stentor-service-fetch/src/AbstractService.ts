/*! Copyright (c) 2019, XAPPmedia */
import { BaseService } from "stentor-models";

/**
 * Abstract service
 *
 */
export abstract class AbstractService implements BaseService {
    readonly timeout: number = 1000;
    readonly retryAttempts: number = 0;
    readonly logs: boolean = false;

    public constructor(props?: BaseService) {
        if (props) {
            this.timeout = props.timeout !== undefined ? props.timeout : this.timeout;
            this.retryAttempts = props.retryAttempts !== undefined ? props.retryAttempts : this.retryAttempts;
            this.logs = typeof props.logs === "boolean" ? props.logs : this.logs;
        }
    }
}
