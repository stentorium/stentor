/*! Copyright (c) 2024, XAPP AI */

import { FormField } from "./FormField";

export type FormSteps = FormStep | FormStepIFrame | FormStepExternalWidget;

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
 * A step that mounts a third-party widget by injecting its script and letting it render
 * into an anchor element. Used for booking handoffs where the partner ships a JS embed
 * rather than an iframe URL or a server API.
 */
export interface FormStepExternalWidget extends FormStep {
  externalWidget: {
    /**
     * id of the element the third-party script mounts into, e.g. "airo-anchor".
     * The widget renders an empty div with this id.
     */
    anchorId: string;
    /**
     * https URL of the third-party embed script.
     */
    scriptSrc: string;
    /**
     * Name of the global the script reads its configuration from, e.g. "airoBookingForm".
     * The widget assigns `config` to `window[configGlobal]` before appending the script.
     */
    configGlobal: string;
    /**
     * The configuration the third-party script consumes. Keys and values are
     * provider-specific. May be merged at runtime with values returned by the server on
     * form submit.
     *
     * Values are deliberately restricted to primitives rather than `unknown`: this step is
     * authored by hand as JSON (in Studio), so the config must stay flat and
     * JSON-serializable, which is also how the embeds we target declare their own globals.
     * A provider needing a nested config would be a deliberate widening of this type, not
     * something to work around at the call site.
     *
     * Note this describes the *authored* config only. The object a consumer actually
     * assigns to `window[configGlobal]` additionally carries a function at
     * {@link successCallbackKey}, so consumers model the runtime object with their own
     * type rather than reusing this one.
     */
    config: Record<string, string | number | boolean>;
    /**
     * Optional key on `config` that the widget populates with a success callback
     * function, e.g. "apptScheduledCallback". The provider invokes it when the
     * visitor completes the booking.
     */
    successCallbackKey?: string;
    /**
     * When true, a cache-busting query parameter is appended to scriptSrc.
     * Required by some providers (CostGuide documents `?v=<timestamp>`).
     */
    cacheBust?: boolean;
    /**
     * How long to wait for the anchor to receive child nodes before treating the
     * mount as a no-render (e.g. the provider found no matching contractor and
     * rendered nothing). Defaults to a consumer-chosen value.
     */
    renderTimeoutMs?: number;
    /**
     * Name of the step to advance to when the widget fails to render or reports
     * no match, so the visitor is not left at a dead end.
     */
    fallbackStep?: string;
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

  /**
   * Render this step edge-to-edge, suppressing the container's horizontal gutters.
   * Third-party embeds frequently require the full container width.
   */
  fullBleed?: boolean;
}
