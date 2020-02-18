/*! Copyright (c) 2019, XAPPmedia */
import {
    AbstractResponseBuilder,
    AppRuntimeData,
    Channel,
    Context,
    Device,
    Pii,
    PIIService,
    Request,
    SessionStore,
    Storage,
    UserDataRequestStatus,
    UserDataType,
    UserProfile,
    UserStorageService
} from "stentor-models";
import { hasSessionId, isInputUnknownRequest, PERMISSION_REQUEST_TYPE } from "stentor-request";
import { ResponseBuilder } from "stentor-response";
import { createSessionStore } from "stentor-storage";

export interface ContextFactoryServices {
    userStorageService: UserStorageService;
    piiService: PIIService;
}

export class ContextFactory {
    /**
     * Build context from the provided request.
     */
    public static async fromRequest(
        request: Request,
        requestBody: object,
        services: ContextFactoryServices,
        channel: Channel,
        appData?: AppRuntimeData
    ): Promise<Readonly<Context>> {
        const { userStorageService, piiService } = services;

        const device: Device = channel.capabilities(requestBody);

        const response: AbstractResponseBuilder<object> = channel.builder
            ? new channel.builder({ device, ...appData })
            : new ResponseBuilder({ device, ...appData });

        // Get the storage
        let storage: Storage = await userStorageService.get(request.userId);
        // Create it if it doesn't exist.
        if (!storage) {
            storage = await userStorageService.create(request.userId, {
                createdTimestamp: Date.now(),
                history: {
                    handler: []
                }
            });
        }

        // Quick maintenance on the storage
        if (!isInputUnknownRequest(request)) {
            // make sure it is reset
            // TODO: This kind of session related stuff will need to be moved to a storage
            // that only exists as long as the session does.
            // Wait on: https://xappmedia.myjetbrains.com/youtrack/issue/STENTOR-335
            storage.unknownInputs = 0;
        }
        // First time users might not have history on storage yet,
        // make sure it exists
        if (!storage.history) {
            storage.history = {
                handler: []
            };
        } else if (!Array.isArray(storage.history.handler)) {
            // make sure it has an array of handlers
            storage.history.handler = [];
        }

        // Pii
        let pii: Pii;

        if (piiService) {
            try {
                pii = await piiService.loadPii(storage.piiToken);
            } catch (e) {
                console.error("Cannot fetch initial PII record");
            }
        }

        // Take care of the session store. If doesn't exist or the session id doesn't match the stored one, create a new store.
        if (hasSessionId(request)) {
            if (!storage.sessionStore || storage.sessionStore.id !== request.sessionId) {
                storage.sessionStore = {
                    id: request.sessionId,
                    data: {}
                };
            }
        }

        const session: SessionStore = createSessionStore(storage);

        /**
         * This method is to request granted user profile data. We don't return it - we just say if AVAILABLE or not (or deferred)
         *
         * @param userDataType
         * @returns {Promise<any>}
         */
        const requestUserData = async (userDataType: UserDataType): Promise<UserDataRequestStatus> => {
            if (!pii) {
                throw new Error("You need a PII service to request user data");
            }

            if (ContextFactory.checkStorage(pii, userDataType)) {
                return Promise.resolve(UserDataRequestStatus.AVAILABLE);
            }

            // We ask it for now on both platforms
            if (userDataType === "PHONE_NUMBER") {
                return Promise.resolve(UserDataRequestStatus.NOT_AVAILABLE);
            }

            // Ask the Pii service first
            let userData = await services.piiService.redeem(userDataType, request.accessToken);

            // If the service didn't know, ask the response generator (platform specific connector)
            if (!userData || userData.requestStatus === UserDataRequestStatus.ERROR) {
                userData = await response.askForUserData(userDataType, request.apiAccess);
            }

            // Save it to pii
            if (userData.requestStatus === UserDataRequestStatus.AVAILABLE) {
                ContextFactory.updateProfile(pii, userData.userProfile);
            }

            return Promise.resolve(userData.requestStatus);
        };

        // If the request type is PERMISSION_GRANT then save what we got (it will happen for google only)
        if (request.type === PERMISSION_REQUEST_TYPE) {
            ContextFactory.updateProfile(pii, request.userProfile);
        }

        return {
            device,
            response,
            storage,
            session,
            requestUserData,
            pii
        };
    }

    private static checkStorage(pii: Pii, userDataType: UserDataType): boolean {
        let value;

        switch (userDataType) {
            case "EMAIL":
                value = pii.emailAddress;
                break;
            case "PHONE_NUMBER":
                value = pii.phoneNumber;
                break;
            case "NAME":
                value = pii.name;
                break;
            case "DEVICE_COARSE_LOCATION":
                value = pii.coarseLocation;
                break;
            case "DEVICE_PRECISE_LOCATION":
                value = pii.preciseLocation;
                break;
            case "LIST":
                throw new Error(`Lists are not in storage`);
            default:
                throw new Error(`Unknown user data type: ${userDataType}`);
        }

        if (value) {
            return true;
        }

        return false;
    }

    private static updateProfile(pii: Pii, userProfile: UserProfile): void {
        pii.emailAddress = pii.emailAddress || userProfile.email;
        pii.phoneNumber = pii.phoneNumber || userProfile.phone;
        pii.name = pii.name || userProfile.name;
        pii.preciseLocation = pii.preciseLocation || userProfile.preciseLocation;
        pii.coarseLocation = pii.coarseLocation || userProfile.coarseLocation;
    }
}
