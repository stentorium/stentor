/*! Copyright (c) 2019, XAPPmedia */
import { Path } from "../Path";
/**
 * A map of where to redirect intent requests to before the actual handling. Usually a gate.
 *
 * @export
 * @interface Redirect
 */
export interface Redirect {
    [key: string]: Path[];
}
