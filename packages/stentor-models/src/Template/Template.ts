/*! Copyright (c) 2019, XAPPmedia */
import { App } from "../App";
import { TemplateType } from "./Types";

export interface Template extends Partial<App> {
    /**
     * Template type.
     *
     * @type {TemplateType}
     * @memberof Template
     */
    templateType: TemplateType;
    /**
     * The collaboration agreement between the app and XAPP.
     *
     * @type {string}
     * @memberof Template
     */
    collaborationAgreementUrl?: string;
}
