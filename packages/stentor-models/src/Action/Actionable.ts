/*! Copyright (c) 2019, XAPPmedia */
import { Action } from "./Types";

/**
 * Interface that has actions
 * 
 * @privateRemarks
 * We should change this to Actioned and then create a type that is called Actionable<T> = T & Actioned
 * which will be inline with our other interfaces.
 */
export interface Actionable {
    actions: Action[];
}
