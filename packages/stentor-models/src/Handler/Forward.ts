/*! Copyright (c) 2019, XAPPmedia */
import { Path } from "../Path";

/**
 * A map of where to forward intent requests to.
 *
 * @export
 * @interface Forward
 */
export interface Forward {
    [key: string]: Path[];
}
