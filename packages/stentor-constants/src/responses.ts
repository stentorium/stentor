/*! Copyright (c) 2019, XAPPmedia */
import { Response } from "stentor-models";

export const GOODBYE: Response[] = [
    {
        name: "Goodbye",
        tag: "GOODBYE",
        outputSpeech: {
            ssml: "Ok, goodbye.",
            displayText: "Ok, goodbye.",
            defaultLocale: "en",
            /* spell-checker: disable */
            locales: {
                es: {
                    ssml: "Bueno, adios.",
                    displayText: "Bueno, adios."
                }
            }
            /* spell-checker: enable */
        }
    }
];

export const TROUBLE_WITH_REQUEST: Response[] = [
    {
        name: "I'm having trouble with that request",
        tag: "TROUBLE_WITH_REQUEST",
        outputSpeech: {
            ssml: "I'm sorry, I'm having trouble with that request.",
            displayText: "I'm sorry, I'm having trouble with that request.",
            defaultLocale: "en",
            /* spell-checker: disable */
            locales: {
                es: {
                    ssml: "Lo siento, estoy teniendo problemas con esa solicitud.",
                    displayText: "Lo siento, estoy teniendo problemas con esa solicitud."
                }
            }
            /* spell-checker: enable */
        },
        displays: [{
            type: "CARD",
            title: "${error.name}",
            subTitle: "Error: ${error.message}"
        }]
    }
];
