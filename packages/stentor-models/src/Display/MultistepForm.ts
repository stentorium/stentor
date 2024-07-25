/*! Copyright (c) 2024, XAPP AI */
import { FormStep } from "../Form";
import { BaseDisplay } from "./Types";

/**
 * This is for the top header. The "step" is the name of the step the click should take to.
 */
export interface FormHeaderItem {
    label: string;
    step: string;
}

/**
 * FORM Display type
 */
export interface MultistepForm extends BaseDisplay {
    type: "FORM";
    name: string;
    header: FormHeaderItem[];
    labelHeader: boolean;
    steps: FormStep[];
}
