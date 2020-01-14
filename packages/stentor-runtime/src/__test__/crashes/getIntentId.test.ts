/*! Copyright (c) 2019, XAPPmedia */
import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";

import { Alexa } from "@xapp/stentor-alexa";
import { ConversationHandler } from "@xapp/stentor-handler";
import { HandlerFactory } from "stentor-handler-factory";
import { HandlerService, RuntimeContext, Storage, UserStorageService } from "stentor-models";
import { StubDocumentClient } from "@xapp/stentor-service-dynamo";
import { DynamoHandlerService } from "@xapp/stentor-service-handler";
import { DynamoUserStorageService } from "@xapp/stentor-service-user-storage";

import { main } from "../../index";

chai.use(sinonChai);
const expect = chai.expect;

const applicationId = "applicationId";

// Request
const request: any = {
    version: "1.0",
    session: {
        new: true,
        sessionId: "amzn1.echo-api.session.2ee1aeab-8550-4dc6-8094-9bb1a19d1cf9",
        application: {
            applicationId
        },
        user: {
            userId:
                "amzn1.ask.account.AETBWB7WH7GJBTQLFYMHXLVXT2JXQIOJAMSQNS76GS533V6N5VIBRP5W7HI5PCQOLCN54U7OZMYNXE4EOVAF2DLF3WAJ2VZB56IIJ6NYGYI7J4VQBCDGOBK6XJTTY4AQZUHL3TPQPZ7VGITZASKJIPLIYRPA6T2WDM5T7NYVVWOKHAWNJJUP6VUAGI53EEMUXTB7CIJWFQGAGLQ"
        }
    },
    context: {
        AudioPlayer: {
            playerActivity: "STOPPED"
        },
        System: {
            application: {
                applicationId
            },
            user: {
                userId:
                    "amzn1.ask.account.AETBWB7WH7GJBTQLFYMHXLVXT2JXQIOJAMSQNS76GS533V6N5VIBRP5W7HI5PCQOLCN54U7OZMYNXE4EOVAF2DLF3WAJ2VZB56IIJ6NYGYI7J4VQBCDGOBK6XJTTY4AQZUHL3TPQPZ7VGITZASKJIPLIYRPA6T2WDM5T7NYVVWOKHAWNJJUP6VUAGI53EEMUXTB7CIJWFQGAGLQ"
            },
            device: {
                deviceId:
                    "amzn1.ask.device.AGV2KNFLBPSY45H6IUOLQUT64HV3ZKJ5LFSZTNXEUR5LCEIRWGQ5SQQQEAGZGBZQYT3MWEVI6U2KSVXJX7DFZOZWPP7HFVK6P56R2SJZ4DCUSBIY6AI5ZPAU5GCFIUUC3XIHGVZEH2VSAMRZYKF57ZNLE4VA"
            },
            apiEndpoint: "https://api.amazonalexa.com",
            apiAccessToken:
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjEifQ.eyJhdWQiOiJodHRwczovL2FwaS5hbWF6b25hbGV4YS5jb20iLCJpc3MiOiJBbGV4YVNraWxsS2l0Iiwic3ViIjoiYW16bjEuYXNrLnNraWxsLmFlZTliZmI3LTBlMzItNDI1ZS1iMGVmLTA5NGNjYjBjMWZlZiIsImV4cCI6MTUyMDUyNzAxMCwiaWF0IjoxNTIwNTIzNDEwLCJuYmYiOjE1MjA1MjM0MTAsInByaXZhdGVDbGFpbXMiOnsiY29uc2VudFRva2VuIjpudWxsLCJkZXZpY2VJZCI6ImFtem4xLmFzay5kZXZpY2UuQUdWMktORkxCUFNZNDVINklVT0xRVVQ2NEhWM1pLSjVMRlNaVE5YRVVSNUxDRUlSV0dRNVNRUVFFQUdaR0JaUVlUM01XRVZJNlUyS1NWWEpYN0RGWk9aV1BQN0hGVks2UDU2UjJTSlo0RENVU0JJWTZBSTVaUEFVNUdDRklVVUMzWElIR1ZaRUgyVlNBTVJaWUtGNTdaTkxFNFZBIiwidXNlcklkIjoiYW16bjEuYXNrLmFjY291bnQuQUVUQldCN1dIN0dKQlRRTEZZTUhYTFZYVDJKWFFJT0pBTVNRTlM3NkdTNTMzVjZONVZJQlJQNVc3SEk1UENRT0xDTjU0VTdPWk1ZTlhFNEVPVkFGMkRMRjNXQUoyVlpCNTZJSUo2TllHWUk3SjRWUUJDREdPQks2WEpUVFk0QVFaVUhMM1RQUVBaN1ZHSVRaQVNLSklQTElZUlBBNlQyV0RNNVQ3TllWVldPS0hBV05KSlVQNlZVQUdJNTNFRU1VWFRCN0NJSldGUUdBR0xRIn19.NuMpBEZcuZfGHK8BYawHISwzFtboZ7afE6nMxG6k6drkh0lKd7fEhNRxbdhnDQiZ6MJsCgpu_vBHkSCPMECza8nvNmBkivH-phfOij94etabWji8mJ9ah9OiNGqtNSRFRfvpTy6inPXzT5fOIw6F-9y9PCnm9018DhcM8dEQ4hJ6KPr40IeXSw1TTqCd-2eAjf76gSSzZl8NPuXYgDl2Ja0D0yrsO_UIFMbpeCU2fVGhBfdOjIUGjHUKUkiLcZL5zs_UhOJdeWUs2R3xlC68ZZwYva7B_1Xu0EUbGYuH0TX8kjYRboAF9D1wSvxX__JnhY5gKH1AY82-LZWVvgH8uw"
        }
    },
    request: {
        type: "LaunchRequest",
        requestId: "amzn1.echo-api.request.299fb5f8-83a8-41b4-b435-43c32f2ede53",
        timestamp: "2018-03-08T15:36:50Z",
        locale: "en-US",
        target: {
            path: "",
            address: "amzn1.ask.skill.aee9bfb7-0e32-425e-b0ef-094ccb0c1fef"
        },
        metadata: {
            referrer: "amzn1.alexa-speechlet-client.DOMAIN:A2S"
        },
        targetURI: "alexa://amzn1.ask.skill.aee9bfb7-0e32-425e-b0ef-094ccb0c1fef/"
    }
};

// this simulates a brand new storage.
const storage: Storage = undefined;

const handlerDBRow: any = {
    action: [],
    appId: "sports-championship-week",
    content: {
        CancelIntent: [
            {
                outputSpeech: "<speak>Goodbye</speak>"
            }
        ],
        HelpIntent: [
            {
                outputSpeech: "<speak>During playback, you can either pause or resume</speak>",
                reprompt: "<speak>During playback, you can either pause or resume</speak>"
            }
        ]
    },
    createdAt: "2018-02-26T16:13:28.259Z",
    data: {},
    exitData: [],
    helpData: [],
    intentId: "LaunchRequest",
    langCode: "en-US",
    name: "Intro",
    organizationId: "SPORTS",
    responseData: [
        {
            name: "No Live Games",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_no+live%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Reprompt_no+live%2C+highlights%2C+schedule+3-11.mp3'/></speak>"
        },
        {
            name: "Intro Live Games - Big South",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Repromt_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            schedule: {
                duration: {
                    amount: "195",
                    format: "minutes"
                },
                start: {
                    format: "YYYY-MM-DD HH:mm",
                    time: "2018-03-04 12:45",
                    timeZone: "America/New_York"
                }
            }
        },
        {
            name: "Intro Live Games -A Sun",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Repromt_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            schedule: {
                duration: {
                    amount: "195",
                    format: "minutes"
                },
                start: {
                    format: "YYYY-MM-DD HH:mm",
                    time: "2018-03-04 14:45",
                    timeZone: "America/New_York"
                }
            }
        },
        {
            name: "Intro Live Games - Pac 12 Women's",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Repromt_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            schedule: {
                duration: {
                    amount: "195",
                    format: "minutes"
                },
                start: {
                    format: "YYYY-MM-DD HH:mm",
                    time: "2018-03-04 20:45",
                    timeZone: "America/New_York"
                }
            }
        },
        {
            name: "Intro Live Games - MAAC",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Repromt_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            schedule: {
                duration: {
                    amount: "195",
                    format: "minutes"
                },
                start: {
                    format: "YYYY-MM-DD HH:mm",
                    time: "2018-03-05 18:45",
                    timeZone: "America/New_York"
                }
            }
        },
        {
            name: "Intro Live Games - SoCon",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Repromt_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            schedule: {
                duration: {
                    amount: "195",
                    format: "minutes"
                },
                start: {
                    format: "YYYY-MM-DD HH:mm",
                    time: "2018-03-05 20:45",
                    timeZone: "America/New_York"
                }
            }
        },
        {
            name: "Intro Live Games - Big East Women",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Repromt_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            schedule: {
                duration: {
                    amount: "195",
                    format: "minutes"
                },
                start: {
                    format: "YYYY-MM-DD HH:mm",
                    time: "2018-03-06 18:45",
                    timeZone: "America/New_York"
                }
            }
        },
        {
            name: "Intro Live Games - CAA",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Repromt_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            schedule: {
                duration: {
                    amount: "195",
                    format: "minutes"
                },
                start: {
                    format: "YYYY-MM-DD HH:mm",
                    time: "2018-03-06 18:45",
                    timeZone: "America/New_York"
                }
            }
        },
        {
            name: "Intro Live Games - West Coast",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Repromt_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            schedule: {
                duration: {
                    amount: "195",
                    format: "minutes"
                },
                start: {
                    format: "YYYY-MM-DD HH:mm",
                    time: "2018-03-06 20:45",
                    timeZone: "America/New_York"
                }
            }
        },
        {
            name: "Intro Live Games - Patriot",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Repromt_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            schedule: {
                duration: {
                    amount: "195",
                    format: "minutes"
                },
                start: {
                    format: "YYYY-MM-DD HH:mm",
                    time: "2018-03-07 19:15",
                    timeZone: "America/New_York"
                }
            }
        },
        {
            name: "Intro Live Games - Big East Semifinals",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Repromt_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            schedule: {
                duration: {
                    amount: "375",
                    format: "minutes"
                },
                start: {
                    format: "YYYY-MM-DD HH:mm",
                    time: "2018-03-09 18:15",
                    timeZone: "America/New_York"
                }
            }
        },
        {
            name: "Intro Live Games - Pac 12 Semfinals",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Repromt_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            schedule: {
                duration: {
                    amount: "375",
                    format: "minutes"
                },
                start: {
                    format: "YYYY-MM-DD HH:mm",
                    time: "2018-03-09 20:45",
                    timeZone: "America/New_York"
                }
            }
        },
        {
            name: "Intro Live Games - America East",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Repromt_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            schedule: {
                duration: {
                    amount: "195",
                    format: "minutes"
                },
                start: {
                    format: "YYYY-MM-DD HH:mm",
                    time: "2018-03-10 10:45",
                    timeZone: "America/New_York"
                }
            }
        },
        {
            name: "Intro Live Games - Ivy League Semis",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Repromt_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            schedule: {
                duration: {
                    amount: "375",
                    format: "minutes"
                },
                start: {
                    format: "YYYY-MM-DD HH:mm",
                    time: "2018-03-10 12:15",
                    timeZone: "America/New_York"
                }
            }
        },
        {
            name: "Intro Live Games - SEC Semis",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Repromt_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            schedule: {
                duration: {
                    amount: "375",
                    format: "minutes"
                },
                start: {
                    format: "YYYY-MM-DD HH:mm",
                    time: "2018-03-10 12:45",
                    timeZone: "America/New_York"
                }
            }
        },
        {
            name: "Intro Live Games - Big East",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Repromt_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            schedule: {
                duration: {
                    amount: "195",
                    format: "minutes"
                },
                start: {
                    format: "YYYY-MM-DD HH:mm",
                    time: "2018-03-10 18:15",
                    timeZone: "America/New_York"
                }
            }
        },
        {
            name: "Intro Live Games - Big Sky",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Repromt_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            schedule: {
                duration: {
                    amount: "195",
                    format: "minutes"
                },
                start: {
                    format: "YYYY-MM-DD HH:mm",
                    time: "2018-03-10 19:45",
                    timeZone: "America/New_York"
                }
            }
        },
        {
            name: "Intro Live Games - Pac 12 Final",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Repromt_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            schedule: {
                duration: {
                    amount: "195",
                    format: "minutes"
                },
                start: {
                    format: "YYYY-MM-DD HH:mm",
                    time: "2018-03-10 21:45",
                    timeZone: "America/New_York"
                }
            }
        },
        {
            name: "Intro Live Games - Big West",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Repromt_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            schedule: {
                duration: {
                    amount: "195",
                    format: "minutes"
                },
                start: {
                    format: "YYYY-MM-DD HH:mm",
                    time: "2018-03-10 23:45",
                    timeZone: "America/New_York"
                }
            }
        },
        {
            name: "Intro Live Games - Ivy League Final",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Repromt_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            schedule: {
                duration: {
                    amount: "195",
                    format: "minutes"
                },
                start: {
                    format: "YYYY-MM-DD HH:mm",
                    time: "2018-03-11 11:45",
                    timeZone: "America/New_York"
                }
            }
        },
        {
            name: "Intro Live Games - SEC Final",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Repromt_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            schedule: {
                duration: {
                    amount: "195",
                    format: "minutes"
                },
                start: {
                    format: "YYYY-MM-DD HH:mm",
                    time: "2018-03-11 12:45",
                    timeZone: "America/New_York"
                }
            }
        },
        {
            name: "Intro Live Games - American Final",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Repromt_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            schedule: {
                duration: {
                    amount: "195",
                    format: "minutes"
                },
                start: {
                    format: "YYYY-MM-DD HH:mm",
                    time: "2018-03-11 14:45",
                    timeZone: "America/New_York"
                }
            }
        },
        {
            name: "Intro Live Games - Ivy League Women's",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Repromt_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            schedule: {
                duration: {
                    amount: "195",
                    format: "minutes"
                },
                start: {
                    format: "YYYY-MM-DD HH:mm",
                    time: "2018-03-11 15:45",
                    timeZone: "America/New_York"
                }
            }
        },
        {
            name: "Intro Live Games - Selection Sunday",
            outputSpeech:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            reprompt:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Repromt_live+basketball%2C+highlights%2C+schedule+3-11.mp3'/></speak>",
            schedule: {
                duration: {
                    amount: "180",
                    format: "minutes"
                },
                start: {
                    format: "YYYY-MM-DD HH:mm",
                    time: "2018-03-11 18:00",
                    timeZone: "America/New_York"
                }
            }
        }
    ],
    slots: [],
    slotTypes: {},
    type: "HandlerIntent",
    utterancePatterns: []
};

// expected response?
const expectedResponse: any = {
    version: "1.0",
    response: {
        shouldEndSession: false,
        outputSpeech: {
            type: "SSML",
            ssml:
                "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Intro_no+live%2C+highlights%2C+schedule+3-11.mp3'/></speak>"
        },
        reprompt: {
            outputSpeech: {
                type: "SSML",
                ssml:
                    "<speak><audio src='https://s3.amazonaws.com/xapp-files/Voice+Apps/Westwood+One/Olympics+Interim+and+Championship+Week+Audio/2%3A24-3%3A4/Reprompt_no+live%2C+highlights%2C+schedule+3-11.mp3'/></speak>"
            }
        }
    },
    sessionAttributes: {}
};

describe("getIntentId crash", () => {
    let requestBody: any;
    let callbackSpy: sinon.SinonSpy;
    let fakeContext: RuntimeContext;

    let handlerFactory: HandlerFactory;
    let handlerService: HandlerService;
    let userStorageService: UserStorageService;

    let clock: sinon.SinonFakeTimers;

    beforeEach(() => {
        // Set the current time to the one in the request
        const date = new Date("2018-03-08T15:36:50Z");
        clock = sinon.useFakeTimers(date.getTime());

        requestBody = request;

        callbackSpy = sinon.spy();

        fakeContext = { stentorContext: { platform: "alexa" } } as any;

        handlerFactory = new HandlerFactory({
            mappings: {
                HandlerIntent: ConversationHandler
            }
        });

        const stubbedRequestHandlerDBRead: StubDocumentClient = new StubDocumentClient();
        stubbedRequestHandlerDBRead.getReturnValue = handlerDBRow;
        handlerService = new DynamoHandlerService({
            tableName: "app-intent-dev",
            appId: "testAppId",
            readDb: stubbedRequestHandlerDBRead
        });

        // Stubbing read and write here
        const stubbedUserStorageDBRead: StubDocumentClient = new StubDocumentClient();
        stubbedUserStorageDBRead.getReturnValue = storage;
        const stubbedUserStorageDBWrite: StubDocumentClient = new StubDocumentClient();
        userStorageService = new DynamoUserStorageService({
            tableName: "user-app-dev",
            appId: "testAppId",
            readDb: stubbedUserStorageDBRead,
            writeDb: stubbedUserStorageDBWrite
        });
    });
    afterEach(() => {
        clock.restore();
    });
    it("returns the proper payload", async () => {
        await main(requestBody, fakeContext, callbackSpy, [Alexa(applicationId)], {
            handlerFactory,
            handlerService,
            userStorageService
        });
        expect(callbackSpy).to.have.been.calledOnce;
        // lets pull the argument out and inspect it a little
        const callBackArgs = callbackSpy.args[0];
        const error = callBackArgs[0];
        expect(error).to.not.exist;
        const payload = callBackArgs[1];
        expect(payload).to.deep.equal(expectedResponse);
    });
});
