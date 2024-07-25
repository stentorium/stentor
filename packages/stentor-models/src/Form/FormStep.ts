/*! Copyright (c) 2024, XAPP AI */

import { FormField } from "./FormField";

/**
 * A step is partial form. Fields plus next/prev/submit buttons as needed.
 * We are going through these "mini screens".
 */
export interface FormStep {
    name: string;
    title?: string;
    fields: FormField[];

    condition?: string;
    // "submit": force "Next" instead of "Submit" (server generated next step). 
    // "omit": don't show submit button (for instance final "Thank you screen")
    nextAction?: "next" | "submit" | "omit";

    // "submit": force "Next" instead of "Submit" (server generated next step). 
    // "omit": don't show submit button (for instance final "Thank you screen")
    previousAction?: "previous" | "submit" | "omit";

    //Force label
    nextLabel?: string;
    previousLabel?: string;

    // Means we have collected everything we could. This is used to tell,
    // that we don't report close (abandoned) after this.
    final?: boolean;

    // Server should send the data to the crm
    crmSubmit?: boolean;
}

