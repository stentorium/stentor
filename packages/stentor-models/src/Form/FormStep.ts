/*! Copyright (c) 2024, XAPP AI */

import { FormField } from "./FormField";

export type FormSteps = FormStep | FormStepIFrame;

export interface FormStepIFrame extends FormStep {
  /**
   * An iframe step is a form step that is rendered as an iframe.
   */
  iframe: {
    /**
     * The source of the iframe.
     */
    src: string;
    /**
     * Optional width, defaults to 100%
     */
    width?: string;
    /**
     * Optional height, defaults to 100%
     */
    height?: string;
  };
}

/**
 * A step is partial form. Fields plus next/prev/submit buttons as needed.
 * We are going through these "mini screens".
 */
export interface FormStep {
  name: string;
  title?: string;
  /**
   * The fields that are part of the form.
   */
  fields: FormField[];

  condition?: string;
  /**
   * The action to take when the user clicks the next button.
   *
   * "next": move to the next step
   * "submit": force "Next" instead of "Submit" (server generated next step).
   * "omit": don't show the next button (for instance final "Thank you screen")
   */
  nextAction?: "next" | "submit" | "omit";
  /**
   * The action to take when the user clicks the previous button.
   *
   * "previous": move to the previous step
   * "submit": force "Previous" instead of "Submit" (server generated previous step).
   * "omit": don't show the previous button (for instance first step)
   */
  previousAction?: "previous" | "submit" | "omit";
  /**
   * The label to use for the next button, defaults to "Next".
   */
  nextLabel?: string;
  /**
   * The label to use for the previous button, defaults to "Previous".
   */
  previousLabel?: string;

  // Means we have collected everything we could. This is used to tell,
  // that we don't report close (abandoned) after this.
  final?: boolean;

  // Server should send the data to the crm
  crmSubmit?: boolean;

  /**
   * Warn the user before unloading the page if there are unsaved changes.
   * 
   * This is especially helpful when either crmSubmit is true or final is true,
   * to prevent users from accidentally losing their data.
   * 
   * This will trigger a browser dialog when the user attempts to close the tab or navigate away which does not work on all browsers.
   * 
   * @beta This is a beta feature and may change in future releases.
   */
  warnBeforeUnload?: boolean;
  /**
   * Custom message to display in the unload warning dialog.  This is used when the use attempts to hit the 'X' button on the form when they have unsaved changes.
   * 
   * @beta This is a beta feature and may change in future releases.
   * 
   * Note: Most browsers do not display custom messages anymore, but having this
   * property allows for future compatibility and clarity.
   */
  warnBeforeUnloadMessage?: string;
}
