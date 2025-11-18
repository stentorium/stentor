/*! Copyright (c) 2019, XAPPmedia */
import { PERMISSION_REQUEST_TYPE } from "stentor-constants";
import {
    AbstractResponseBuilder,
    AppRuntimeData,
    Channel,
    Context,
    CrmService,
    Device,
    ErrorService,
    Pii,
    PIIService,
    Request,
    SessionStore, SMSService,
    Storage,
    UserDataRequestStatus,
    UserDataType,
    UserProfile,
} from "stentor-models";

import { ResponseBuilder } from "stentor-response";

export interface ContextFactoryServices {
    piiService: PIIService;
    crmService?: CrmService;
    smsService?: SMSService;
    eventService?: ErrorService;
}

export class ContextFactory {
    /**
     * Build context from the provided request.
     *
     * @param request 
     * @param requestBody 
     * @param services 
     * @param channel - This field will disappear in the next major release.  It is only used to set the device field on the context.
     * @param appData 
     * @returns 
     */
    public static async fromRequest(
        request: Request,
        requestBody: object,
        storage: Storage,
        session: SessionStore,
        services: ContextFactoryServices,
        channel: Channel,
        appData?: AppRuntimeData
    ): Promise<Readonly<Context>> {
        const { piiService, crmService, eventService, smsService } = services;

        const device: Device = channel.capabilities(requestBody);

        const response: AbstractResponseBuilder<unknown> = channel.builder
            ? new channel.builder({ device, ...appData })
            : new ResponseBuilder({ device, ...appData });

        if (!request) {
            throw new TypeError(`Request is required when building context.`);
        }

        if (!request.userId) {
            throw new TypeError(`User ID on the request is required when building context.`);
        }

        if (!storage) {
            throw new TypeError(`Storage is required when building context.`);
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

            // Do we have it?
            if (ContextFactory.checkStorage(pii, userDataType)) {
                return Promise.resolve(UserDataRequestStatus.AVAILABLE);
            }

            // We ask it for now on both platforms - even anonymous users
            if (userDataType === "PHONE_NUMBER") {
                return Promise.resolve(UserDataRequestStatus.NOT_AVAILABLE);
            }

            // Guest - no pii info
            if (request.anonymous) {
                return Promise.resolve(UserDataRequestStatus.NOT_AVAILABLE);
            }

            // Rejected?
            if (request.type === PERMISSION_REQUEST_TYPE) {
                if (!request.granted) {
                    return Promise.resolve(UserDataRequestStatus.NOT_AVAILABLE);
                }
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
            pii,
            services: {
                crmService,
                smsService,
                eventService
            }
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
