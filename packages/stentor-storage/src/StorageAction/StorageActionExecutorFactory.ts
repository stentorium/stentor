/*! Copyright (c) 2019, XAPPmedia */
import { StorageAction, StorageActionExecutor } from "stentor-models";
import { STORAGE_ACTION_ADD, STORAGE_ACTION_SET, STORAGE_ACTION_SUBTRACT } from "./Constants";
import { add } from "./StorageActionExecutorAdd";
import { set } from "./StorageActionExecutorSet";
import { subtract } from "./StorageActionExecutorSubtract";

export class StorageActionExecutorFactory {
    /**
     * Returns a StorageActionExecutor for the provided StorageAction
     *
     * @param {StorageAction} action
     * @returns {StorageActionExecutor}
     */
    public executorForAction(action: StorageAction): StorageActionExecutor {
        if (!action) {
            throw new Error(`Unable to determine executor.  Undefined was passed for the action.`);
        }

        let executor: StorageActionExecutor;

        const actionType = action.type;

        switch (actionType) {
            case STORAGE_ACTION_SUBTRACT:
                executor = subtract;
                break;
            case STORAGE_ACTION_ADD:
                executor = add;
                break;
            case STORAGE_ACTION_SET:
                executor = set;
                break;
            default:
                throw new Error(`Unsupported storage action ${actionType}`);
        }

        return executor;
    }
}
